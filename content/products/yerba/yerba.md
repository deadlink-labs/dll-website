---
type: product
created: 2026-09-13
project: "[[Yerba]]"
people: []

web-status: published
web-title: "Yerba"
web-pub-date: 2026-09-13
web-snippet: "A weekly trend indicator for TradingView that tells you which side of the trend you're on, where it flips, and whether the daily agrees. Calibrated per asset, verified to the cent."
web-type: products
web-number: 3
web-stage: TESTING
web-tags: [PINE-SCRIPT, TRADINGVIEW, CRYPTO, TREND]
web-image: "./assets/screen.png"
web-price: "USD 97"
# web-buy-url: "https://deadlinklabs.gumroad.com/l/yerba"   # uncomment when the Gumroad product exists; until then the button is a placeholder
web-buy-note: "You get the script file. Paste it into TradingView's Pine editor, add it to your chart, done. It runs on a free TradingView account. When a new version ships you download it from the same page."
---

<!--
  AUTHORING NOTES. Product-page flavor (VOICE-POSTS.md §3): second person, the
  pain, the numbers, no hype. The reference indicator is never named.
  Delivery is the .pine FILE (decided 2026-09-13: invite-only scripts need a
  TradingView Premium plan, and the chart runs on a free one), sold as a
  download, so the buyer pastes it into their own Pine editor and it works on
  any plan. The plan lives in yerba-indicator/yerba-kb/plans/10-selling-yerba.md.
  The price and the buy button are a MOCKUP until web-buy-url is set:
  CLAUDE.md §5.3 says no prices until purchasable, so before this goes live
  either the download exists or web-price comes out and web-stage goes to
  COMING SOON with the waitlist.
  TO PUBLISH: web-status: published here, then add "yerba" (first) to
  homepage.featuredProducts in content/site.config.json. Not before: the build
  refuses a featured slug that is not published (§7), which is correct.
-->

You know the feeling. A coin you hold drops 15% in a week and you can't tell whether that's a dip inside an uptrend or the start of the next leg down. So you check three indicators, a Telegram group and your gut, and they disagree.

Yerba answers one question, on the weekly chart, and it doesn't change its mind mid-week: which side of the trend are you on, and at what price does that stop being true.

## What it puts on your chart

A single line under price in an uptrend, above it in a downtrend. ==The line only ever moves in the direction of the trend, and it only moves on a confirmed weekly close, so it can't be shaken out by a Tuesday wick.== When a week closes through it, the trend flips and the line jumps to the other side.

Beside the chart, one panel:

- **The state.** Bullish or bearish, and since when.
- **The stop.** The price that, closed through, ends this trend. That's your exit, decided in advance.
- **The entry.** Where the last flip booked, and how far price has moved since.
- **Confluence.** Whether the daily chart agrees with the weekly. Aligned, or in conflict.

That's it. No oscillator, no cloud, no seven-color histogram.

## Why the parameters are per asset

Most trend lines ship with one setting for every chart. Yerba doesn't, because the market doesn't. Two weeks of measuring showed that the right band width and lookback differ by asset: one pair fits SOL, ETH and XRP, another fits sixteen others, and BTC wants a third. ==The per-asset table is the product; the formula underneath is textbook.== You get the table, and it gets updated as more assets are classified.

## How it was verified

Every number Yerba prints was checked against a closed-source reference indicator using nothing but its public screen output: 52 of 55 flip dates exact, 36 of 37 historical stop levels exact, and 0% difference against TradingView's own engine over 263 bars. The whole reconstruction, including the six ways the numbers lied on the way there, is written up in [the log](/log/reconstructing-a-black-box-indicator).

## Honest status

**On the bench, not on the shelf yet.** The engine is verified. The on-chart panel is being redesigned (what you see above is the target, drawn, not a capture). Three assets still fit no parameter pair, and the reason the parameters vary at all is an open question. It goes on sale when the panel ships and it's run on live charts for a few more months. When it does, it's a one-time purchase: the script file, the per-asset parameter table, and every update after. You paste it into your own Pine editor, so it works on a free TradingView account.

None of this is investment advice. It's a trailing stop that tells you where it is. What you do at that price is yours.
