"""Cut the voice.wav transcript into shot time-boxes at natural phrase ends (collage style).

Writes shots.json: [{"id","start","end","text","visual":"","layers":[],"move":"push","transition":"dissolve"}].
Claude then fills `visual`/`layers` per shot (one concrete metaphor each) instead of timing by hand.

Usage:
  python split_shots.py voice_words.json --out shots.json --target 7 --min 3.5 --max 12

Input: whisper JSON with word timings (segments[].words[] with word/start/end) — best — or plain
segments (segments[] with start/end/text), which are then split at punctuation proportionally.
"""
import argparse
import json
import re
from pathlib import Path

END = re.compile(r"[.!?;:—…]['\")\]]*$")
SOFT = re.compile(r",['\")\]]*$")


def words_from(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    segs = data["segments"] if isinstance(data, dict) else data
    out = []
    for s in segs:
        if s.get("words"):
            out += [{"w": w["word"].strip(), "s": float(w["start"]), "e": float(w["end"])} for w in s["words"] if w["word"].strip()]
        else:  # spread segment time over its words
            toks = s["text"].split()
            if not toks:
                continue
            d = (float(s["end"]) - float(s["start"])) / len(toks)
            out += [{"w": t, "s": float(s["start"]) + i * d, "e": float(s["start"]) + (i + 1) * d} for i, t in enumerate(toks)]
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("transcript")
    ap.add_argument("--out", default="shots.json")
    ap.add_argument("--target", type=float, default=7.0)
    ap.add_argument("--min", type=float, default=3.5)
    ap.add_argument("--max", type=float, default=12.0)
    a = ap.parse_args()

    ws = words_from(a.transcript)
    shots, cur = [], []
    for i, w in enumerate(ws):
        cur.append(w)
        dur = w["e"] - cur[0]["s"]
        gap = ws[i + 1]["s"] - w["e"] if i + 1 < len(ws) else 9
        hard = END.search(w["w"]) or gap >= 0.6
        soft = SOFT.search(w["w"]) or gap >= 0.3
        # prefer sentence ends; a comma only when the shot is already long
        if (dur >= a.target * 0.7 and hard) or (dur >= a.target * 1.3 and soft) or (dur >= a.min and gap >= 0.6) or dur >= a.max:
            shots.append(cur)
            cur = []
    if cur:
        if shots and cur[-1]["e"] - cur[0]["s"] < a.min:
            shots[-1] += cur
        else:
            shots.append(cur)

    out = []
    for n, sh in enumerate(shots):
        start = out[-1]["end"] if out else 0.0  # shots tile the timeline: no gaps
        end = sh[-1]["e"] if n + 1 < len(shots) else sh[-1]["e"] + 1.0
        if n + 1 < len(shots):
            end = (sh[-1]["e"] + shots[n + 1][0]["s"]) / 2  # cut in the middle of the pause
        out.append({"id": f"S{n + 1:03d}", "start": round(start, 2), "end": round(end, 2),
                    "text": " ".join(w["w"] for w in sh), "visual": "", "layers": [], "move": "push", "transition": "dissolve"})
    Path(a.out).write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
    lens = [s["end"] - s["start"] for s in out]
    total = out[-1]["end"] if out else 0
    print(f"{len(out)} shots over {total:.0f}s = {60 * len(out) / max(total, 1):.1f}/min, "
          f"avg {sum(lens) / max(len(lens), 1):.1f}s (min {min(lens):.1f}, max {max(lens):.1f}) -> {a.out}")


if __name__ == "__main__":
    main()
