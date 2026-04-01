import { useState } from 'react'
import api from '../api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-page container">
      <h1>Contact Us</h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && <p className="form-success">Message sent successfully!</p>}
        {status === 'error' && <p className="form-error">Something went wrong. Please try again.</p>}
      </form>
    </div>
  )
}
