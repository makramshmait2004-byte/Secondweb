import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { ALL_PRODUCTS } from '../../data/products'
import styles from './Search.module.css'
import Footer from '../../components/Footer/Footer'

export default function Search() {
  const [query, setQuery] = useState('')
  const [added, setAdded] = useState([])
  const { addToCart } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const navigate = useNavigate()

  const results = query.length > 1
    ? ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.cat.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleAdd = (e, p) => {
    e.stopPropagation()
    addToCart(p, p.sizes[0], p.colors[0])
    setAdded(a => [...a, p.id])
    setTimeout(() => setAdded(a => a.filter(x => x !== p.id)), 1500)
  }

  const handleWish = (e, p) => {
    e.stopPropagation()
    toggleWishlist(p)
  }

  return (
    <>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <span className={styles.label}>Find Your Piece</span>
          <h1 className={styles.pageTitle}>Search <em>SECOND</em></h1>
          <div className={styles.searchWrap}>
            <i className="ti ti-search" />
            <input
              className={styles.input}
              type="text"
              placeholder="Search brands, bags, shoes..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button className={styles.clear} onClick={() => setQuery('')}>✕</button>
            )}
          </div>
        </div>

        <div className={styles.body}>

          {/* No query yet */}
          {query.length < 2 && (
            <div className={styles.suggestions}>
              <p className={styles.suggestTitle}>Popular Searches</p>
              <div className={styles.tags}>
                {['Louis Vuitton', 'Chanel Bag', 'Gucci Shoes', 'Rolex Watch', 'Dior Sunglasses', 'Prada Bag', 'Sale'].map(t => (
                  <button key={t} className={styles.tag} onClick={() => setQuery(t)}>{t}</button>
                ))}
              </div>

              <p className={styles.suggestTitle} style={{ marginTop: 40 }}>Shop by Category</p>
              <div className={styles.cats}>
                {[
                  { label: 'Bags', icon: '👜', path: '/bags' },
                  { label: 'Shoes', icon: '👠', path: '/shoes' },
                  { label: 'Watches', icon: '⌚', path: '/watches' },
                  { label: 'Accessories', icon: '🕶️', path: '/accessories' },
                ].map(c => (
                  <div key={c.label} className={styles.catCard} onClick={() => navigate(c.path)}>
                    <span className={styles.catIcon}>{c.icon}</span>
                    <span className={styles.catLabel}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query.length >= 2 && (
            <div className={styles.results}>
              <p className={styles.resultCount}>
                {results.length > 0
                  ? `${results.length} result${results.length > 1 ? 's' : ''} for "${query}"`
                  : `No results for "${query}"`
                }
              </p>

              {results.length === 0 && (
                <div className={styles.noResults}>
                  <span className={styles.noResultsIcon}>🔍</span>
                  <p className={styles.noResultsText}>Try searching for a brand or category</p>
                  <div className={styles.tags} style={{ justifyContent: 'center', marginTop: 16 }}>
                    {['Louis Vuitton', 'Bags', 'Shoes', 'Watches'].map(t => (
                      <button key={t} className={styles.tag} onClick={() => setQuery(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.grid}>
                {results.map(p => (
                  <div
                    key={p.id}
                    className={styles.card}
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    <div className={styles.imgWrap}>
                      <div className={styles.icon}>{p.icon}</div>
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
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}