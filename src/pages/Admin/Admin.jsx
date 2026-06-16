import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import styles from './Admin.module.css';

const TABS = ['Dashboard', 'Products', 'Orders', 'Members'];

const MOCK_ORDERS = [
  {
    id: '#SEC-1001',
    customer: 'Lara K.',
    phone: '+961 70 111 111',
    date: 'June 10, 2026',
    status: 'Delivered',
    total: 1290,
    items: 'Neverfull MM',
  },
  {
    id: '#SEC-1002',
    customer: 'Rami S.',
    phone: '+961 71 222 222',
    date: 'June 8, 2026',
    status: 'Processing',
    total: 720,
    items: 'Marmont Pump',
  },
  {
    id: '#SEC-1003',
    customer: 'Maya A.',
    phone: '+961 76 333 333',
    date: 'June 5, 2026',
    status: 'Delivered',
    total: 490,
    items: 'Dior Sunglasses',
  },
  {
    id: '#SEC-1004',
    customer: 'Karim B.',
    phone: '+961 78 444 444',
    date: 'June 3, 2026',
    status: 'Cancelled',
    total: 9200,
    items: 'Chanel Flap Bag',
  },
  {
    id: '#SEC-1005',
    customer: 'Nour M.',
    phone: '+961 79 555 555',
    date: 'June 1, 2026',
    status: 'Processing',
    total: 8500,
    items: 'Rolex Datejust',
  },
];

