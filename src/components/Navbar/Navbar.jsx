import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'New In',      path: '/new-in' },
  { label: 'Bags',        path: '/bags' },
  { label: 'Shoes',       path: '/shoes' },
  { label: 'Watches',     path: '/watches' },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Sale',        path: '/sale', highlight: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        SECOND
        <span className={styles.logoSub}>Luxury Fashion</span>
      </Link>

      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, path, highlight }) => (
          <li key={label}>
            <Link
              to={path}
              className={`${styles.link} ${highlight ? styles.highlight : ''} ${location.pathname === path ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.icons}>
        <button aria-label="Search"><i className="ti ti-search" /></button>
        <button aria-label="Wishlist"><i className="ti ti-heart" /></button>
        <button aria-label="Cart" className={styles.cartBtn}>
          <i className="ti ti-shopping-bag" />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>
        <button aria-label="Account"><i className="ti ti-user" /></button>
        <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)}>
          <i className={`ti ${menuOpen ? 'ti-x' : 'ti-menu-2'}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.drawer}>
          {NAV_LINKS.map(({ label, path, highlight }) => (
            <Link key={label} to={path}
              className={`${styles.drawerLink} ${highlight ? styles.drawerHighlight : ''}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}