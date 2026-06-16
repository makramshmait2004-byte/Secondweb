import React from 'react'
import styles from './FeaturedBrands.module.css'

const BRANDS = [
  { name: 'Louis Vuitton', since: '1854' },
  { name: 'Chanel', since: '1910' },
  { name: 'Hermès', since: '1837' },
  { name: 'Gucci', since: '1921' },
  { name: 'Dior', since: '1946' },
  { name: 'Prada', since: '1913' },
  { name: 'Balenciaga', since: '1917' },
  { name: 'Valentino', since: '1960' },
  { name: 'Saint Laurent', since: '1961' },
  { name: 'Bottega Veneta', since: '1966' },
]

export default function FeaturedBrands() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>Featured Brands</span>
        <h2 className={styles.title}>The <em>Icons</em></h2>
      </div>
      <div className={styles.grid}>
        {BRANDS.map(b => (
          <div key={b.name} className={styles.tile}>
            <span className={styles.name}>{b.name}</span>
            <span className={styles.since}>Since {b.since}</span>
          </div>
        ))}
      </div>
    </section>
  )
}