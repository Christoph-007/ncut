import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__column">
          <h3>Shop</h3>
          <ul>
            <li><Link to="/collections/all">All Products</Link></li>
            <li><Link to="/collections/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/collections/sale">Sale</Link></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Info</h3>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Account</h3>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} NCUT. All rights reserved.</p>
      </div>
    </footer>
  )
}
