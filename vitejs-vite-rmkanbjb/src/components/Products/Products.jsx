import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import styles from './Products.module.css'

const PRODUCTS = [
  { id: 1, brand: 'Louis Vuitton', name: 'Neverfull MM Monogram', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', priceUSD: 1290, priceLBP: '115,455,000', badge: 'New', icon: '👜', sizes: ['Small', 'MM', 'GM'], colors: ['Monogram'] },
  { id: 2, brand: 'Gucci', name: 'Marmont Heel Pump', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', priceUSD: 720, oldPrice: 890, priceLBP: '64,440,000', badge: 'Sale', icon: '👠', sizes: ['37', '38', '39'], colors: ['Black'] },
  { id: 3, brand: 'Rolex', name: 'Datejust 36 Steel', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80', priceUSD: 8500, priceLBP: '760,750,000', badge: 'Best Seller', icon: '⌚', sizes: ['36mm'], colors: ['Silver'] },
  { id: 4, brand: 'Dior', name: '30 Montaigne Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', priceUSD: 490, priceLBP: '43,855,000', icon: '🕶️', sizes: ['One Size'], colors: ['Black'] },
  { id: 5, brand: 'Chanel', name: 'Classic Flap Bag', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', priceUSD: 9200, priceLBP: '823,400,000', badge: 'New', icon: '👜', sizes: ['Medium'], colors: ['Black'] },
  { id: 6, brand: 'Prada', name: 'Re-Edition 2005 Bag', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80', priceUSD: 1450, priceLBP: '129,775,000', badge: 'New', icon: '👜', sizes: ['One Size'], colors: ['Black'] },
  { id: 7, brand: 'Balenciaga', name: 'Triple S Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', priceUSD: 990, oldPrice: 1200, priceLBP: '88,605,000', badge: 'Sale', icon: '👟', sizes: ['40', '41', '42'], colors: ['White'] },
  { id: 8, brand: 'Hermès', name: 'Silk Twilly Scarf', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', priceUSD: 220, priceLBP: '19,690,000', icon: '🧣', sizes: ['One Size'], colors: ['Red/Orange'] },
]

const CATEGORIES = ['All', 'Bags', 'Shoes', 'Watches', 'Accessories']

export default function Products() {
  const [active, setActive] = useState('All')
  const [added, setAdded] = useState([])
  const { addToCart } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const navigate = useNavigate()

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
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Just Arrived</span>
          <h2 className={styles.title}>New <em>Arrivals</em></h2>
        </div>
        <a href="/new-in" className={styles.viewAll}>View All →</a>
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
          <div key={p.id} className={styles.card} onClick={() => navigate(`/product/${p.id}`)}>
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
    </section>
  )
}