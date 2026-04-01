import { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import api from '../api'

export default function CollectionPage() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [collection, setCollection] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const page = Number(searchParams.get('page') || 1)
  const sort = searchParams.get('sort') || 'default'

  useEffect(() => {
    setLoading(true)
    api.get(`/collections/${id}?page=${page}&sort=${sort}`)
      .then((res) => {
        setCollection(res.data.collection)
        setProducts(res.data.products)
        setTotal(res.data.total)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id, page, sort])

  function handleSort(e) {
    setSearchParams({ page: 1, sort: e.target.value })
  }

  if (loading) return <p className="container">Loading...</p>

  return (
    <div className="collection-page container">
      <div className="collection-page__header">
        <h1>{collection?.title || 'All Products'}</h1>
        {collection?.description && <p>{collection.description}</p>}

        <select value={sort} onChange={handleSort} aria-label="Sort products">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Name: A–Z</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="product-card">
            {product.images?.[0] && (
              <img src={product.images[0]} alt={product.title} />
            )}
            <h3>{product.title}</h3>
            <p>${product.variants?.[0]?.price?.toFixed(2)}</p>
          </Link>
        ))}
      </div>

      {total > products.length && (
        <div className="pagination">
          {page > 1 && (
            <button onClick={() => setSearchParams({ page: page - 1, sort })}>
              Previous
            </button>
          )}
          <span>Page {page}</span>
          <button onClick={() => setSearchParams({ page: page + 1, sort })}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}
