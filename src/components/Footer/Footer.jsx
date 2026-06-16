import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'

const SHOP_LINKS = [
  { label: 'New Arrivals', path: '/new-in' },
  { label: 'Bags', path: '/bags' },
  { label: 'Shoes', path: '/shoes' },
  { label: 'Watches', path: '/watches' },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Sale', path: '/sale' },
]

const INFO_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/about' },
  { label: 'Shipping & Returns', path: '/about' },
  { label: 'Authentication', path: '/about' },
  { label: 'Visit Our Store', path: '/about' },
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>

        <div className={styles.brand}>
          <span className={styles.logo} onClick={() => navigate('/')}>SECOND</span>
          <span className={styles.logoSub}>Luxury Fashion — Aley, Lebanon</span>
          <p className={styles.desc}>
            Your destination for authentic luxury fashion in Lebanon.
            Bags, shoes, watches & accessories from the world's top houses.
          </p>
          <p className={styles.address}>📍 Aley, Mount Lebanon, Lebanon 🇱🇧</p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <i className="ti ti-brand-instagram" />
            </a>
            <a href="#" className={styles.socialLink} aria-label="WhatsApp">
              <i className="ti ti-brand-whatsapp" />
            </a>
          </div>
        </div>

        <div>
          <p className={styles.colTitle}>Shop</p>
          <ul className={styles.links}>
            {SHOP_LINKS.map(l => (
              <li key={l.label}>
                <span onClick={() => navigate(l.path)} className={styles.link}>{l.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={styles.colTitle}>Info</p>
          <ul className={styles.links}>
            {INFO_LINKS.map(l => (
              <li key={l.label}>
                <span onClick={() => navigate(l.path)} className={styles.link}>{l.label}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <span>© 2026 SECOND. All rights reserved.</span>
        <span>Made with ❤️ in Lebanon</span>
      </div>
    </footer>
  )
}