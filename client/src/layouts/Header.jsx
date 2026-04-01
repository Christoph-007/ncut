import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Header() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          NCUT
        </Link>

        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/collections/all">Shop</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="header__actions">
          <form onSubmit={handleSearch} className="header__search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search"
            />
            <button type="submit" aria-label="Submit search">Search</button>
          </form>

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <Link to="/cart" aria-label={`Cart (${cartCount} items)`}>
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  )
}
