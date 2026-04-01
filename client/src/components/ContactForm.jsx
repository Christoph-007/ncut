import { useState } from 'react';
import ContactFormSubmitButton from './ContactFormSubmitButton.jsx';

/**
 * ContactForm — Converted from blocks/contact-form.liquid
 * Full contact form: name, email, phone, message.
 *
 * Props:
 *   onSubmit {function} — async fn({name, email, phone, body}) → throws on error
 *   padding  {object}
 */
export default function ContactForm({ onSubmit, padding = {} }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', body: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('idle');
    try {
      if (onSubmit) {
        await onSubmit(fields);
      } else {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error('Failed to send message.');
      }
      setStatus('success');
      setFields({ name: '', email: '', phone: '', body: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  const style = {
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className="contact-form" style={style}>
      {status === 'error' && (
        <div className="contact-form__error" role="alert" style={{ color: 'var(--color-error, #ef4444)', marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}
      {status === 'success' && (
        <div className="contact-form__success" role="status" style={{ color: 'var(--color-success, #22c55e)', marginBottom: '1rem' }}>
          Thank you! Your message has been sent.
        </div>
      )}

      <form className="contact-form__form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__form-row">
          <label className="visually-hidden" htmlFor="ContactForm-name">Name</label>
          <input
            type="text"
            id="ContactForm-name"
            name="name"
            className="contact-form__input"
            value={fields.name}
            onChange={handleChange}
            placeholder="Name"
            autoComplete="name"
          />

          <label className="visually-hidden" htmlFor="ContactForm-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="ContactForm-email"
            name="email"
            className="contact-form__input"
            value={fields.email}
            onChange={handleChange}
            placeholder="Email"
            required
            aria-required="true"
            autoComplete="email"
          />
        </div>

        <label className="visually-hidden" htmlFor="ContactForm-phone">Phone</label>
        <input
          type="tel"
          id="ContactForm-phone"
          name="phone"
          className="contact-form__input"
          value={fields.phone}
          onChange={handleChange}
          placeholder="Phone (optional)"
          pattern="[0-9\-]*"
          autoComplete="tel"
        />

        <label className="visually-hidden" htmlFor="ContactForm-body">Message</label>
        <textarea
          id="ContactForm-body"
          name="body"
          className="contact-form__input contact-form__input--textarea"
          value={fields.body}
          onChange={handleChange}
          placeholder="Message"
          rows={10}
        />

        <ContactFormSubmitButton label="Send message" />
      </form>
    </div>
  );
}
