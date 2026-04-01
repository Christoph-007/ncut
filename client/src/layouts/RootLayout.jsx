import { Outlet } from 'react-router-dom'
import { useThemeSettings } from '../context/ThemeContext'
import Header from './Header'
import Footer from './Footer'

export default function RootLayout() {
  const settings = useThemeSettings();

  return (
    <>
      <Header />
      <main 
        id="main-content" 
        className={`content-for-layout page-width--${settings.page_width}`}
        style={{
          transition: settings.page_transition_enabled ? 'opacity 0.3s ease' : 'none'
        }}
      >
        <Outlet />
      </main>
      <Footer />
      {/* 
        Stubs for global modal components replicated from theme.liquid 
        Uncomment to use when these are implemented:
        <SearchModal />
        <QuickAddModal />
      */}
    </>
  )
}