const STATUS_STYLE = {
  Delivered: { background: 'rgba(39,174,96,0.1)', color: '#27AE60' },
  Processing: { background: 'rgba(201,168,76,0.1)', color: '#C9A84C' },
  Cancelled: { background: 'rgba(155,45,78,0.1)', color: '#9B2D4E' },
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    icon: '',
    name: '',
    brand: '',
    cat: 'Bags',
    priceUSD: '',
    badge: '',
    desc: '',
    sizes: ['One Size'],
    colors: ['Default'],
    priceLBP: '0',
  });
  const [orderStatus, setOrderStatus] = useState(
    Object.fromEntries(MOCK_ORDERS.map((o) => [o.id, o.status]))
  );
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { users, logout, promoteToAdmin, demoteToMember, currentUser } =
    useAuth();

  const totalRevenue = MOCK_ORDERS.filter(
    (o) => orderStatus[o.id] !== 'Cancelled'
  ).reduce((s, o) => s + o.total, 0);

  const handleEditProduct = (p) => {
    setEditingProduct(p.id);
    setEditForm({ ...p });
  };

  const handleSaveProduct = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editForm.id
          ? { ...editForm, priceUSD: Number(editForm.priceUSD) }
          : p
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.priceUSD) {
      alert('Please fill in Name, Brand and Price');
      return;
    }
    const product = {
      ...newProduct,
      id: Date.now(),
      priceUSD: Number(newProduct.priceUSD),
      priceLBP: (Number(newProduct.priceUSD) * 89500).toLocaleString(),
    };
    setProducts((prev) => [...prev, product]);
    setNewProduct({
      icon: '',
      name: '',
      brand: '',
      cat: 'Bags',
      priceUSD: '',
      badge: '',
      desc: '',
      sizes: ['One Size'],
      colors: ['Default'],
      priceLBP: '0',
    });
    setShowAddForm(false);
  };

  const filteredMembers = users.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>SECOND</span>
          <span className={styles.logoSub}>Admin Panel</span>
        </div>

        <nav className={styles.sideNav}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.sideLink} ${
                activeTab === tab ? styles.sideLinkActive : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <i
                className={`ti ti-${
                  tab === 'Dashboard'
                    ? 'layout-dashboard'
                    : tab === 'Products'
                    ? 'package'
                    : tab === 'Orders'
                    ? 'shopping-cart'
                    : 'users'
                }`}
              />
              {tab}
            </button>
          ))}
        </nav>

        <div className={styles.sideBottom}>
          <button className={styles.sideLink} onClick={() => navigate('/')}>
            <i className="ti ti-home" /> View Store
          </button>
          <button
            className={styles.sideLink}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <i className="ti ti-logout" /> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>{activeTab}</h1>
            <p className={styles.headerSub}>
              SECOND Admin Panel · Aley, Lebanon
            </p>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.adminName}>{currentUser?.name}</span>
            <span className={styles.adminBadge}>👑 Admin</span>
          </div>
        </div>

        {/* ── DASHBOARD ── */}
        {activeTab === 'Dashboard' && (
          <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    color: '#C9A84C',
                  }}
                >
                  <i className="ti ti-currency-dollar" />
                </div>
                <div>
                  <p className={styles.statNum}>
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <p className={styles.statLabel}>Total Revenue</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{
                    background: 'rgba(39,174,96,0.1)',
                    color: '#27AE60',
                  }}
                >
                  <i className="ti ti-shopping-cart" />
                </div>
                <div>
                  <p className={styles.statNum}>{MOCK_ORDERS.length}</p>
                  <p className={styles.statLabel}>Total Orders</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{
                    background: 'rgba(123,29,58,0.1)',
                    color: '#7B1D3A',
                  }}
                >
                  <i className="ti ti-package" />
                </div>
                <div>
                  <p className={styles.statNum}>{products.length}</p>
                  <p className={styles.statLabel}>Products</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: 'rgba(74,18,40,0.1)', color: '#4A1228' }}
                >
                  <i className="ti ti-users" />
                </div>
                <div>
                  <p className={styles.statNum}>{users.length}</p>
                  <p className={styles.statLabel}>Members</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>Recent Orders</p>
                <button
                  className={styles.seeAll}
                  onClick={() => setActiveTab('Orders')}
                >
                  See All →
                </button>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.slice(0, 4).map((o) => (
                    <tr key={o.id}>
                      <td className={styles.orderId}>{o.id}</td>
                      <td>{o.customer}</td>
                      <td>{o.items}</td>
                      <td className={styles.price}>
                        ${o.total.toLocaleString()}
                      </td>
                      <td>
                        <span
                          className={styles.status}
                          style={STATUS_STYLE[orderStatus[o.id]]}
                        >
                          {orderStatus[o.id]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Products */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>Top Products</p>
                <button
                  className={styles.seeAll}
                  onClick={() => setActiveTab('Products')}
                >
                  See All →
                </button>
              </div>
              <div className={styles.topProducts}>
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className={styles.topProduct}>
                    <span className={styles.topProductIcon}>{p.icon}</span>
                    <div className={styles.topProductInfo}>
                      <p className={styles.topProductName}>{p.name}</p>
                      <p className={styles.topProductBrand}>
                        {p.brand} · {p.cat}
                      </p>
                    </div>
                    <p className={styles.topProductPrice}>
                      ${p.priceUSD.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {activeTab === 'Products' && (
          <div>
            {/* Add Product Form */}
            <div className={styles.section} style={{ marginBottom: 24 }}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>Add New Product</p>
                <button
                  className={styles.seeAll}
                  onClick={() => setShowAddForm((f) => !f)}
                >
                  {showAddForm ? '− Close' : '+ Add Product'}
                </button>
              </div>

              {showAddForm && (
                <div className={styles.addForm}>
                  <div className={styles.addFormGrid}>
                    <div className={styles.addField}>
                      <label className={styles.addLabel}>Icon (emoji) *</label>
                      <input
                        className={styles.editInput}
                        value={newProduct.icon}
                        onChange={(e) =>
                          setNewProduct((f) => ({ ...f, icon: e.target.value }))
                        }
                        placeholder="👜"
                      />
                    </div>
                    <div className={styles.addField}>
                      <label className={styles.addLabel}>Product Name *</label>
                      <input
                        className={styles.editInput}
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Neverfull MM"
                      />
                    </div>
                    <div className={styles.addField}>
                      <label className={styles.addLabel}>Brand *</label>
                      <input
                        className={styles.editInput}
                        value={newProduct.brand}
                        onChange={(e) =>
                          setNewProduct((f) => ({
                            ...f,
                            brand: e.target.value,
                          }))
                        }
                        placeholder="Louis Vuitton"
                      />
                    </div>
                    <div className={styles.addField}>
                      <label className={styles.addLabel}>Category</label>
                      <select
                        className={styles.editInput}
                        value={newProduct.cat}
                        onChange={(e) =>
                          setNewProduct((f) => ({ ...f, cat: e.target.value }))
                        }
                      >
                        <option>Bags</option>
                        <option>Shoes</option>
                        <option>Watches</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div className={styles.addField}>
                      <label className={styles.addLabel}>Price (USD) *</label>
                      <input
                        className={styles.editInput}
                        type="number"
                        value={newProduct.priceUSD}
                        onChange={(e) =>
                          setNewProduct((f) => ({
                            ...f,
                            priceUSD: e.target.value,
                          }))
                        }
                        placeholder="1290"
                      />
                    </div>
                    <div className={styles.addField}>
                      <label className={styles.addLabel}>
                        Badge (optional)
                      </label>
                      <select
                        className={styles.editInput}
                        value={newProduct.badge}
                        onChange={(e) =>
                          setNewProduct((f) => ({
                            ...f,
                            badge: e.target.value,
                          }))
                        }
                      >
                        <option value="">None</option>
                        <option>New</option>
                        <option>Sale</option>
                        <option>Best Seller</option>
                      </select>
                    </div>
                    <div
                      className={styles.addField}
                      style={{ gridColumn: '1 / -1' }}
                    >
                      <label className={styles.addLabel}>Description</label>
                      <textarea
                        className={styles.editInput}
                        value={newProduct.desc}
                        onChange={(e) =>
                          setNewProduct((f) => ({ ...f, desc: e.target.value }))
                        }
                        placeholder="Product description..."
                        rows={3}
                        style={{
                          resize: 'vertical',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      />
                    </div>
                  </div>
                  <button className={styles.btnSave} onClick={handleAddProduct}>
                    + Add Product
                  </button>
                </div>
              )}
            </div>

            {/* Products Table */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  All Products ({products.length})
                </p>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price (USD)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      {editingProduct === p.id ? (
                        <>
                          <td>{p.icon}</td>
                          <td>
                            <input
                              className={styles.editInput}
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className={styles.editInput}
                              value={editForm.brand}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  brand: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <select
                              className={styles.editInput}
                              value={editForm.cat}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  cat: e.target.value,
                                }))
                              }
                            >
                              <option>Bags</option>
                              <option>Shoes</option>
                              <option>Watches</option>
                              <option>Accessories</option>
                            </select>
                          </td>
                          <td>
                            <input
                              className={styles.editInput}
                              type="number"
                              value={editForm.priceUSD}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  priceUSD: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button
                                className={styles.btnSave}
                                onClick={handleSaveProduct}
                              >
                                Save
                              </button>
                              <button
                                className={styles.btnCancel}
                                onClick={() => setEditingProduct(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className={styles.productIcon}>{p.icon}</td>
                          <td className={styles.productName}>{p.name}</td>
                          <td>{p.brand}</td>
                          <td>
                            <span className={styles.catBadge}>{p.cat}</span>
                          </td>
                          <td className={styles.price}>
                            ${p.priceUSD.toLocaleString()}
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button
                                className={styles.btnEdit}
                                onClick={() => handleEditProduct(p)}
                              >
                                <i className="ti ti-edit" /> Edit
                              </button>
                              <button
                                className={styles.btnDelete}
                                onClick={() => handleDeleteProduct(p.id)}
                              >
                                <i className="ti ti-trash" /> Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab === 'Orders' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTitle}>
                All Orders ({MOCK_ORDERS.length})
              </p>
              <div className={styles.orderStats}>
                <span style={{ color: '#27AE60' }}>
                  ✓{' '}
                  {
                    Object.values(orderStatus).filter((s) => s === 'Delivered')
                      .length
                  }{' '}
                  Delivered
                </span>
                <span style={{ color: '#C9A84C' }}>
                  ⏳{' '}
                  {
                    Object.values(orderStatus).filter((s) => s === 'Processing')
                      .length
                  }{' '}
                  Processing
                </span>
                <span style={{ color: '#9B2D4E' }}>
                  ✗{' '}
                  {
                    Object.values(orderStatus).filter((s) => s === 'Cancelled')
                      .length
                  }{' '}
                  Cancelled
                </span>
              </div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Item</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ORDERS.map((o) => (
                  <tr key={o.id}>
                    <td className={styles.orderId}>{o.id}</td>
                    <td>{o.customer}</td>
                    <td className={styles.phone}>{o.phone}</td>
                    <td>{o.items}</td>
                    <td className={styles.date}>{o.date}</td>
                    <td className={styles.price}>
                      ${o.total.toLocaleString()}
                    </td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={orderStatus[o.id]}
                        style={STATUS_STYLE[orderStatus[o.id]]}
                        onChange={(e) =>
                          setOrderStatus((s) => ({
                            ...s,
                            [o.id]: e.target.value,
                          }))
                        }
                      >
                        <option>Processing</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── MEMBERS ── */}
        {activeTab === 'Members' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTitle}>
                All Members ({users.length})
              </p>
              <input
                className={styles.searchInput}
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Orders</th>
                  <th>Spent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m) => (
                  <tr key={m.id}>
                    <td className={styles.memberName}>
                      <div className={styles.memberAvatar}>
                        {m.name.charAt(0)}
                      </div>
                      {m.name}
                    </td>
                    <td className={styles.email}>{m.email}</td>
                    <td className={styles.phone}>{m.phone || '—'}</td>
                    <td>
                      <span
                        className={styles.status}
                        style={
                          m.role === 'admin'
                            ? {
                                background: 'rgba(201,168,76,0.1)',
                                color: '#C9A84C',
                              }
                            : {
                                background: 'rgba(123,29,58,0.08)',
                                color: '#7B1D3A',
                              }
                        }
                      >
                        {m.role === 'admin' ? '👑 Admin' : '👤 Member'}
                      </span>
                    </td>
                    <td className={styles.date}>{m.joined}</td>
                    <td className={styles.orders}>{m.orders}</td>
                    <td className={styles.price}>
                      ${(m.spent || 0).toLocaleString()}
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        {m.role === 'member' ? (
                          <button
                            className={styles.btnEdit}
                            onClick={() => promoteToAdmin(m.id)}
                          >
                            👑 Make Admin
                          </button>
                        ) : m.id !== currentUser?.id ? (
                          <button
                            className={styles.btnDelete}
                            onClick={() => demoteToMember(m.id)}
                          >
                            Remove Admin
                          </button>
                        ) : (
                          <span className={styles.date}>You</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMembers.length === 0 && (
              <div className={styles.noResults}>
                <p>No members found for "{search}"</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
