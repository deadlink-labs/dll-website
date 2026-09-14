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
web-buy-note: "You get the script file. Paste it into TradingView's Pine editor, add it to your chart, done. It runs on a free TradingView account. When a new version ships you download it from the same page."
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

That's it. No oscillator, no cloud, no seven-color histogram.

## Why the parameters are per asset

Most trend lines ship with one setting for every chart. Yerba doesn't, because the market doesn't. Two weeks of measuring showed that the right band width and lookback differ by asset: one pair fits SOL, ETH and XRP, another fits twenty-three others, and BTC wants a third. ==The per-asset table is the product; the formula underneath is textbook.== The indicator reads the chart's symbol and applies the right pair by itself, and tells you when it's falling back to the default. 28 assets are classified today, crypto and stocks, and the table grows with every update.

## How it was verified

Every number Yerba prints was checked against a closed-source reference indicator using nothing but its public screen output: 52 of 55 flip dates exact, 36 of 37 historical stop levels exact, and 0% difference against TradingView's own engine over 263 bars. The whole reconstruction, including the six ways the numbers lied on the way there, is written up in [the log](/log/reconstructing-a-black-box-indicator).

## Honest status

**Packaged, not on the shelf yet.** The engine is verified. The card you see above is drawn, not a capture: the shipped file draws it, and that file hasn't been compiled yet. Four assets (ADA, MORPHO, ASTER, LIGHTER) still fit no parameter pair and get the default, and the reason the parameters vary at all is an open question. It goes on sale once the shipped file has been run and checked on live charts. When it does, it's a one-time purchase: the script file, the per-asset parameter table, and every update after. You paste it into your own Pine editor, so it works on a free TradingView account.

## The terms, short

Sold as is. **All sales are final**, with one exception: if the file won't compile in a current TradingView Pine editor and I can't fix it within 14 days of your report, you get a full refund. Updates are included for as long as I keep developing it, with no promised cadence. Support by email, best effort. One buyer, personal use: don't share it, resell it, or publish it on TradingView. The full terms come with the download.

None of this is investment advice. It's a trailing stop that tells you where it is. What you do at that price is yours.
