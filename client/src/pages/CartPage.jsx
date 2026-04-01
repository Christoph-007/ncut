import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/collections/all" className="btn btn--primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart-page container">
      <h1>Your Cart</h1>

      <div className="cart-page__items">
        {cartItems.map((item) => (
          <div key={`${item.product._id}-${item.variant?._id}`} className="cart-item">
            {item.product.images?.[0] && (
              <img src={item.product.images[0]} alt={item.product.title} />
            )}

            <div className="cart-item__details">
              <Link to={`/products/${item.product._id}`}>
                <h3>{item.product.title}</h3>
              </Link>
              {item.variant?.title && <p>{item.variant.title}</p>}
              <p>${item.variant?.price?.toFixed(2)}</p>
            </div>

            <div className="cart-item__quantity">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product._id, item.variant?._id, Number(e.target.value))
                }
              />
            </div>

            <p className="cart-item__subtotal">
              ${(item.variant?.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.product._id, item.variant?._id)}
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-page__summary">
        <p>Total: <strong>${cartTotal.toFixed(2)}</strong></p>
        <button className="btn btn--primary" onClick={() => navigate('/checkout')}>
          Checkout
        </button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  )
}
