---
type: product
created: 2026-05-20
project: "[[Cassette Mixtapes]]"
people: []

web-status: published
web-title: "Cassette Mixtapes"
web-pub-date: 2026-05-20
web-snippet: "A preparation studio for digital mixtapes: playlists, metadata, streaming-spec validation, loudness analysis."
web-lead: |
  A preparation studio for digital mixtapes. It handles the parts that make a mixtape play cleanly across services: playlist order, metadata, streaming-spec validation, and loudness analysis.

  In private beta with a small group right now. Request access below and tell me a bit about what you make.
web-type: products
web-number: 1
web-stage: PRIVATE BETA
web-tags: [AUDIO, METADATA, LOUDNESS]
web-image: "./assets/screen.png"
---

You finish a mix at 1am, export it, and send it out into the world. A few days
later someone tells you it sounds quieter than the track before it, or the
loudest chorus is clipping on their phone. Or you spend an afternoon generating
AI tracks and wake up to fifty files named `track_047.wav`, with zero memory of
which three were actually good. I have lived both of those more times than I
want to admit, so I built the tool I wished existed.

## If you are shipping to a DSP

Uploading music is a leap of faith. You do not find out your master was too
quiet, or hot enough to clip on someone's phone, until it is already live,
sitting next to a professionally mastered track that eats it alive.

The loudness meter is the part I trust most, because I checked it against
tools that already had my trust. Measured against ffmpeg's ebur128 across
seven real masters, it agrees within 0.05 LU. Measured against DaVinci
Resolve on a full 14-track release, within 0.1 LU, true peak within 0.01 dB.
Not close enough. The same number.

Pick a platform, Spotify, Apple Music, YouTube, Bandcamp, and the rest each
carry their own real target instead of one generic number pretending to fit
all of them, and the app tells you which tracks are actually ready before you
upload anything.

Hit normalize and it does not just calculate a gain change and hope. It
renders, measures the file it just made, and re-renders if it is off. Four
masters I tested landed at exactly -14.00 LUFS, every single time, true peak
under the ceiling the whole way through. You get to know before anyone else
does.

## If you are triaging a pile of AI tracks

Generating is the fun part. The fifty-track folder that follows is not.
Nothing has a name that means anything, nothing tells you the keeper from the
throwaway, and drag the wrong file into two projects and you have just
duplicated four minutes of audio for no reason.

Drop the whole folder on the board and it sorts itself: subfolders included,
tracks in the right order, grouped by album where the tags say so. Every
track gets analyzed the second it lands, BPM, key, and loudness, about 1.6
seconds for a full five-minute stereo file.

The board is three columns: Pool, Workshop, Release-Ready. Drag a track
between mixtapes without duplicating the audio on disk. Search the whole
board live, and by more than a name: `bpm:120-130`, `key:f#`, `flag:red`. Two
hundred takes, one good one. That is what this was built to find.

## Everything else

It edits real metadata, artist, album, title, year, and embeds cover art
directly into the file, not a sidecar nobody reads. It never touches your
original audio; the only files it ever writes are export copies, into a
folder you chose. Sessions autosave constantly with 24 rolling backups, and a
corrupted file gets quarantined instead of silently overwritten. And it runs
entirely on your machine. No account, no cloud, no upload. Your masters never
leave your laptop.

It is still rough around the edges. Come help me sand it down.
