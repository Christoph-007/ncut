import { Outlet } from 'react-router-dom'

export default function PasswordLayout() {
  return (
    <div className="password-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main id="MainContent" className="content-for-layout password-main-content" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Outlet />
      </main>
      
      <footer className="password-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', textAlign: 'center' }}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} NCUT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
