// The contact form's browser side, shared by the About "Work with me" form and
// the product beta-request form (WaitlistForm.astro). One action, two forms:
// the markup is the same `.contact` card, the fields differ, and the page's
// inline <script> only finds the two roots and calls wireContactForm().
//
// The form calls the contact action from here, not from a form `action=`
// attribute. A form action would force the page to render on demand; calling
// it from a script keeps the page prerendered, and only the action itself runs
// on the server.
import { actions, isInputError } from 'astro:actions';
import { LIMIT, MESSAGE, check, type Field } from './contact-rules';

// Everything is looked up inside `form` and `panel`, never by page-wide id, so
// two forms on one site (or, one day, one page) never collide.
export function wireContactForm(form: HTMLFormElement, panel: HTMLElement, fields: readonly Field[]) {
  const alert = form.querySelector<HTMLElement>('.contact__alert');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const btnLabel = button?.querySelector<HTMLElement>('.contact__btn-label');
  const message = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
  // Optional: the count under the message box. Without it the box is a plain
  // textarea and nothing below is measured.
  const count = form.querySelector<HTMLElement>('.contact__count');
  const receipt = panel.querySelector<HTMLElement>('.contact__receipt');
  const again = panel.querySelector<HTMLButtonElement>('.contact__again');

  if (!alert || !button || !btnLabel || !message || !receipt || !again) return;

  // A duration avoids rejecting people whose device clock differs from ours.
  let openedAt = performance.now();
  // The fields the visitor types into, in the order they sit on the page.
  // `source` is hidden and has no line to print under.
  const isField = (name: string): name is Field => (fields as readonly string[]).includes(name);
  const inputOf = (name: Field) =>
    form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
  const errorOf = (name: Field) =>
    form.querySelector<HTMLElement>(`.contact__error[data-for="${name}"]`);

  // Print a message under a field, or clear it. The orange border and the
  // screen-reader flag follow the message.
  function show(name: Field, text: string) {
    const line = errorOf(name);
    if (line) line.textContent = text;
    if (text) inputOf(name).setAttribute('aria-invalid', 'true');
    else inputOf(name).removeAttribute('aria-invalid');
  }

  // Run one field through the same rules as the schema, in the schema's
  // words. Email format is the browser's own check, read off `validity`
  // rather than shown in its bubble. True when the field passes.
  function validate(name: Field): boolean {
    const input = inputOf(name);
    const text = check(name, input.value, input.validity.typeMismatch);
    show(name, text);
    return !text;
  }

  for (const name of fields) {
    const input = inputOf(name);
    // Checked as the visitor leaves the field, never while they are still
    // typing in it for the first time.
    input.addEventListener('blur', () => validate(name));
    // Once a field has a message, every keystroke re-checks it, so the
    // message goes away the moment the field is fixed.
    input.addEventListener('input', () => {
      if (input.hasAttribute('aria-invalid')) validate(name);
    });
  }

  // The count under the message box, and the box growing with the text.
  // `rows` is the floor; the CSS `max-height` is the ceiling, past which the
  // box scrolls. The height is measured with the box collapsed first so it
  // can shrink when text is deleted. `scrollHeight` leaves out the border,
  // and the box is `border-box`, so the border is added back.
  const syncMessage = () => {
    if (count) {
      count.textContent = `${message.value.length} / ${LIMIT.message}`;
      count.classList.toggle('contact__count--full', message.value.length >= LIMIT.message);
    }
    message.style.height = 'auto';
    message.style.height = `${message.scrollHeight + message.offsetHeight - message.clientHeight}px`;
  };
  message.addEventListener('input', syncMessage);
  syncMessage();

  const idleLabel = btnLabel.textContent;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    alert.textContent = '';

    // Every field, in order. The cursor lands on the first one that fails.
    let firstBad: Field | null = null;
    for (const name of fields) if (!validate(name)) firstBad ??= name;
    if (firstBad) {
      inputOf(firstBad).focus();
      return;
    }

    // While the request is in flight: the label reads "Sending" beside a
    // spinner, the button will not take a second click, and its width is
    // held so the shorter label does not shrink it under the cursor.
    button.style.minWidth = `${button.offsetWidth}px`;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    btnLabel.textContent = 'Sending';

    try {
      const payload = new FormData(form);
      payload.set('elapsedMs', String(Math.floor(performance.now() - openedAt)));
      const { data, error } = await actions.contact(payload);
      if (data) {
        // Sent. The panel takes the form's place. It promises a confirmation only
        // when the receipt to the visitor actually went out. The fields
        // are left as typed: only "Send another" clears them.
        receipt.hidden = !data.receipt;
        form.hidden = true;
        panel.hidden = false;
        panel.focus();
      } else if (isInputError(error)) {
        // The server rejected a field. Say which, under that field, and
        // put the cursor on the first one. A rejected `source` has no
        // field on screen, so its message goes to the form-level line.
        let first: Field | null = null;
        for (const [name, messages] of Object.entries(error.fields)) {
          if (!isField(name)) {
            alert.textContent = messages?.[0] ?? MESSAGE.source;
            continue;
          }
          show(name, messages?.[0] ?? '');
          first ??= name;
        }
        if (first) inputOf(first).focus();
      } else {
        // The send failed. The message says so and hands over hello@.
        // Fields stay exactly as typed, and nothing retries on its own:
        // the first attempt may already have landed.
        alert.textContent = error.message;
      }
    } catch {
      // The request never got an answer (offline, connection dropped).
      // `actions.*` does not catch this itself, so without this branch the
      // alert would stay empty. Same rules: fields untouched, no retry.
      alert.textContent =
        'Your message didn’t go through. What you typed is still here. ' +
        'Email me at hello@deadlinklabs.com instead. It reaches the same inbox.';
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      button.style.minWidth = '';
      btnLabel.textContent = idleLabel;
    }
  });

  // The one place the fields are cleared. The form comes back first so
  // the message box can be measured (a hidden box measures as zero), then
  // it is reset, and the cursor lands in the first field.
  again.addEventListener('click', () => {
    panel.hidden = true;
    form.hidden = false;
    form.reset();
    openedAt = performance.now();
    for (const name of fields) show(name, '');
    alert.textContent = '';
    syncMessage();
    inputOf(fields[0]!).focus();
  });
}
