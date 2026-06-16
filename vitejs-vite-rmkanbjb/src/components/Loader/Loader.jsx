import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.logo}>SECOND</div>
        <div className={styles.dots}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}