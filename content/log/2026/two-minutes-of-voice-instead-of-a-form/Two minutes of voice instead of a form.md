---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-29
project: "[[Service reports]]"
people: []
aliases:
  - "LOG 011"
  - "Service report proposal"

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published
web-title: "Two minutes of voice instead of a form"
web-pub-date: 2026-07-29
web-snippet: "A pilot proposal for a manufacturer whose technicians never finish their service reports: the technician talks for two minutes on WhatsApp, and the system writes the report."
web-type: log
web-number: 11
web-stage: SHIPPED
web-tags: [CLIENT-WORK, AI, N8N, WHATSAPP]
web-thumb: "./assets/thumb.webp"   # on-brand specimen tile (generated); source at assets/thumb.svg
---

A field technician finishes a service at a customer's plant, gets in the van, and
drives home. Somewhere in there he is supposed to fill in a service report. He
usually does not, or he does half of it, and the half he skips is the half that
matters two years later.

I spent a few weeks with that problem and shipped a four-week pilot proposal for
it. The client is a manufacturer of heat exchangers, electrovalves, pumps and
process equipment, sold and maintained inside food, dairy and pharmaceutical
plants. They are not named here, and neither is anyone who works there.

What I proposed is one sentence long: the technician talks for two minutes on
WhatsApp, and the system writes the report.

```terminal
$ docker compose ps
n8n         running   orchestrator, and the dashboard
whisper     running   transcription, on their own server
postgres    running   healthy
gotenberg   running   html in, pdf out
```

## The finding

The report is not an internal formality. In a pharmaceutical or a dairy plant,
quality receives it and files it as a controlled document. When an audit comes,
that paper is what gets shown. So an unfinished report is not a form filled in
badly. It is a finding, in somebody else's plant, with the manufacturer's name on
it.

Then there is the side nobody is looking at. Without structured data there is no
failure history per machine and per customer. Every service starts from zero.
Spares and warranties get estimated by feel, because there is nothing to count.

