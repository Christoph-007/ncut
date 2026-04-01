import { useState } from 'react'

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated auth check (this would integrate with backend auth eventually)
    if (password === 'secret') {
      setError(false)
      // Redirect to home
      window.location.href = '/'
    } else {
      setError(true)
    }
  }

  return (
    <div className="password-page-container" style={{ textAlign: 'center', maxWidth: '450px', width: '100%', padding: '2rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 'var(--border-radius-md)', backdropFilter: 'blur(10px)' }}>
      <h1 style={{ marginBottom: '1rem', background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem' }}>
        Opening Soon
      </h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
        Be the first to know when we launch. Enter password for early access.
      </p>

      <form onSubmit={handleSubmit} className="password-form">
        <label htmlFor="Password" className="visually-hidden" style={{ display: 'none' }}>
          Password
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="password"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            aria-label="Password"
            required
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-full)',
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--color-foreground)',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          />
          <button type="submit" className="btn btn--primary">
            Enter
          </button>
        </div>
        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Incorrect password. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}
