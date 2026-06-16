import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './PageTransition.module.css'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : styles.hidden}`}>
      {children}
    </div>
  )
}