import React from 'react'
import styles from './Reviews.module.css'

const REVIEWS = [
  {
    text: 'Found my dream Louis Vuitton bag here at an incredible price. 100% authentic and the service was amazing. Will definitely be back!',
    author: 'Lara K.',
    location: 'Beirut, Lebanon',
  },
  {
    text: 'The team at SECOND helped me find the perfect Chanel wallet. Fast delivery to Aley and beautifully packaged. Highly recommend!',
    author: 'Rami S.',
    location: 'Aley, Lebanon',
  },
  {
    text: 'Finally a luxury store in Lebanon that I can trust. The authentication process is transparent and the prices are fair. Love SECOND!',
    author: 'Maya A.',
    location: 'Jounieh, Lebanon',
  },
]

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>What Our Clients Say</span>
        <h2 className={styles.title}>Loved by <em>Lebanon</em></h2>
        <p className={styles.sub}>Real reviews from real customers across Lebanon</p>
      </div>

      <div className={styles.grid}>
        {REVIEWS.map((r, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.text}>"{r.text}"</p>
            <p className={styles.author}>{r.author}</p>
            <p className={styles.loc}>{r.location}</p>
          </div>
        ))}
      </div>
    </section>
  )
}