
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate()
  const [count, setCount] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.number}>404</div>
        <div className={styles.divider} />
        <h1 className={styles.title}>Page Not <em>Found</em></h1>
        <p className={styles.desc}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className={styles.countdown}>
          Redirecting to home in <span>{count}</span> seconds...
        </p>
        <div className={styles.btns}>
          <button className={styles.btnGold} onClick={() => navigate('/')}>
            Back to Home
          </button>
          <button className={styles.btnOutline} onClick={() => navigate('/new-in')}>
            Shop Now
          </button>
        </div>
        <div className={styles.links}>
          <span onClick={() => navigate('/bags')}>Bags</span>
          <span onClick={() => navigate('/shoes')}>Shoes</span>
          <span onClick={() => navigate('/watches')}>Watches</span>
          <span onClick={() => navigate('/about')}>Contact Us</span>
        </div>
      </div>
    </div>
  )
}