import React, { useState } from 'react'
import styles from './Products.module.css'

const CATEGORIES = ['All', 'Bags', 'Shoes', 'Watches', 'Accessories']

const PRODUCTS = [
  { id: 1, brand: 'Louis Vuitton', name: 'Neverfull MM Monogram', priceUSD: 1290, priceLBP: '115,455,000', badge: 'New', icon: '👜' },
  { id: 2, brand: 'Gucci', name: 'Marmont Heel Pump', priceUSD: 720, oldPrice: 890, priceLBP: '64,440,000', badge: 'Sale', icon: '👠' },
  { id: 3, brand: 'Rolex', name: 'Datejust 36 Steel', priceUSD: 8500, priceLBP: '760,750,000', badge: 'Best Seller', icon: '⌚' },
  { id: 4, brand: 'Dior', name: '30 Montaigne Sunglasses', priceUSD: 490, priceLBP: '43,855,000', icon: '🕶️' },
  { id: 5, brand: 'Chanel', name: 'Classic Flap Bag', priceUSD: 9200, priceLBP: '823,400,000', badge: 'New', icon: '👜' },
  { id: 6, brand: 'Prada', name: 'Re-Edition 2005 Bag', priceUSD: 1450, priceLBP: '129,775,000', badge: 'New', icon: '👜' },
  { id: 7, brand: 'Balenciaga', name: 'Triple S Sneakers', priceUSD: 990, oldPrice: 1200, priceLBP: '88,605,000', badge: 'Sale', icon: '👟' },
  { id: 8, brand: 'Hermès', name: 'Silk Twilly Scarf', priceUSD: 220, priceLBP: '19,690,000', icon: '🧣' },
]

export default function Products() {
  const [active, setActive] = useState('All')
  const [wished, setWished] = useState([])

  const toggleWish = (id) => {
    setWished(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Just Arrived</span>
          <h2 className={styles.title}>New <em>Arrivals</em></h2>
        </div>
        <a href="#" className={styles.viewAll}>View All →</a>
      </div>

      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {PRODUCTS.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <div className={styles.icon}>{p.icon}</div>
              {p.badge && (
                <span className={`${styles.badge} ${p.badge === 'Sale' ? styles.saleBadge : styles.newBadge}`}>
                  {p.badge}
                </span>
              )}
              <button
                className={`${styles.wish} ${wished.includes(p.id) ? styles.wished : ''}`}
                onClick={() => toggleWish(p.id)}
              >
                {wished.includes(p.id) ? '♥' : '♡'}
              </button>
              <div className={styles.quickAdd}>+ Quick Add</div>
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
    </section>
  )
}