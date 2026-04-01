import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../api'

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setSelectedVariant(res.data.variants?.[0] || null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="container">Loading...</p>
  if (!product) return <p className="container">Product not found.</p>

  function handleAddToCart() {
    addToCart({ product, variant: selectedVariant, quantity })
  }

  return (
    <div className="product-page container">
      <div className="product-page__media">
        {product.images?.map((src, i) => (
          <img key={i} src={src} alt={`${product.title} image ${i + 1}`} />
        ))}
      </div>

      <div className="product-page__info">
        <h1>{product.title}</h1>
        <p className="product-page__price">
          ${selectedVariant?.price?.toFixed(2)}
        </p>

        {product.variants?.length > 1 && (
          <div className="product-page__variants">
            <label htmlFor="variant-select">Variant</label>
            <select
              id="variant-select"
              value={selectedVariant?._id}
              onChange={(e) =>
                setSelectedVariant(product.variants.find((v) => v._id === e.target.value))
              }
            >
              {product.variants.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="product-page__quantity">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button className="btn btn--primary" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div
          className="product-page__description"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
        />
      </div>
    </div>
  )
}
