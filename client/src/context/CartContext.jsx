import { createContext, useContext, useReducer, useMemo } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, variant, quantity } = action.payload
      const key = `${product._id}-${variant?._id}`
      const existing = state.find((i) => `${i.product._id}-${i.variant?._id}` === key)
      if (existing) {
        return state.map((i) =>
          `${i.product._id}-${i.variant?._id}` === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...state, { product, variant, quantity }]
    }
    case 'REMOVE':
      return state.filter(
        (i) => !(i.product._id === action.payload.productId && i.variant?._id === action.payload.variantId)
      )
    case 'UPDATE_QTY':
      return state.map((i) =>
        i.product._id === action.payload.productId && i.variant?._id === action.payload.variantId
          ? { ...i, quantity: action.payload.quantity }
          : i
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + (i.variant?.price ?? 0) * i.quantity, 0),
    [cartItems]
  )

  function addToCart(payload) {
    dispatch({ type: 'ADD', payload })
  }

  function removeFromCart(productId, variantId) {
    dispatch({ type: 'REMOVE', payload: { productId, variantId } })
  }

  function updateQuantity(productId, variantId, quantity) {
    if (quantity < 1) return removeFromCart(productId, variantId)
    dispatch({ type: 'UPDATE_QTY', payload: { productId, variantId, quantity } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR' })
  }

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
