---
type: product
created: 2026-09-13
project: "[[Yerba]]"
people: []

web-status: published
web-title: "Yerba Trendline"
web-pub-date: 2026-09-13
web-snippet: "A weekly trend indicator for TradingView that tells you which side of the trend you're on, where it flips, and whether the daily agrees. Calibrated per asset, verified to the cent."
web-type: products
web-number: 3
web-stage: TESTING
web-tags: [PINE-SCRIPT, TRADINGVIEW, TREND]
web-image: "./assets/screen.png"
web-price: "USD 97"
# web-buy-url: "https://payhip.com/b/XXXXX"   # uncomment when the Payhip product exists; until then the button is a placeholder
web-buy-note: "You get the script file. Paste it into TradingView's Pine editor, add it to your chart, done. It runs on a free TradingView account; the three flip alerts need TradingView's Essential plan or higher, which is their rule for alerts on any indicator. When a new version ships you download it from the same page."
---

<!--
  AUTHORING NOTES. Product-page flavor (VOICE-POSTS.md §3): second person, the
  pain, the numbers, no hype. The reference indicator is never named.
  Delivery is the .pine FILE (decided 2026-09-13: invite-only scripts need a
  TradingView Premium plan, and the chart runs on a free one), sold as a
  download, so the buyer pastes it into their own Pine editor and it works on
  any plan. The plan lives in yerba-indicator/yerba-kb/plans/10-selling-yerba.md.
  Store: Payhip (decided 2026-09-14). Gumroad's prohibited list names crypto
  products and "signals"; Lemon Squeezy onboards through Stripe, which does not
  serve Argentina; Payhip's list has nothing on trading or software and pays
  into PayPal directly. The package a buyer downloads, the listing copy and the
  go-live order are in yerba-indicator/production/store/. Product name: Yerba
  Trendline (the reconstruction in the log is still Yerba). The word "signals"
  appears nowhere on this page; they are alerts.
  2026-09-19: the shipped file compiled and ran; every image on this page is
  a capture of it on a live chart (yerba-indicator/production/store/listing/
  images/, framed by tools/frame_shot.py). The per-asset pair is not shown
  on the chart, on purpose: three public captures at three pairs would hand
  over the table. Alerts on indicators need a paid TradingView plan (Basic
  has none); said in web-buy-note and in the body.
  The price and the buy button are a MOCKUP until web-buy-url is set:
  CLAUDE.md §5.3 says no prices until purchasable, so before this goes live
  either the download exists or web-price comes out and web-stage goes to
  COMING SOON with the waitlist.
  TO PUBLISH: web-status: published here, then add "yerba" (first) to
  homepage.featuredProducts in content/site.config.json. Not before: the build
  refuses a featured slug that is not published (§7), which is correct.
-->

You know the feeling. A coin you hold drops 15% in a week and you can't tell whether that's a dip inside an uptrend or the start of the next leg down. So you check three indicators, a Telegram group and your gut, and they disagree.

Yerba Trendline answers one question, on the weekly chart, and it doesn't change its mind mid-week: which side of the trend are you on, and at what price does that stop being true.

## What it puts on your chart

A single line under price in an uptrend, above it in a downtrend. ==The line only ever moves in the direction of the trend, and it only moves on a confirmed weekly close, so it can't be shaken out by a Tuesday wick.== When a week closes through it, the trend flips and the line jumps to the other side.

In the corner of the chart, one card:

- **The state.** Bullish or bearish, and since when.
- **The stop.** The price that, closed through, ends this trend. That's your exit, decided in advance.
- **The entry.** Where the last flip booked, and how far price has moved since.
- **Confluence.** Whether the daily chart agrees with the weekly. Aligned, or in conflict.

Three alerts: flip to bullish, flip to bearish, any flip. That's it. No oscillator, no cloud, no seven-color histogram.

![A framed TradingView weekly chart of Solana on Coinbase, September 2023 to September 2026. A stepped trailing stop sits under price through the 2024 climb, flips above it at a bar labelled bearish near the 2025 top, and back below at a bullish label in late August 2026. Top right, a compact card reads YERBA TRENDLINE v0.1.0, CONFIRMED CLOSE, BULLISH since 2026-08-24, STOP 79.59, ENTRY 95.44, plus 16.2% since, and 1W and 1D both up, ALIGNED.](./assets/sol-weekly-3y.webp)

*Solana, weekly, three years, captured 2026-09-19. Every flip labelled where the week closed through the line; the card in the corner is the state that day. What it draws, not what it would have made.*

## Why the parameters are per asset

Most trend lines ship with one setting for every chart. Yerba doesn't, because the market doesn't. Two weeks of measuring showed that the right band width and lookback differ by asset: one pair fits SOL, ETH and XRP, another fits twenty-three others, and BTC wants a third. ==The per-asset table is the product; the formula underneath is textbook.== You set two numbers per asset from the table that comes with it. 28 assets are classified today, crypto and stocks, and the table grows with every update.

![A framed TradingView weekly chart of Bitcoin on Binance, 2022 to September 2026. The trailing stop flips only four times in five years: bullish at the 2023 bottom near 20,000, bearish near the 2025 top above 100,000, and once each way since. The card reads BULLISH since 2026-09-07, STOP 60600.44, ENTRY 80341.83.](./assets/btc-weekly-5y.webp)

*Bitcoin at its own pair, weekly, five years, captured 2026-09-19: four flips. At the pair that fits Solana it flips nine times over the same bars. That difference is the table.*

## How it was verified

Every number Yerba prints was checked against a closed-source reference indicator using nothing but its public screen output: 52 of 55 flip dates exact, 36 of 37 historical stop levels exact. The whole reconstruction, including the six ways the numbers lied on the way there, is written up in [the log](/log/can-you-rebuild-a-closed-source-trading-indicator-from-someone-elses-screen).

![A framed TradingView weekly chart of Ethereum on Bitfinex, September 2023 to September 2026. The trailing stop steps under the 2024 rally, flips bearish twice into 2025, bullish again for the run to 4,800, bearish at the top, and bullish in late August 2026. The card reads BULLISH since 2026-08-24, STOP 2074.75, ENTRY 2463.90.](./assets/eth-weekly-3y.webp)

*Ethereum, weekly, three years, captured 2026-09-19. The asset with the deepest check: twelve historical stop levels from 2020 to 2026, every one reproduced exactly.*

## Honest status

**Packaged and run, not on the shelf yet.** The engine is verified, and the shipped file compiled and ran on live charts on 2026-09-19: every image on this page is a capture of it. Four assets (ADA, MORPHO, ASTER, LIGHTER) still fit no parameter pair and get the default, and the reason the parameters vary at all is an open question. It goes on sale once the store page is up. When it does, it's a one-time purchase: the script file, the per-asset parameter table, and every update after. You paste it into your own Pine editor, so it works on a free TradingView account. The one thing that doesn't: alerts on indicators are a paid TradingView feature, Essential plan and up. I run the free plan, so the three alerts are declared and listed, and I haven't watched one fire.

## The terms, short

Sold as is. **All sales are final**, with one exception: if the file won't compile in a current TradingView Pine editor and I can't fix it within 14 days of your report, you get a full refund. Updates are included for as long as I keep developing it, with no promised cadence. Support by email, best effort. One buyer, personal use: don't share it, resell it, or publish it on TradingView. The full terms come with the download.

None of this is investment advice. It's a trailing stop that tells you where it is. What you do at that price is yours.