![The cost of an unfinished service report, three ways: outward, an audit finding in the customer's plant; inward, no failure history, so every service starts at zero; forward, the asset they are not building.](./assets/cost.svg)

The constraint that decides everything came out of watching how the report
actually gets filled in, not from the form itself. The technician is dirty, in a
hurry, in a plant that is not his, finishing at six in the evening. Anything that
adds a step will not get used. That is not a training problem, and it will not be
fixed by a better form.

TAKEAWAY: when a process fails at the same point every time, look at the
conditions at that point, not at the artifact. The form was never the problem.

## From audio to report

Six steps. The technician is in exactly one of them.

![Six steps from audio to report: the technician sends the audio, gets an instant acknowledgement, the audio is transcribed, the data is structured, anything missing is asked for, and the report and its history come out the other end. Step 01 is the only one the technician is in.](./assets/flow.svg)

He opens WhatsApp, finds a contact, and talks. If he took photos he sends those
too. He gets an acknowledgement immediately, which matters more than it sounds
like: transcription takes a minute or two, and a person who sends something and
hears nothing assumes it failed. With the acknowledgement he puts the phone away
and drives.

Everything after that runs without him waiting on it. The audio is transcribed,
the transcript is turned into the same fields every time (customer, machine,
serial number, fault, cause, work done, spares), and the report comes out with
the company's own formatting.

## The only real risk

The technical parts of this are not hard. Every one of them is a service that
already exists. The risk is that the technicians do not use it, and that risk is
not a technical problem, so it cannot be solved with a technical answer.

So every design choice attacks adoption:

- **No new app and no training.** It is the WhatsApp he already has, plus one
  contact.
- **No waiting.** The acknowledgement is instant. The processing runs while he
  drives back.
- **Everything missing, in one message.** Not a conversation. One message with
  every gap in it.
- **Two rounds, never a third.** If something is still missing after the second
  ask, the report closes anyway and records what is missing.
- **He always gets his report.** He can read what the system put in his mouth and
  correct it.

![The follow-up exchange, in Spanish. The system asks for everything it is missing in one message, the technician answers in a single line from the van, and the report closes in one round.](./assets/whatsapp.svg)

*The exchange as it would run. The system says it is close to closing and asks
three things at once: serial number of the exchanger, which spares, what time he
finished. He answers with "AX-40-2219, two NBR gaskets and I finished 17:40" and
that is the whole interaction.*

The two-round cap is the decision I would defend hardest. Chasing a technician a
third time is exactly the friction this was built to remove. A report at ninety
percent that arrives is worth more than a perfect one that never does, and the
missing field can be filled by a person later. The technician who stops answering
does not come back.

## The AI goes at the edges, never in the middle

This is the part that transfers to every other project, so it gets its own
heading.

I counted the steps in the flow and asked which ones need judgement. Receiving
the webhook: no. Checking the message is not a duplicate: no. Checking the number
is authorized: no. Downloading the audio: no. Transcribing it: no. **Reading the
technician's story and pulling the facts out of it: yes.** Saving to the database:
no. Deciding whether something is missing: no, that is a length check. Generating
the PDF: no. Sending it: no.

One out of ten. The other nine are plumbing, and plumbing has to give the same
answer every time.

![The flow: WhatsApp trigger, local transcription, model structuring, a completeness check, storage and PDF, all inside the customer's own server. The ask-again loop is capped at two rounds. One dashed line leaves the boundary, and it is the model call, at about USD 3.30 a month for 100 services.](./assets/pipeline.svg)

*The flow as it runs. Everything inside the frame is on their own hardware. The
one line crossing the boundary is the model call, and it carries text, never
audio.*

If a model runs the whole pipeline, every execution is a fresh decision. One day
it names a field differently. One day it decides to tidy up the work description
so it reads better, and now the content of a document that will be audited has
been changed by something nobody instructed. The variability is not a defect of
the model. It is the whole point of the model. It is just a defect *here*.

Three things follow from that, and they are the architecture:

**Transcription runs on their own server.** In two minutes a technician says the
customer's name, which plant, which machine, and what broke. That is competitive
information about somebody else's operation, spoken by a third party. Running it
locally costs nothing but CPU and turns a long conversation with a pharmaceutical
client into one sentence: the audio does not leave the network.

**The structured output is guaranteed, not requested.** The fields are defined as
a schema that the API enforces, rather than described in the prompt and hoped for.
Every key comes back every time, and a field the technician did not mention comes
back empty instead of invented. That is the difference between a system you can
query in a year and a pile of text.

**Four points touch the outside world, and each one is a variable.** Input,
transcription, model, output. Each sits behind a switch that reads an environment
variable and a step that normalizes the answer back to a fixed shape. Between
them, the flow is identical in every configuration.

```terminal
# the four edges. two lines are the whole difference between
# my laptop and their server, and neither one is an engine.
CANAL_ENTRADA=whatsapp        # or a watched folder, for the prototype
CANAL_SALIDA=whatsapp         # or a file on disk
STT_PROVIDER=whisper_local    # does not change
LLM_PROVIDER=claude           # or gemini, or a local model
```

That last one is not architecture for its own sake. It is what makes the answer
to "what if you leave" and "what if that provider has a bad day" a variable
instead of a project.

TAKEAWAY: put the model where language enters and leaves the system, and nowhere
else. A data pipeline has to be boring in the middle.

## The subproduct is worth more than the report

The report fixes the problem they have today. The thing it leaves behind is worth
more, and it is the reason I would have wanted this project.

At the volume the costing assumes, six months in they have a few hundred
structured service records: which machine, at which customer, failed how, and what
was replaced. No competitor selling into those plants has that.

![What the reports leave behind: a curve accumulating to roughly 600 structured service records by month six, which is what makes preventive contracts, calculated spare stock and a customer portal possible.](./assets/history.svg)

*Projected at the hundred services a month the costing uses. The point is the
shape, not the number.*

Three things become possible with it, and none of them are possible without it.
"This machine had four corrective interventions in a year" is the sentence that
sells a maintenance contract, and it needs data rather than an impression. Spare
stock held at customer sites moves from estimated to counted. And a portal where
a customer looks up the history of their own equipment is a product, built out of
data they would already own.

There is one small, boring decision that decides whether any of that works. If the
technician says a customer's nickname and we store it as free text, in six months
the same customer exists four different ways and the history cannot be crossed
with anything. So the proposal asks for one spreadsheet of customer codes, exported
from their ERP, and matches against it. Not an integration. Not access. A
spreadsheet.

TAKEAWAY: a field that costs nothing to add today costs a cleanup project later.
Decide how records will be joined before you have any.

## Four weeks

- **Week 1, discovery.** A full day in the field with a real service. Define the
  minimum useful report with maintenance and quality. Measure the baseline: of the
  last fifty reports, how many are complete, and how long did they take to arrive.
  Without that number, nothing at the end can be called a result.
- **Week 2, prototype.** The whole flow running, tested internally, adjusted
  against real friction rather than imagined friction.
- **Week 3, field pilot.** Two or three technicians on real services, iterating
  daily. This is when the PDF gets built, because that is when the first report
  goes to an actual customer.
- **Week 4, measured result.** Measure against the baseline. Hand over the code
  and the documentation on their infrastructure. Prioritize what comes next.

Explicitly out of scope, and written down as such: corporate hardening, hosting
and backups; direct ERP integration, where the proposal only prepares the data to
be joined later; and support after handover, which is quoted separately. Their
IT lead owns where it runs, who has access, and what happens to the data. That is
his territory, and the design assumes it.

The whole thing runs on about three dollars a month at a hundred services. That
is the only recurring cost, it is prepaid credit rather than a contract, and if
the project stops, nothing keeps running.

## The decisions, on the record

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | The model goes at the edges of the pipeline, never in the middle | SETTLED |
| DEC 002 | Transcribe on their own server; the audio never leaves their network | SETTLED |
| DEC 003 | A visual orchestrator over a script I write, so their IT lead can read the flow | SETTLED |
| DEC 004 | Four interchangeable edges behind environment variables | SETTLED |
| DEC 005 | Structured output enforced by a schema, not requested in the prompt | SETTLED |
| DEC 006 | Answer the webhook immediately, then do the work | SETTLED |
| DEC 007 | Two rounds of follow-up questions, never a third | SETTLED |
| DEC 008 | Store the raw transcript and which model wrote each report, permanently | SETTLED |
| DEC 009 | Ask for a spreadsheet of customer codes, not access to the ERP | SETTLED |
| DEC 010 | Serve the dashboard from the orchestrator; drop the BI tool I first proposed | REVISED |
| DEC 011 | Run the structuring on a local model instead | RESEARCH |

DEC 010 is the one I got wrong first. I proposed a full BI tool, and the honest
objection came back that it was a second application to run, update and back up,
all to answer six fixed questions, and that nobody would open it. Six queries and
a page of HTML served from the orchestrator do the same job with one less thing to
maintain.

DEC 011 stays open on purpose. Running the structuring on their own hardware
would make the system fully on-premise at zero running cost, and I did not propose
it, because a smaller model's failure mode is to fill in a number nobody said, and
that number would land in a document that audits a pharmaceutical plant. So the
raw transcript and the model name are stored on every record from day one. When
they want that conversation, it can be run on their own reports, and settled with
data instead of opinion.

## What happened next

I sent it on 2026-07-29. Weeks have passed and there has been no reply, and at
this point I do not expect one.

That is the honest ending, and it does not change what the work is. The proposal
shipped. The thinking is on the record, the architecture holds, and the four-edge
pattern and the local-transcription argument have both gone straight into how I
scope the next one.

If I ran it again I would change one thing. I would put the field day before the
proposal instead of inside week 1 of it, even unpaid. Everything in here that I
am confident about came from understanding how the work actually happens, and
everything I am less sure about is a thing I had to assume.

## What carries over

Three things, none of them about this industry.

Find the point where the process actually breaks, and look at the conditions
there rather than at the artifact. The form was never the problem.

Put the model where language enters and leaves, and write ordinary deterministic
code for everything between. That single rule is what makes a system somebody
else's engineer is willing to trust.

And build the thing they asked for in a way that leaves behind the thing they did
not know to ask for. The report was the deliverable. The history is the asset.

Build to understand.
