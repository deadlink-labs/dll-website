---
type: product
created: 2026-09-13
project: "[[Yerba]]"
people: []
web-status: published
web-title: Yerba Trendline
web-pub-date: 2026-09-13
web-snippet: A weekly trend indicator for TradingView that tells you which side of the trend you're on, where it flips, and whether the daily agrees. It reads the symbol on your chart and applies that asset's calibration automatically.
web-type: products
web-number: 3
web-stage: TESTING
web-tags:
  - PINE-SCRIPT
  - TRADINGVIEW
  - TREND
web-image: ./assets/Yerba Trendline - BTCUSD.png
web-terms-url: https://deadlinklabs.com/products/yerba/terms
web-price: USD 97
web-buy-url: https://payhip.com/buy?s=1&cart_links%5B%5D=ZxzvX&qty%5BZxzvX%5D=1
web-buy-specs:
  - label: You get
    value: The Pine script file, ready to paste into TradingView.
  - label: Setup
    value: Open TradingView's Pine editor, paste the file, add it to your chart. About a minute.
  - label: Works on
    value: Any TradingView plan. The three flip alerts need Essential or higher, which is TradingView's rule for alerts on any indicator.
  - label: Updates
    value: Included. New versions download from the same link.
---

%% AUTHORING NOTES — internal, stripped by remarkObsidian before render.
Was an HTML comment until 2026-09-20; that reached the built page, so "reconstruction"
was sitting in view-source on a product page. Obsidian's own comment form is stripped
from the tree by remarkObsidian instead. Do not put it back, and never write a bare
double-percent inside this block: the strip regex is non-greedy, so it would close the
comment early and publish everything after it as visible text.
Product-page flavor (VOICE-POSTS.md §3): second person, the pain, the numbers, no hype.
The reference indicator is never named, and NEITHER IS THE METHOD (2026-09-20): nothing
a buyer reads says where the numbers in the parameter table came from. The "How it was
verified" section lived here until that date and was cut for exactly that reason; the
reconstruction story stays on the LOG 016 entry, which is not a product surface.
Delivery is the .pine FILE (decided 2026-09-13: invite-only scripts need a TradingView
Premium plan, and the chart runs on a free one), sold as a download, so the buyer pastes
it into their own Pine editor and it works on any plan. The plan lives in
yerba-indicator/yerba-kb/plans/10-selling-yerba.md.
Store: Payhip (decided 2026-09-14). Gumroad's prohibited list names crypto products and
"signals"; Lemon Squeezy onboards through Stripe, which does not serve Argentina;
Payhip's list has nothing on trading or software and pays into PayPal directly. The
package a buyer downloads, the listing copy and the go-live order are in
yerba-indicator/production/store/. Product name: Yerba Trendline. The word "signals"
appears nowhere on this page; they are alerts.
TERMS (2026-09-20): the full licence and disclaimer are a page on this site at
/products/yerba/terms, generated from the shipped files by yerba-indicator's
tools/sync_terms.py — never hand-edited here. Payhip's description no longer inlines
them; its agree-at-checkout box links to that page, which is what makes "all sales
final" bind. web-terms-url feeds BuyBlock.
IMAGES (2026-09-20): every capture is the shipped v0.2.0 file on a live chart, framed by
yerba-indicator/tools/frame_shot.py. Body charts are 16:9; web-image is the raw BTC
capture, unframed (2026-09-21): the page header shows it edge to edge at its own
ratio (.product-page__media no longer forces 16:10), and a framed shot with its shadow
margins sat small inside the box. screen.webp is the old framed 16:10 version. The per-asset pair is
never shown on a chart, on purpose: captures at three pairs would hand over the table.
Three body images, one per section — the five-chart walkthrough is the store page's job.
Alerts on indicators need a paid TradingView plan (Basic has none); said in web-buy-note
and in the body.
The button is live since 2026-09-20: web-buy-url is Payhip's direct-to-cart link for the
listing, so CLAUDE.md §5.3's "no prices until purchasable" is satisfied. If the listing
is ever pulled, take web-buy-url out again (the button falls back to a placeholder) or
drop web-price and set web-stage to COMING SOON with the waitlist.
The fulfilment copy is web-buy-specs, a label/value list, not a paragraph: it was six
sentences of prose above the button until 2026-09-20 and nothing above a checkout button
gets read at that length. Keep each value to one or two short lines.
TO PUBLISH: web-status: published here, then add "yerba" (first) to
homepage.featuredProducts in content/site.config.json. Not before: the build refuses a
featured slug that is not published (§7), which is correct. %%

You know the feeling. A coin you hold drops 15% in a week and you can't tell whether that's a dip inside an uptrend or the start of the next leg down. So you check three indicators, a Telegram group and your gut, and they disagree.

Yerba Trendline answers one question, on the weekly chart, and it doesn't change its mind mid-week: which side of the trend are you on, and at what price does that stop being true.

## What it puts on your chart

A single line under price in an uptrend, above it in a downtrend. ==The line only ever moves in the direction of the trend, and it only moves on a confirmed weekly close, so it can't be shaken out by a Tuesday wick.== When a week closes through it, the trend flips and the line jumps to the other side.

In the corner of the chart, one card:

