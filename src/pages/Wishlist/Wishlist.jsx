import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import styles from './Wishlist.module.css'
import Footer from '../../components/Footer/Footer'

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (p) => {
    addToCart(p, p.sizes[0], p.colors[0])
  }

  if (wishlist.length === 0) {
    return (
      <>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>♡</span>
          <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
          <p className={styles.emptySub}>Save items you love and come back to them anytime</p>
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
          <span className={styles.label}>Saved Items</span>
          <h1 className={styles.pageTitle}>My <em>Wishlist</em></h1>
          <p className={styles.pageSub}>{wishlist.length} items saved</p>
        </div>

        <div className={styles.grid}>
          {wishlist.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.imgWrap} onClick={() => navigate(`/product/${p.id}`)}>
                <div className={styles.icon}>{p.icon}</div>
                <button
                  className={styles.removeWish}
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }}
                >
                  ♥
                </button>
              </div>
              <p className={styles.brand}>{p.brand}</p>
              <p className={styles.name}>{p.name}</p>
              <p className={styles.price}>${p.priceUSD.toLocaleString()}</p>
              <p className={styles.lbp}>≈ {p.priceLBP} LBP</p>
              <div className={styles.cardBtns}>
                <button
                  className={styles.btnAdd}
                  onClick={() => handleAddToCart(p)}
                >
                  Add to Cart
                </button>
                <button
                  className={styles.btnView}
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}