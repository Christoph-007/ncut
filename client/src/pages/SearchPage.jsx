import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    api.get(`/search?q=${encodeURIComponent(query)}`)
      .then((res) => setResults(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div className="search-page container">
      <h1>Search results for &ldquo;{query}&rdquo;</h1>

      {loading && <p>Searching...</p>}

      {!loading && results.length === 0 && query && (
        <p>No results found for &ldquo;{query}&rdquo;.</p>
      )}

      <div className="product-grid">
        {results.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="product-card">
            {product.images?.[0] && (
              <img src={product.images[0]} alt={product.title} />
            )}
            <h3>{product.title}</h3>
            <p>${product.variants?.[0]?.price?.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
