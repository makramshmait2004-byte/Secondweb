import React from 'react'
import styles from './Ticker.module.css'

const BRANDS = [
  'Louis Vuitton', 'Chanel', 'Hermès', 'Gucci', 'Dior', 'Prada',
  'Balenciaga', 'Versace', 'Burberry', 'Valentino', 'Saint Laurent',
  'Bottega Veneta', 'Fendi', 'Loewe', 'Givenchy',
]

export default function Ticker() {
  const text = BRANDS.join('  ✦  ')
  return (
    <div className={styles.ticker}>
      <span className={styles.inner}>{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}</span>
    </div>
  )
}