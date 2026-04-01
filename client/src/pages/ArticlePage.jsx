import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then((res) => setArticle(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p className="container">Loading...</p>
  if (!article) return <p className="container">Article not found.</p>

  return (
    <article className="article-page container">
      <header className="article-page__header">
        <h1>{article.title}</h1>
        <p className="article-page__meta">
          By {article.author} &middot; {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </header>

      {article.image && (
        <img className="article-page__image" src={article.image} alt={article.title} />
      )}

      <div
        className="article-page__content"
        dangerouslySetInnerHTML={{ __html: article.contentHtml || article.content }}
      />
    </article>
  )
}
