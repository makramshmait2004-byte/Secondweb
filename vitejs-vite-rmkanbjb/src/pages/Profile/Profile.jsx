import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import styles from './Profile.module.css'
import Footer from '../../components/Footer/Footer'

const TABS = ['Overview', 'Orders', 'Wishlist', 'Settings']

const MOCK_ORDERS = [
  { id: '#SEC-1001', date: 'June 10, 2026', status: 'Delivered', total: 1290, items: [{ name: 'Neverfull MM', brand: 'Louis Vuitton', icon: '👜' }] },
  { id: '#SEC-1002', date: 'June 5, 2026', status: 'Processing', total: 720, items: [{ name: 'Marmont Heel Pump', brand: 'Gucci', icon: '👠' }] },
  { id: '#SEC-1003', date: 'May 28, 2026', status: 'Delivered', total: 490, items: [{ name: '30 Montaigne Sunglasses', brand: 'Dior', icon: '🕶️' }] },
]

const STATUS_COLORS = {
  Delivered: { bg: 'rgba(39,174,96,0.1)', color: '#27AE60' },
  Processing: { bg: 'rgba(201,168,76,0.1)', color: '#C9A84C' },
  Cancelled: { bg: 'rgba(155,45,78,0.1)', color: '#9B2D4E' },
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [editing, setEditing] = useState(false)

  const { cart } = useCart()
  const { wishlist, toggleWishlist } = useWishlist()
  const { currentUser, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  if (!currentUser) {
    return (
      <>
        <div className={styles.notLoggedIn}>
          <span className={styles.notLoggedInIcon}>👤</span>
          <h2 className={styles.notLoggedInTitle}>You're not logged in</h2>
          <p className={styles.notLoggedInSub}>Login to access your profile, orders and wishlist</p>
          <button className={styles.btnGold} onClick={() => navigate('/login')}>
            Login / Sign Up
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className={styles.page}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.avatar}>
            {currentUser.name?.charAt(0) || '?'}
          </div>
          <div className={styles.headerInfo}>
            <span className={styles.label}>
              {isAdmin ? '👑 Admin Account' : 'My Account'}
            </span>
            <h1 className={styles.pageTitle}>
              {currentUser.name} {isAdmin && <em>· Admin</em>}
            </h1>
            <p className={styles.pageSub}>{currentUser.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.body}>

          {/* ── OVERVIEW ── */}
          {activeTab === 'Overview' && (
            <div className={styles.overview}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statNum}>{MOCK_ORDERS.length}</span>
                  <span className={styles.statLabel}>Total Orders</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNum}>{wishlist.length}</span>
                  <span className={styles.statLabel}>Wishlist Items</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNum}>{cart.length}</span>
                  <span className={styles.statLabel}>Cart Items</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNum}>
                    ${MOCK_ORDERS.reduce((s, o) => s + o.total, 0).toLocaleString()}
                  </span>
                  <span className={styles.statLabel}>Total Spent</span>
                </div>
              </div>

              <div className={styles.recentSection}>
                <p className={styles.sectionTitle}>Recent Orders</p>
                {MOCK_ORDERS.slice(0, 2).map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderLeft}>
                      <span className={styles.orderIcon}>{order.items[0].icon}</span>
                      <div>
                        <p className={styles.orderName}>{order.items[0].name}</p>
                        <p className={styles.orderBrand}>{order.items[0].brand}</p>
                        <p className={styles.orderDate}>{order.date}</p>
                      </div>
                    </div>
                    <div className={styles.orderRight}>
                      <p className={styles.orderTotal}>${order.total.toLocaleString()}</p>
                      <span
                        className={styles.orderStatus}
                        style={STATUS_COLORS[order.status]}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                <button className={styles.viewAllBtn} onClick={() => setActiveTab('Orders')}>
                  View All Orders →
                </button>
              </div>

              <div className={styles.quickLinks}>
                <p className={styles.sectionTitle}>Quick Actions</p>
                <div className={styles.quickGrid}>
                  <button className={styles.quickCard} onClick={() => navigate('/new-in')}>
                    <span className={styles.quickIcon}>🛍</span>
                    <span>Shop Now</span>
                  </button>
                  <button className={styles.quickCard} onClick={() => navigate('/wishlist')}>
                    <span className={styles.quickIcon}>♡</span>
                    <span>My Wishlist</span>
                  </button>
                  <button className={styles.quickCard} onClick={() => navigate('/cart')}>
                    <span className={styles.quickIcon}>🛒</span>
                    <span>My Cart</span>
                  </button>
                  {isAdmin && (
                    <button className={styles.quickCard} onClick={() => navigate('/admin')}>
                      <span className={styles.quickIcon}>⚙️</span>
                      <span>Admin Panel</span>
                    </button>
                  )}
                  <button className={styles.quickCard} onClick={() => setActiveTab('Settings')}>
                    <span className={styles.quickIcon}>👤</span>
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === 'Orders' && (
            <div className={styles.ordersSection}>
              <p className={styles.sectionTitle}>Order History</p>
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderLeft}>
                    <span className={styles.orderIcon}>{order.items[0].icon}</span>
                    <div>
                      <p className={styles.orderId}>{order.id}</p>
                      <p className={styles.orderName}>{order.items[0].name}</p>
                      <p className={styles.orderBrand}>{order.items[0].brand}</p>
                      <p className={styles.orderDate}>{order.date}</p>
                    </div>
                  </div>
                  <div className={styles.orderRight}>
                    <p className={styles.orderTotal}>${order.total.toLocaleString()}</p>
                    <span
                      className={styles.orderStatus}
                      style={STATUS_COLORS[order.status]}
                    >
                      {order.status}
                    </span>
                    <button className={styles.reorderBtn}>Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── WISHLIST ── */}
          {activeTab === 'Wishlist' && (
            <div>
              <p className={styles.sectionTitle}>My Wishlist ({wishlist.length} items)</p>
              {wishlist.length === 0 ? (
                <div className={styles.emptyState}>
                  <span>♡</span>
                  <p>Your wishlist is empty</p>
                  <button className={styles.btnGold} onClick={() => navigate('/new-in')}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className={styles.wishGrid}>
                  {wishlist.map(p => (
                    <div key={p.id} className={styles.wishCard}>
                      <div className={styles.wishImg} onClick={() => navigate(`/product/${p.id}`)}>
                        <span className={styles.wishIcon}>{p.icon}</span>
                        <button
                          className={styles.removeWish}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }}
                        >
                          ♥
                        </button>
                      </div>
                      <p className={styles.wishBrand}>{p.brand}</p>
                      <p className={styles.wishName}>{p.name}</p>
                      <p className={styles.wishPrice}>${p.priceUSD.toLocaleString()}</p>
                      <button
                        className={styles.btnGold}
                        onClick={() => navigate(`/product/${p.id}`)}
                      >
                        View Product
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === 'Settings' && (
            <div className={styles.settingsSection}>
              <div className={styles.settingsHeader}>
                <p className={styles.sectionTitle}>Personal Information</p>
                <button
                  className={styles.editBtn}
                  onClick={() => setEditing(e => !e)}
                >
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className={styles.settingsForm}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>First Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      disabled={!editing}
                      className={`${styles.formInput} ${!editing ? styles.formInputDisabled : ''}`}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      disabled={!editing}
                      className={`${styles.formInput} ${!editing ? styles.formInputDisabled : ''}`}
                    />
                  </div>
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`${styles.formInput} ${!editing ? styles.formInputDisabled : ''}`}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Phone / WhatsApp</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`${styles.formInput} ${!editing ? styles.formInputDisabled : ''}`}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`${styles.formInput} ${!editing ? styles.formInputDisabled : ''}`}
                  />
                </div>

                {editing && (
                  <button className={styles.btnGold} onClick={() => setEditing(false)}>
                    Save Changes
                  </button>
                )}
              </div>

              <div className={styles.dangerZone}>
                <p className={styles.sectionTitle}>Account</p>
                <button
                  className={styles.logoutBtn}
                  onClick={() => { logout(); navigate('/') }}
                >
                  <i className="ti ti-logout" /> Sign Out
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}