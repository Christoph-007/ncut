import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { I18nProvider } from './context/I18nContext'
import RootLayout from './layouts/RootLayout'
import PasswordLayout from './layouts/PasswordLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CollectionPage from './pages/CollectionPage'
import ListCollectionsPage from './pages/ListCollectionsPage'
import CartPage from './pages/CartPage'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import SearchPage from './pages/SearchPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PasswordPage from './pages/PasswordPage'
import GiftCardPage from './pages/GiftCardPage'
import GenericPage from './pages/GenericPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <CartProvider>
          <Routes>
          <Route path="/password" element={<PasswordLayout />}>
            <Route index element={<PasswordPage />} />
          </Route>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="pages/:handle" element={<GenericPage />} />
            <Route path="products/:id" element={<ProductPage />} />
            <Route path="collections" element={<ListCollectionsPage />} />
            <Route path="collections/:id" element={<CollectionPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        </CartProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
