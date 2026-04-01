import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../context/I18nContext'
import ProductHotspots from '../components/ProductHotspots'
import MediaWithContent from '../components/MediaWithContent'
import ProductCard from '../components/ProductCard'
import ComparisonSlider from '../components/ComparisonSlider'

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation();

  useEffect(() => {
    // In a real app we'd fetch specific featured collections
    // Here we'll just fetch a few products to simulate it
    fetch('/api/products?limit=4')
      .then(res => res.json())
      .then(data => setFeatured(data.products || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home-page">
      {/* Hero — mirrors sections/hero.liquid */}
      <section className="hero">
        <div className="hero__content">
          <h1>Welcome to NCUT</h1>
          <p>Discover our latest collection</p>
          <Link to="/collections/all" className="btn btn--primary">
            Shop Now
          </Link>
        </div>
      </section>
      
      {/* Verify Complex New Components */}
      <MediaWithContent 
        imageSrc="/placeholder.jpg" 
        heading="Up The Ante" 
        caption="Signature Collection" 
        text="Experience premium responsive web design translated from Shopify liquid schema directly into native React."
        mediaPosition="right"
      />
      <ProductHotspots />
      <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Drag to Compare</h2>
        <ComparisonSlider 
          beforeImage="https://picsum.photos/1200/600?grayscale" 
          afterImage="https://picsum.photos/1200/600"
          beforeText="Base"
          afterText="Rendered"
        />
      </div>

      {/* Featured products — mirrors sections/product-list.liquid */}
      <section className="featured-products container" style={{ padding: '4rem 0' }}>
        <h2 style={{ marginBottom: '2.5rem', fontSize: '2.5rem', textAlign: 'center' }}>Featured Products</h2>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Loading collection...</p>
        ) : (
          <div 
            className="product-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem' 
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
