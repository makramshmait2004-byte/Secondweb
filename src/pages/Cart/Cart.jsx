import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.css'
import Footer from '../../components/Footer/Footer'

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalUSD, clearCart } = useCart()
  const navigate = useNavigate()
  const LBP_RATE = 89500

  if (cart.length === 0) {
    return (
      <>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛍</span>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptySub}>Looks like you haven't added anything yet</p>
          <button className={styles.btnShop} onClick={() => navigate('/new-in')}>
            Start Shopping
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <span className={styles.label}>Your Selection</span>
          <h1 className={styles.pageTitle}>Shopping <em>Cart</em></h1>
          <p className={styles.pageSub}>{cart.reduce((s, i) => s + i.qty, 0)} items</p>
        </div>

        <div className={styles.layout}>

          <div className={styles.items}>
            {cart.map((item, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemImg}>
                  <span className={styles.itemIcon}>{item.icon}</span>
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemBrand}>{item.brand}</p>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>{item.color} · {item.size}</p>
                  <div className={styles.itemBottom}>
                    <div className={styles.qtyWrap}>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}>−</button>
                      <span className={styles.qty}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}>+</button>
                    </div>
                    <button className={styles.remove} onClick={() => removeFromCart(item.id, item.size, item.color)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.itemPrice}>
                  <span className={styles.priceUSD}>${(item.priceUSD * item.qty).toLocaleString()}</span>
                  <span className={styles.priceLBP}>≈ {(item.priceUSD * item.qty * LBP_RATE).toLocaleString()} LBP</span>
                </div>
              </div>
            ))}
            <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
          </div>

          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Order Summary</p>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${totalUSD.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span className={styles.free}>Free</span>
            </div>
            <div className={styles.summaryRow}>
              <span>LBP Equivalent</span>
              <span>{(totalUSD * LBP_RATE).toLocaleString()} LBP</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${totalUSD.toLocaleString()}</span>
            </div>
            <button className={styles.btnCheckout} onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <button className={styles.btnWhatsapp}>
              <i className="ti ti-brand-whatsapp" /> Order via WhatsApp
            </button>
            <button className={styles.btnContinue} onClick={() => navigate('/new-in')}>
              ← Continue Shopping
            </button>
            <div className={styles.trust}>
              <p><i className="ti ti-shield-check" /> 100% Secure Checkout</p>
              <p><i className="ti ti-truck-delivery" /> Free Shipping in Lebanon</p>
              <p><i className="ti ti-refresh" /> Easy 14-Day Returns</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}