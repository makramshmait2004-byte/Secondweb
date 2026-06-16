import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
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
  const { totalItems } = useCart()
  const { wishlist } = useWishlist()
  const { currentUser, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

      {/* Logo */}
      <Link to="/" className={styles.logo}>
        SECOND
        <span className={styles.logoSub}>Luxury Fashion</span>
      </Link>

      {/* Desktop Links */}
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
        <li>
          <Link
            to="/about"
            className={`${styles.link} ${location.pathname === '/about' ? styles.active : ''}`}
          >
            About
          </Link>
        </li>
      </ul>

      {/* Icons */}
      <div className={styles.icons}>

        {/* Search */}
        <button
          aria-label="Search"
          onClick={() => navigate('/search')}
          className={location.pathname === '/search' ? styles.iconActive : ''}
        >
          <i className="ti ti-search" />
        </button>

        {/* Wishlist */}
        <button
          aria-label="Wishlist"
          className={`${styles.cartBtn} ${location.pathname === '/wishlist' ? styles.iconActive : ''}`}
          onClick={() => navigate('/wishlist')}
        >
          <i className="ti ti-heart" />
          {wishlist.length > 0 && (
            <span className={styles.badge}>{wishlist.length}</span>
          )}
        </button>

        {/* Cart */}
        <button
          aria-label="Cart"
          className={`${styles.cartBtn} ${location.pathname === '/cart' ? styles.iconActive : ''}`}
          onClick={() => navigate('/cart')}
        >
          <i className="ti ti-shopping-bag" />
          {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
          )}
        </button>

        {/* Admin Dashboard icon — only for admins */}
        {currentUser && isAdmin && (
          <button
            className={styles.adminBtn}
            onClick={() => navigate('/admin')}
            aria-label="Admin Panel"
          >
            <i className="ti ti-layout-dashboard" />
          </button>
        )}

        {/* Account / Login */}
        {currentUser ? (
          <button
            aria-label="Account"
            onClick={() => navigate('/profile')}
            className={location.pathname === '/profile' ? styles.iconActive : ''}
          >
            <i className="ti ti-user" />
          </button>
        ) : (
          <button
            aria-label="Login"
            onClick={() => navigate('/login')}
          >
            <i className="ti ti-user" />
          </button>
        )}

        {/* Mobile Menu */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <i className={`ti ${menuOpen ? 'ti-x' : 'ti-menu-2'}`} />
        </button>

      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className={styles.drawer}>
          {NAV_LINKS.map(({ label, path, highlight }) => (
            <Link
              key={label}
              to={path}
              className={`${styles.drawerLink} ${highlight ? styles.drawerHighlight : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/about" className={styles.drawerLink}>About</Link>

          <div className={styles.drawerDivider} />

          <Link to="/search" className={styles.drawerLink}>🔍 Search</Link>
          <Link to="/wishlist" className={styles.drawerLink}>
            ♡ Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
          </Link>
          <Link to="/cart" className={styles.drawerLink}>
            🛍 Cart {totalItems > 0 && `(${totalItems})`}
          </Link>

          <div className={styles.drawerDivider} />

          {currentUser ? (
            <>
              <Link to="/profile" className={styles.drawerLink}>👤 My Account</Link>
              {isAdmin && (
                <Link to="/admin" className={styles.drawerLink}>⚙️ Admin Panel</Link>
              )}
              <button
                className={styles.drawerLink}
                style={{ textAlign: 'left', width: '100%', color: '#9B2D4E' }}
                onClick={() => { logout(); navigate('/') }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.drawerLink}>👤 Login / Sign Up</Link>
          )}

          <Link to="/about" className={styles.drawerLink}>📍 About & Contact</Link>
        </div>
      )}

    </nav>
  )
}