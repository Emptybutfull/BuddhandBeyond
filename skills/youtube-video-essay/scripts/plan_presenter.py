"""Decide where Steven is on camera, from the transcript of voice.wav.

Reads timed segments, scores each line for "say it to camera" vs "show the thing", and writes
presenter_plan.json: on-camera stretches with a mode (full/side/corner/triptych/cutout) and why.
Claude reviews the plan (not the whole transcript) and folds it into the shot list.

Usage:
  python plan_presenter.py voice_segments.json --chapters chapters.json --out presenter_plan.json
  python plan_presenter.py lecture_segments.txt --target 0.28 --cutout 1

Segments: whisper JSON ({"segments":[{"start","end","text"}]} or a bare list), or text lines like
  "[12.3-15.8] text"  /  "12.3<TAB>15.8<TAB>text"  /  "00:00:12,300 --> 00:00:15,800 text".
Chapters: JSON list [{"start": seconds, "title": "..."}] in voice.wav time (same as CHAPTERS).
"""
import argparse
import json
import re
import sys
from pathlib import Path

PERSONAL = re.compile(r"\b(i|i'm|i've|i'd|i was|me|my|myself)\b", re.I)
OPINION = re.compile(r"\b(i think|i believe|honestly|the truth is|here's the thing|what i('ve)? found|to me|i'd say|my take)\b", re.I)
ADDRESS = re.compile(r"\b(imagine|try this|close your eyes|notice|ask yourself|think about|picture this|next time you|right now|try it|you ever)\b", re.I)
CONCEPT = re.compile(
    r"\b(dukkha|anatta|anatman|anicca|sunyata|shunyata|emptiness|non-?self|no-?self|karma|samsara|nirvana|nibbana|"
    r"dependent origination|aggregates?|skandhas?|eightfold|noble truths?|mindfulness|craving|tanha|attachment|"
    r"impermanence|bodhisattva|buddha-?nature|middle way|precepts?|jhana|dharma|dhamma|sangha|koan|zen|realms?)\b",
    re.I,
)
LIST = re.compile(r"\b(first|second|third|fourth|three|four|five|six|eight|twelve|steps?|stages?|levels?)\b", re.I)
STORY = re.compile(
    r"\b(once|there was|there lived|the story|legend|parable|in the year|centur(y|ies)|bc|ad|monk named|king|"
    r"the buddha (was|said|sat|went)|according to|the sutra|the text|scholars?|historians?)\b",
    re.I,
)
CTA = re.compile(r"\b(subscribe|patreon|comment|thank you for|thanks for|see you|next video|share this)\b", re.I)


def parse_time(s):
    s = s.strip().replace(",", ".")
    if ":" in s:
        parts = [float(p) for p in s.split(":")]
        sec = 0.0
        for p in parts:
            sec = sec * 60 + p
        return sec
    return float(s)


def load_segments(path):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    if p.suffix.lower() == ".json":
        data = json.loads(text)
        segs = data["segments"] if isinstance(data, dict) else data
        return [{"start": float(s["start"]), "end": float(s["end"]), "text": s["text"].strip()} for s in segs]
    out = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        m = (
            re.match(r"^\[?\s*([\d:.,]+)\s*(?:-|-->|–)\s*([\d:.,]+)\s*\]?\s*(.*)$", line)
            or re.match(r"^([\d:.,]+)\t([\d:.,]+)\t(.*)$", line)
        )
        if m:
            out.append({"start": parse_time(m.group(1)), "end": parse_time(m.group(2)), "text": m.group(3).strip()})
    return out


