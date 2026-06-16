import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product, size, color) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id && item.size === size && item.color === color)
      if (exists) {
        return prev.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...product, size, color, qty: 1 }]
    })
  }

  const removeFromCart = (id, size, color) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size && item.color === color)))
  }

  const updateQty = (id, size, color, qty) => {
    if (qty < 1) { removeFromCart(id, size, color); return }
    setCart(prev => prev.map(item =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, qty }
        : item
    ))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalUSD = cart.reduce((sum, item) => sum + item.priceUSD * item.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalUSD }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}