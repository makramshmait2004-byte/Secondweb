import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.tag}>Summer Collection 2026</div>
        <h1 className={styles.h1}>
          Iconic<br />
          <em>Luxury,</em><br />
          Your Way
        </h1>
        <p className={styles.desc}>
          Curated bags, shoes, watches & accessories from the world's most
          coveted luxury houses — available now in Aley, Lebanon.
        </p>
        <div className={styles.btns}>
          <button className={styles.btnGold}>Shop Collection</button>
          <button className={styles.btnOutline}>Explore Brands</button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.circle}>
          <span className={styles.icon}>👜</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNum}>500+</div>
          <div className={styles.statLabel}>Luxury Pieces</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>30+</div>
          <div className={styles.statLabel}>Top Brands</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>100%</div>
          <div className={styles.statLabel}>Authentic</div>
        </div>
      </div>
    </section>
  )
}