def score(seg):
    t = seg["text"]
    s, mode, why = 0, "full", []
    if ADDRESS.search(t):
        s, mode = s + 3, "full"
        why.append("talks to the viewer")
    if OPINION.search(t):
        s += 2
        why.append("opinion")
    elif PERSONAL.search(t):
        s += 2
        why.append("personal")
    if CONCEPT.search(t) and not ADDRESS.search(t):
        s += 2
        mode = "side"
        why.append("explains a concept")
    if LIST.search(t) and mode == "side":
        s += 1
    if t.rstrip().endswith("?") and s < 3:
        s += 1
        mode = "corner" if mode == "full" else mode
        why.append("question")
    if STORY.search(t):
        s -= 3
        why.append("story/exposition -> keep on art")
    return s, mode, why


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("segments")
    ap.add_argument("--chapters")
    ap.add_argument("--out", default="presenter_plan.json")
    ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--target", type=float, default=0.25, help="share of runtime on camera (0.2-0.35)")
    ap.add_argument("--max-stretch", type=float, default=20)
    ap.add_argument("--min-stretch", type=float, default=4)
    ap.add_argument("--min-gap", type=float, default=12, help="seconds of art between camera stretches")
    ap.add_argument("--triptych", type=int, default=2, help="max triptych chapter anchors")
    ap.add_argument("--cutout", type=int, default=0, help="max cutout 'big line' shots (needs matte_presenter.py)")
    a = ap.parse_args()

    segs = load_segments(a.segments)
    if not segs:
        sys.exit("no segments parsed")
    dur = segs[-1]["end"]
    chapters = json.loads(Path(a.chapters).read_text()) if a.chapters else []
    picks = []  # (start, end, mode, why, text, priority)

    def stretch_from(i, mode, why, prio, max_len=None):
        start = segs[i]["start"]
        j = i
        lim = max_len or a.max_stretch
        while segs[j]["end"] - start < a.min_stretch and j + 1 < len(segs) and segs[j + 1]["end"] - start <= lim:
            j += 1
        end = min(segs[j]["end"], start + lim)
        text = " ".join(s["text"] for s in segs[i : j + 1])
        return {"start": start, "end": end, "mode": mode, "why": why, "text": text[:160], "prio": prio}

    # 1. Fixed beats: hook, chapter anchors, closing words.
    picks.append(stretch_from(0, "full", "cold open: say the hook to camera", 100, max_len=12))
    trip_left = a.triptych
    for n, ch in enumerate(chapters):
        i = next((k for k, s in enumerate(segs) if s["start"] >= ch["start"] - 0.05), None)
        if i is None:
            continue
        mode = "full"
        if trip_left and n % 3 == 1:
            mode, trip_left = "triptych", trip_left - 1
        picks.append(stretch_from(i, mode, f"chapter anchor: {ch.get('title', n + 1)}", 90, max_len=16))
    tail = [k for k, s in enumerate(segs) if s["start"] >= dur - 45 and CTA.search(s["text"])]
    k_close = tail[0] if tail else max(0, len(segs) - 1)
    while k_close > 0 and segs[k_close - 1]["start"] >= dur - 18:
        k_close -= 1
    k_close = max(k_close, min(1, len(segs) - 1))
    picks.append(stretch_from(k_close, "full", "closing words / CTA to camera", 95, max_len=25))

    # 2. Scored candidates fill the remaining budget.
    cands = []
    for i, sg in enumerate(segs):
        s, mode, why = score(sg)
        if s >= 2:
            cands.append((s, i, mode, ", ".join(why)))
    cands.sort(key=lambda c: (-c[0], segs[c[1]]["start"]))
    corner_budget = 0.05 * dur

    def on_cam(ps):
        return sum(p["end"] - p["start"] for p in ps)

    def clashes(st, ps):
        return any(st["start"] < p["end"] + a.min_gap and st["end"] > p["start"] - a.min_gap for p in ps)

    for s, i, mode, why in cands:
        if on_cam(picks) >= a.target * dur:
            break
        st = stretch_from(i, mode, why, s)
        if clashes(st, picks):
            continue
        if mode == "corner" and on_cam([p for p in picks if p["mode"] == "corner"]) + st["end"] - st["start"] > corner_budget:
            continue
        picks.append(st)

    # Strongest short "full" lines (not fixed beats) become cutout shots if asked for.
    big = sorted((p for p in picks if p["mode"] == "full" and p["prio"] < 90 and p["end"] - p["start"] <= 12), key=lambda p: -p["prio"])
    for p in big[: a.cutout]:
        p["mode"], p["why"] = "cutout", p["why"] + " -> big line"

    # 3. Tidy: sort, resolve overlaps (higher priority wins), alternate sides / punch-ins, frames.
    picks.sort(key=lambda p: p["start"])
    clean = []
    for p in picks:
        if clean and p["start"] < clean[-1]["end"]:
            if p["prio"] > clean[-1]["prio"]:
                clean[-1]["end"] = p["start"]
                if clean[-1]["end"] - clean[-1]["start"] < a.min_stretch:
                    clean.pop()
            else:
                p["start"] = clean[-1]["end"]
                if p["end"] - p["start"] < a.min_stretch:
                    continue
        clean.append(p)
    side, punch = "left", False
    for p in clean:
        if p["mode"] == "side":
            p["side"], side = side, ("right" if side == "left" else "left")
        if p["mode"] == "full":
            p["punchIn"], punch = punch, not punch
        p["frames"] = [round(p["start"] * a.fps), round(p["end"] * a.fps)]
        p["start"], p["end"] = round(p["start"], 2), round(p["end"], 2)
        del p["prio"]

    Path(a.out).write_text(json.dumps(clean, indent=1, ensure_ascii=False), encoding="utf-8")
    total = on_cam(clean)
    by = {}
    for p in clean:
        by[p["mode"]] = by.get(p["mode"], 0) + p["end"] - p["start"]
    print(f"{len(clean)} camera stretches, {total:.0f}s of {dur:.0f}s = {100 * total / dur:.0f}% on camera -> {a.out}")
    print("  " + "  ".join(f"{m}:{100 * v / dur:.0f}%" for m, v in sorted(by.items())))
    for p in clean:
        print(f"  {p['start']:7.1f}-{p['end']:7.1f}  {p['mode']:<8} {p['why'][:40]:<40} | {p['text'][:60]}")


if __name__ == "__main__":
    main()
