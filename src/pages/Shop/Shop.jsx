import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import styles from './Shop.module.css'
import Footer from '../../components/Footer/Footer'
import { ALL_PRODUCTS } from '../../data/products'

const CATEGORIES = ['All', 'Bags', 'Shoes', 'Watches', 'Accessories']
const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low']

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Default')
  const [added, setAdded] = useState([])
  const { addToCart } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const navigate = useNavigate()

  const handleAdd = (e, p) => {
    e.stopPropagation()
    addToCart(p, p.sizes ? p.sizes[0] : 'One Size', p.colors ? p.colors[0] : 'Default')
    setAdded(a => [...a, p.id])
    setTimeout(() => setAdded(a => a.filter(x => x !== p.id)), 1500)
  }

  const handleWish = (e, p) => {
    e.stopPropagation()
    toggleWishlist(p)
  }

  let filtered = activeCategory === 'All'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.cat === activeCategory)

  if (sortBy === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.priceUSD - b.priceUSD)
  if (sortBy === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.priceUSD - a.priceUSD)

  return (
    <>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <span className={styles.label}>Our Collection</span>
          <h1 className={styles.pageTitle}>Shop <em>All</em></h1>
          <p className={styles.pageSub}>{filtered.length} pieces available</p>
        </div>

        <div className={styles.layout}>

          <aside className={styles.sidebar}>
            <div className={styles.sideSection}>
              <p className={styles.sideTitle}>Categories</p>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.sideLink} ${activeCategory === cat ? styles.sideLinkActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className={styles.sideCount}>
                    {cat === 'All' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.cat === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.sideSection}>
              <p className={styles.sideTitle}>Brands</p>
              {['Louis Vuitton', 'Chanel', 'Gucci', 'Hermès', 'Dior', 'Prada', 'Rolex', 'Cartier'].map(b => (
                <button key={b} className={styles.sideLink}>{b}</button>
              ))}
            </div>

            <div className={styles.sideSection}>
              <p className={styles.sideTitle}>Price Range</p>
              <button className={styles.sideLink}>Under $500</button>
              <button className={styles.sideLink}>$500 — $2,000</button>
              <button className={styles.sideLink}>$2,000 — $5,000</button>
              <button className={styles.sideLink}>Above $5,000</button>
            </div>
          </aside>

          <div className={styles.main}>
            <div className={styles.toolbar}>
              <p className={styles.showing}>Showing {filtered.length} products</p>
              <select
                className={styles.sort}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className={styles.grid}>
              {filtered.map(p => (
                <div
                  key={p.id}
                  className={styles.card}
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <div className={styles.imgWrap}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className={styles.imgReal} />
                    ) : (
                      <div className={styles.icon}>{p.icon}</div>
                    )}
                    {p.badge && (
                      <span className={`${styles.badge} ${p.badge === 'Sale' ? styles.saleBadge : styles.newBadge}`}>
                        {p.badge}
                      </span>
                    )}
                    <button
                      className={`${styles.wish} ${isWished(p.id) ? styles.wished : ''}`}
                      onClick={(e) => handleWish(e, p)}
                    >
                      {isWished(p.id) ? '♥' : '♡'}
                    </button>
                    <div
                      className={`${styles.quickAdd} ${added.includes(p.id) ? styles.quickAdded : ''}`}
                      onClick={(e) => handleAdd(e, p)}
                    >
                      {added.includes(p.id) ? '✓ Added!' : '+ Add to Cart'}
                    </div>
                  </div>
                  <p className={styles.brand}>{p.brand}</p>
                  <p className={styles.name}>{p.name}</p>
                  <div className={styles.price}>
                    {p.oldPrice && <span className={styles.oldPrice}>${p.oldPrice.toLocaleString()}</span>}
                    <span>${p.priceUSD.toLocaleString()}</span>
                    <span className={styles.lbp}>≈ {p.priceLBP} LBP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}