import React, { useState } from 'react'
import styles from './TopBar.module.css'

const MESSAGES = [
  'Free Shipping in Lebanon on orders over $150',
  'Authentic Luxury — 100% Guaranteed',
  'New Arrivals Every Week',
]

export default function TopBar() {
  const [i, setI] = useState(0)
  const prev = () => setI(x => (x - 1 + MESSAGES.length) % MESSAGES.length)
  const next = () => setI(x => (x + 1) % MESSAGES.length)

  return (
    <div className={styles.topbar}>
      <div className={styles.center}>
        <button onClick={prev} className={styles.arrow}>‹</button>
        <span className={styles.msg}>{MESSAGES[i]}</span>
        <button onClick={next} className={styles.arrow}>›</button>
      </div>
      <div className={styles.right}>
        <a href="#" className={styles.link}>Track Order</a>
        <span className={styles.dot}>·</span>
        <a href="#" className={styles.link}>Help</a>
      </div>
    </div>
  )
}