- **The state.** Bullish or bearish, and since when.
- **Flipped at.** The price where this trend started, and how far price has moved since.
- **Flips at.** The price that, closed through, ends it. That's your exit, decided in advance.
- **Confluence.** Whether the daily chart agrees with the weekly. Aligned, or in conflict.

The two prices read left to right in time: where this trend began, where it ends.

Three alerts: flip to bullish, flip to bearish, any flip. That's it. No oscillator, no cloud, no seven-color histogram. The chart itself runs on a free TradingView account; alerts on any indicator need their Essential plan or higher, which is TradingView's rule, not mine.

![A framed TradingView weekly chart of Solana on Binance, September 2025 to September 2026. A stepped line sits above price from a bar labelled bearish in early November 2025, steps down through the fall to the 60s, and flips below price at a bar labelled bullish in late August 2026. Top right, a compact card reads YERBA TRENDLINE v0.2.0, CONFIRMED CLOSE, BULLISH since 2026-08-24, Flipped at 95.44, Flips at 80.73, plus 17.8% since, and 1W and 1D both up, ALIGNED.](./assets/sol-weekly.webp)

*Solana, weekly, captured 2026-09-20. Every flip labelled where the week closed through the line; the card in the corner is the state that day. What it draws, not what it would have made.*

## Why the parameters are per asset

Most trend lines ship with one setting for every chart. Yerba doesn't, because the market doesn't. Two weeks of measuring showed that the right band width and lookback differ by asset: one pair fits SOL, ETH and XRP, another fits twenty-three others, and BTC wants a third. ==The per-asset table is the product; the formula underneath is textbook.== 28 assets are classified today, crypto and stocks, and the table grows with every update.

**You don't set any of it. The indicator reads the symbol on the chart and applies that asset's two numbers by itself** — switch from BTC to ETH and the pair follows. The table still ships, so you can look a pair up or see what's classified, and you can switch the automatic setting off and type the numbers yourself on any chart.

![A framed TradingView weekly chart of Bitcoin on Bitstamp, September 2025 to September 2026. A stepped line sits above price from a bar labelled bearish in early November 2025 and steps down for ten months while price falls to the low 60,000s, then flips below price at a bar labelled bullish in early September 2026. The card reads YERBA TRENDLINE v0.2.0, CONFIRMED CLOSE, BULLISH since 2026-09-07, Flipped at 80339, Flips at 60653, plus 1.8% since, ALIGNED.](./assets/btc-weekly.webp)

*Bitcoin at its own pair, weekly, captured 2026-09-20. Nothing was typed to get this: the chart says BTC, so the indicator used BTC's pair. At the pair that fits Solana it flips more than twice as often over the same bars. That difference is the table.*

## When the daily and the weekly disagree

Most of the time both timeframes point the same way and the card says ALIGNED, which is the boring case and the one you want. The interesting case is the other one. ==A daily chart turning up inside a weekly downtrend is the single most expensive disagreement in trading, because it looks exactly like the bottom.== The card calls it CONFLICT and leaves the weekly trend where it is.

![A framed TradingView weekly chart of Cardano on Binance, September 2025 to September 2026. A stepped line sits above price from a bar labelled bearish in November 2025 and steps down all year as price falls from 0.85 to the low 0.20s. The card reads YERBA TRENDLINE v0.2.0, CONFIRMED CLOSE, BEARISH since 2025-11-10, Flipped at 0.5789, Flips at 0.2573, minus 59.9% since, 1W down, 1D up, CONFLICT.](./assets/ada-weekly.webp)

*Cardano, weekly, captured 2026-09-20. Ten months bearish, price 59.9% below where the trend started, and the daily has just turned up. The weekly needs a close above 0.2573 to agree. This one runs on the defaults: ADA still fits no pair of its own.*

## Built for the weekly chart

Every number in Yerba Trendline was measured on weekly bars, and the idea behind it, one decision a week confirmed on the close, only really holds there.

It still runs on any timeframe TradingView can draw. Put it on a daily chart and you get the same line, the same card and the same alerts, stepping on daily closes instead of weekly ones. Two things change, and both are worth knowing:

- **The per-asset pair stops being the right pair.** Those two numbers were fitted on weekly bars. On a faster chart they're just numbers that happen to be there, so the line flips far more often and none of those flips have been tested.
- **The card compares your chart to one step down.** On a weekly chart the rows read 1W and 1D. On a daily chart they read 1D and 1H. The ladder is 1W, 1D, 1H, 15m, 5m, 1m.

Nothing stops you from running it lower. Switch the automatic pair off, type your own two numbers, and it's yours. It just hasn't been measured there, and I'd rather tell you than let you find out.

## The terms, short

Sold as is. **All sales are final**, with one exception: if the file won't compile in a current TradingView Pine editor and I can't fix it within 14 days of your report, you get a full refund. Updates are included for as long as I keep developing it, with no promised cadence. Support through [the contact form](/about#work-with-me), best effort. One buyer, personal use: don't share it, resell it, or publish it on TradingView. The [full licence and risk disclosure](/products/yerba/terms) are on this site, and the same two documents come inside the download.

None of this is investment advice. It's a trailing stop that tells you where it is. What you do at that price is yours.
