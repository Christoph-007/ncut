/**
 * ContactFormSubmitButton — Converted from blocks/contact-form-submit-button.liquid
 * Submit button for the contact form.
 */
export default function ContactFormSubmitButton({
  label = 'Send message',
  styleClass = 'button',
  disabled = false,
}) {
  return (
    <button
      type="submit"
      className={`contact-form__submit ${styleClass}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
