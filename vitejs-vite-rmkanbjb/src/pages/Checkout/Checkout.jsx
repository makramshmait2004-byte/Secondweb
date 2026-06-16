import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Checkout.module.css'
import Footer from '../../components/Footer/Footer'

export default function Checkout() {
  const { cart, totalUSD, clearCart } = useCart()
  const navigate = useNavigate()
  const LBP_RATE = 89500

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', region: '', notes: '',
    payment: 'cash'
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Order Placed!</h2>
          <p className={styles.successSub}>Thank you {form.firstName}! We'll contact you on {form.phone} to confirm your order.</p>
          <button className={styles.btnHome} onClick={() => navigate('/')}>Back to Home</button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <span className={styles.label}>Almost There</span>
          <h1 className={styles.pageTitle}>Check<em>out</em></h1>
        </div>

        <div className={styles.layout}>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Contact Information</p>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label2}>First Name *</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} className={styles.input} placeholder="Makram" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label2}>Last Name *</label>
                  <input required name="lastName" value={form.lastName} onChange={handleChange} className={styles.input} placeholder="Doe" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label2}>Email *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className={styles.input} placeholder="email@example.com" />
              </div>
              <div className={styles.field}>
                <label className={styles.label2}>Phone / WhatsApp *</label>
                <input required name="phone" value={form.phone} onChange={handleChange} className={styles.input} placeholder="+961 70 000 000" />
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Delivery Address</p>
              <div className={styles.field}>
                <label className={styles.label2}>Address *</label>
                <input required name="address" value={form.address} onChange={handleChange} className={styles.input} placeholder="Street, Building, Floor" />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label2}>City *</label>
                  <input required name="city" value={form.city} onChange={handleChange} className={styles.input} placeholder="Aley" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label2}>Region *</label>
                  <select required name="region" value={form.region} onChange={handleChange} className={styles.input}>
                    <option value="">Select Region</option>
                    <option>Beirut</option>
                    <option>Mount Lebanon</option>
                    <option>North Lebanon</option>
                    <option>South Lebanon</option>
                    <option>Bekaa</option>
                    <option>Nabatieh</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label2}>Order Notes (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} className={styles.textarea} placeholder="Any special instructions..." rows={3} />
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Payment Method</p>
              <div className={styles.payOptions}>
                <label className={`${styles.payOption} ${form.payment === 'cash' ? styles.payActive : ''}`}>
                  <input type="radio" name="payment" value="cash" checked={form.payment === 'cash'} onChange={handleChange} />
                  <span className={styles.payIcon}>💵</span>
                  <div>
                    <p className={styles.payTitle}>Cash on Delivery</p>
                    <p className={styles.paySub}>Pay when you receive</p>
                  </div>
                </label>
                <label className={`${styles.payOption} ${form.payment === 'whatsapp' ? styles.payActive : ''}`}>
                  <input type="radio" name="payment" value="whatsapp" checked={form.payment === 'whatsapp'} onChange={handleChange} />
                  <span className={styles.payIcon}>💬</span>
                  <div>
                    <p className={styles.payTitle}>WhatsApp Order</p>
                    <p className={styles.paySub}>We'll confirm via WhatsApp</p>
                  </div>
                </label>
                <label className={`${styles.payOption} ${form.payment === 'transfer' ? styles.payActive : ''}`}>
                  <input type="radio" name="payment" value="transfer" checked={form.payment === 'transfer'} onChange={handleChange} />
                  <span className={styles.payIcon}>🏦</span>
                  <div>
                    <p className={styles.payTitle}>Bank Transfer</p>
                    <p className={styles.paySub}>Details sent after order</p>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Place Order — ${totalUSD.toLocaleString()}
            </button>

          </form>

          {/* Order Summary */}
          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Order Summary</p>

            <div className={styles.summaryItems}>
              {cart.map((item, i) => (
                <div key={i} className={styles.summaryItem}>
                  <div className={styles.summaryImg}>
                    <span>{item.icon}</span>
                  </div>
                  <div className={styles.summaryInfo}>
                    <p className={styles.summaryBrand}>{item.brand}</p>
                    <p className={styles.summaryName}>{item.name}</p>
                    <p className={styles.summaryMeta}>{item.color} · {item.size} · x{item.qty}</p>
                  </div>
                  <p className={styles.summaryPrice}>${(item.priceUSD * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${totalUSD.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.free}>Free</span>
              </div>
              <div className={styles.summaryRow}>
                <span>LBP Equivalent</span>
                <span>{(totalUSD * LBP_RATE).toLocaleString()} LBP</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${totalUSD.toLocaleString()}</span>
            </div>

            <div className={styles.trust}>
              <p><i className="ti ti-shield-check" /> 100% Authentic Products</p>
              <p><i className="ti ti-truck-delivery" /> Free Delivery in Lebanon</p>
              <p><i className="ti ti-lock" /> Safe & Secure Checkout</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}