# Sky Dance: shot list

**Premise (the human's words):** "The Buddha dancing in the sky free as a bird strong as a mountain vast as the ocean"

**The thread:** his saffron robe is the only warm colour in a blue world, and his hand draws one line of light.
The line starts at his fingers, follows the bird, wraps the mountain, runs out across the sea, and closes into
a circle. Where the line goes is the story.

About 33 seconds, 1920x1080, 24 fps. Figure animation on twos; camera smooth. No voiceover yet.

| Shot | Dur | What happens (one action) | Framing | Source | Palette | Accent | Sound note |
|---|---|---|---|---|---|---|---|
| S01 | 6 s | Dawn above the clouds. A small figure rises from behind a cloud. | Wide, locked off, clouds in three layers | A + figure | azure_sky | the robe: one warm dot | high wind, very quiet; one soft bell as he appears |
| S02 | 5 s | He turns in the air and his hand begins a line of light. | Full figure, slow push-in | figure over A sky (or C, see prompts) | azure_sky | robe; the line begins | cloth, a rising tone |
| S03 | 5 s | A white bird crosses. He opens his arms and glides beside it. *Free as a bird.* | Wide side view, slow drift sideways | A + figure + bird | azure_sky | the line trails behind both | wingbeats, air |
| S04 | 6 s | He comes to rest before a great peak and holds still. Cloud races past; neither he nor the mountain moves. *Strong as a mountain.* | Low-angle hero shot, locked off | A + figure, held pose | azure_sky | robe; the line circles the peak once | low drone, gusts; stillness |
| S05 | 6 s | The view tips down to open sea. He opens his arms and the line runs out along the water to the horizon. *Vast as the ocean.* | High and wide, slow tilt | A + figure, small | azure_sky | robe; the line on the water | long swell, a low note opening |
| S06 | 5 s | Sky, peak and sea in one frame. He is a small dancing mark. The line closes into a circle and holds. | Very wide, locked off | A + figure, tiny | azure_sky | the circle of light | one bell, then air |

**Source types** (CEL_LOOK.md): A = Blender cel render. "Figure" = the Buddha drawn in code as a flat cel
cut-out and animated on twos over the Blender frame (a version of type B where the character art is made
here, so nothing waits on generated key art). C = an AI clip the human generates; optional, only if S02
should move more fluidly than a cut-out can.

**On this machine** (no GPU) camera moves are done as slow drifts over layered Blender stills. On the PC the
same scenes can be rendered with real camera moves.

**Status:** S01, S04, S05 have design frames (see `lab/experiments/2026-11-16-sky-dance-01/`). Nothing is animated yet.
