import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function BlogPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/blog')
      .then((res) => setArticles(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="container">Loading...</p>

  return (
    <div className="blog-page container">
      <h1>Blog</h1>
      <div className="blog-grid">
        {articles.map((article) => (
          <Link key={article._id} to={`/blog/${article.slug}`} className="article-card">
            {article.image && <img src={article.image} alt={article.title} />}
            <h2>{article.title}</h2>
            <p className="article-card__meta">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            {article.excerpt && <p>{article.excerpt}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
