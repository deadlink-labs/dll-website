// The contact form's rules and its wording, in one place, so the browser and
// the server say exactly the same thing. src/actions/index.ts builds its zod
// schema from these; the script in src/pages/about.astro checks each field
// as the visitor leaves it and prints the same words. This file ships to the
// browser, so nothing in it may import server code.

export type Field = 'name' | 'email' | 'company' | 'message';

export const LIMIT = { name: 120, email: 200, company: 160, message: 4000 } as const;

// The name is the one thing the visitor types that goes back OUT, in the
// receipt's greeting and in the subject line to the inbox. Without a rule on
// it, anyone could use this form to send "Hi http://spam.link," from this
// domain to any address they name. So: letters from any alphabet (\p{L}, plus
// the combining marks \p{M} that accents can arrive as), spaces, apostrophes,
// periods and hyphens. No digits, no URLs, and no line breaks, which is what
// keeps it on one line without a second check.
export const NAME_ONLY = /^[\p{L}\p{M}' .-]+$/u;

// A company goes into the body's second line, so it has to fit on one line.
export const ONE_LINE = /^[^\r\n]*$/;

// Every message here is written for the visitor who typed it, not for a
// developer reading a log.
export const MESSAGE = {
  name: {
    empty: 'Please add your name.',
    long: 'Your name is too long for this field (120 characters at most).',
    chars: 'Use just your name here: letters, spaces, apostrophes and hyphens.',
  },
  email: {
    empty: 'Please add your email so I can reply.',
    invalid: 'That email address does not look right. Check it and try again.',
    long: 'That email address is too long (200 characters at most).',
  },
  company: {
    long: 'The company name is too long for this field (160 characters at most).',
    line: 'The company name should fit on one line.',
  },
  message: {
    empty: 'Please write a message.',
    long: 'Your message is too long for this form (4,000 characters at most).',
  },
  source: 'Something is off with the form. Reload the page and try again.',
} as const;

// What the browser prints under a field, or '' when the value passes. The
// checks run in the schema's order, so the first message zod would pick is
// the one the visitor reads here. Email FORMAT is the browser's own
// `type="email"` check, handed in as `badEmail`: it is close to zod's, and
// if the two ever disagree the server answers under the field in the same
// words, so nothing is lost by not shipping zod to the page.
export function check(field: Field, raw: string, badEmail = false): string {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (!value) return MESSAGE.name.empty;
      if (value.length > LIMIT.name) return MESSAGE.name.long;
      if (!NAME_ONLY.test(value)) return MESSAGE.name.chars;
      return '';
    case 'email':
      if (!value) return MESSAGE.email.empty;
      if (badEmail) return MESSAGE.email.invalid;
      if (value.length > LIMIT.email) return MESSAGE.email.long;
      return '';
    case 'company':
      if (value.length > LIMIT.company) return MESSAGE.company.long;
      if (!ONE_LINE.test(value)) return MESSAGE.company.line;
      return '';
    case 'message':
      if (!value) return MESSAGE.message.empty;
      if (value.length > LIMIT.message) return MESSAGE.message.long;
      return '';
  }
}
