import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('user')
    if (token && stored) {
      setUser(JSON.parse(stored))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    const { token, user: userData } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password })
    const { token, user: userData } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
