// POST /api/contact — the About page's "Work with me" form (CLAUDE.md §5.4).
//
// This is the ONLY on-demand route on the site. Everything else is prerendered
// HTML; `output` stays 'static' in astro.config.mjs and this one file opts out
// below. A form that sends mail needs a server, and that is the whole reason
// the Vercel adapter exists here.
//
// No JavaScript is involved on the visitor's side. This is a native form POST:
// the browser submits, we send the mail, we redirect. That keeps the About page
// static and means the form still works with scripting disabled.
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY } from 'astro:env/server';

export const prerender = false;

/** Where the message lands. */
const TO = 'hello@deadlinklabs.com';

// Deliberately not the personal Gmail. `hello@` is a Cloudflare Email Routing
// alias that forwards there, so the destination inbox can change in a dashboard
// instead of in a deploy — and the personal address stays out of a public repo.

/**
 * Envelope sender. A distinct address from `hello@` on purpose: automated form
 * mail and human correspondence build separate sending reputations, and if the
 * form ever starts getting abused it can be filtered on its own.
 * Must be on the Resend-verified domain or the send is rejected.
 */
const FROM = 'Deadlink Labs <forms@deadlinklabs.com>';

/** Success and failure destinations. Trailing slashes: `build.format` is 'directory'. */
const SENT = '/thank-you/';
const FAILED = '/about/#contact-error';

/**
 * Field length ceilings. This is input validation, not spam protection — it
 * bounds a malformed or oversized payload so one request cannot post a novel.
 * The honeypot and timing check are deliberately deferred to LOG 004, and must
 * land before `ALLOW_INDEXING` flips on (ROADMAP.md).
 */
const MAX = { name: 120, email: 200, company: 160, problem: 4000 };

/** Good enough to catch typos and junk. Real validation is whether the reply lands. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: FormDataEntryValue | null, limit: number) =>
  typeof value === 'string' ? value.trim().slice(0, limit) : '';

export const POST: APIRoute = async ({ request, redirect }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    // Body was not form-encoded — a bot or a broken client, not a visitor.
    return redirect(FAILED, 303);
  }

  const name = clean(form.get('name'), MAX.name);
  const email = clean(form.get('email'), MAX.email);
  const company = clean(form.get('company'), MAX.company);
  const problem = clean(form.get('problem'), MAX.problem);

  // The browser enforces `required` too, but never trust that: this endpoint is
  // a public URL and can be posted to directly.
  if (!name || !problem || !EMAIL.test(email)) return redirect(FAILED, 303);

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      // This is what makes hitting Reply in Gmail answer the person who wrote
      // in, rather than the no-one behind `forms@`.
      replyTo: email,
      // No em dash. This is a subject line a person reads, so VOICE.md applies.
      subject: `Work with me: ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || '—'}`,
        '',
        "What's eating your time?",
        problem,
      ].join('\n'),
    });

    // Resend reports send failures in the payload, not by throwing. Ignoring
    // `error` is how a form silently swallows messages while looking healthy.
    if (error) {
      console.error('[contact] Resend rejected the send:', error);
      return redirect(FAILED, 303);
    }
  } catch (cause) {
    // Network failure, bad API key, Resend down.
    console.error('[contact] Send threw:', cause);
    return redirect(FAILED, 303);
  }

  // 303 specifically, so the browser follows with GET. A 302 here would let a
  // refresh on the thank-you page resubmit the form.
  return redirect(SENT, 303);
};
