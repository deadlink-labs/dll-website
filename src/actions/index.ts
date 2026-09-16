// The contact form's server side, and the only code on this site that runs
// on demand (CLAUDE.md §4, LOG 002). Everything else is prerendered HTML.
//
// Shape: Resend's own Astro guide (resend.com/docs/send-with-astro), which
// uses an Astro Action rather than a hand-written API route. Two deliberate
// departures from that guide: the key is read through `astro:env/server`,
// never `import.meta.env` (that would compile the secret into the bundle),
// and every email body is `text:`, never `html:`, so a stranger's input is
// never interpolated into markup.
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { RESEND_API_KEY } from 'astro:env/server';
// The limits, the two regexes and every message the visitor can read live in
// one shared file, because the page's script checks each field with the same
// rules before the request is made. Change a word there and both sides change.
import { LIMIT, MESSAGE, NAME_ONLY, ONE_LINE } from '../lib/contact-rules';

// The one address every message lands on. It is a Cloudflare forwarding rule,
// not a personal inbox, so the real destination lives in a dashboard and
// never in this repo.
const INBOX = 'hello@deadlinklabs.com';

// What the visitor reads when the send fails. It never only apologises: it
// hands over the direct address, which reaches the same inbox.
const SEND_FAILED =
  `Your message didn't go through. What you typed is still here. ` +
  `Email me at ${INBOX} instead. It reaches the same inbox.`;

// `invalid_type_error` is not optional: an empty required field arrives from
// form data as `null`, not `""`, and without it zod would answer "Expected
// string, received null" in place of our words.
const input = z.object({
  name: z
    .string({ invalid_type_error: MESSAGE.name.empty })
    .trim()
    .min(1, MESSAGE.name.empty)
    .max(LIMIT.name, MESSAGE.name.long)
    .regex(NAME_ONLY, MESSAGE.name.chars),
  email: z
    .string({ invalid_type_error: MESSAGE.email.empty })
    .trim()
    .email(MESSAGE.email.invalid)
    .max(LIMIT.email, MESSAGE.email.long),
  company: z
    .string()
    .trim()
    .max(LIMIT.company, MESSAGE.company.long)
    .regex(ONE_LINE, MESSAGE.company.line)
    .optional(),
  message: z
    .string({ invalid_type_error: MESSAGE.message.empty })
    .trim()
    .min(1, MESSAGE.message.empty)
    .max(LIMIT.message, MESSAGE.message.long),
  // Which form the message came from. Only `contact` exists today; it stays a
  // free string so a second form can name itself without touching the schema.
  source: z
    .string({ invalid_type_error: MESSAGE.source })
    .trim()
    .min(1, MESSAGE.source)
    .max(40, MESSAGE.source),
});

export const server = {
  contact: defineAction({
    accept: 'form',
    input,
    handler: async ({ name, email, company, message, source }) => {
      const resend = new Resend(RESEND_API_KEY);

      // 1. The message, to the inbox. Reply-To is the visitor, so a plain
      //    reply from the inbox goes straight back to them. The subject says
      //    which form it came from, so a second form is told apart at a glance.
      const subject = source === 'contact' ? `Work with me: ${name}` : `Form (${source}): ${name}`;
      const body = [
        `${name} <${email}>`,
        `Company: ${company || 'not given'}`,
        `Source: ${source}`,
        '',
        message,
      ].join('\n');

      // 2. Resend reports a rejected send inside the response, not by
      //    throwing. Without the `error` check a failed send would look
      //    exactly like a successful one and the message would be lost.
      //    The try/catch is for the other failure: the network. Both log the
      //    cause (never the visitor's details) for Vercel's function logs.
      try {
        const { error } = await resend.emails.send({
          from: 'Deadlink Labs <forms@deadlinklabs.com>',
          to: INBOX,
          replyTo: email,
          subject,
          text: body,
        });
        if (error) {
          console.error('[contact] send rejected:', error.name, error.message);
          throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: SEND_FAILED });
        }
      } catch (err) {
        if (err instanceof ActionError) throw err;
        console.error('[contact] send threw:', err);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: SEND_FAILED });
      }

      // 3. The receipt, to the visitor, only now that the message has landed.
      //    It repeats nothing they typed except their name. Anyone can put
      //    any address into a form, including someone else's; if the receipt
      //    quoted the message, a stranger could be sent an ad signed by this
      //    domain. So it only says the message arrived.
      // 4. A failed receipt never fails the form: the message is already in
      //    the inbox. It is logged (Vercel's function logs) and the panel is
      //    told not to promise a copy.
      let receipt = false;
      try {
        const { error } = await resend.emails.send({
          from: `Deadlink Labs <${INBOX}>`,
          to: email,
          subject: 'Your message reached Deadlink Labs',
          text: [
            `Hi ${name},`,
            '',
            'Thanks for reaching out. I usually get back within 1-2 business days.',
            'Talk soon,',
            'Marcelo',
            '',
            'Deadlink Labs',
            'https://deadlinklabs.com',
          ].join('\n'),
        });
        if (error) console.error('[contact] receipt rejected:', error.name, error.message);
        else receipt = true;
      } catch (err) {
        console.error('[contact] receipt threw:', err);
      }

      // 5. `receipt` lets the success panel promise a copy only when one went out.
      return { ok: true, receipt };
    },
  }),
};
