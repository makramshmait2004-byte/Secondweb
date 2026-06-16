import React, { useState } from 'react'
import styles from './About.module.css'
import Footer from '../../components/Footer/Footer'

export default function About() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <>
      <div className={styles.page}>

        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.label}>Our Story</span>
          <h1 className={styles.heroTitle}>About <em>SECOND</em></h1>
          <p className={styles.heroSub}>
            Luxury fashion, rooted in Lebanon
          </p>
        </div>

        {/* Story */}
        <div className={styles.story}>
          <div className={styles.storyText}>
            <span className={styles.label}>Who We Are</span>
            <h2 className={styles.storyTitle}>Bringing the World's <em>Finest</em> to Aley</h2>
            <p className={styles.storyBody}>
              SECOND was born from a passion for authentic luxury fashion and a belief that everyone in Lebanon deserves access to the world's most iconic brands. Based in the beautiful mountains of Aley, we curate the finest bags, shoes, watches, and accessories from houses like Louis Vuitton, Chanel, Hermès, Gucci, and more.
            </p>
            <p className={styles.storyBody}>
              Every piece in our collection is 100% authenticated by our team of luxury experts. We believe that true luxury is not just about the item — it's about the experience, the trust, and the story behind every piece.
            </p>
            <p className={styles.storyBody}>
              Whether you're looking for a classic investment piece or a seasonal statement, SECOND is your trusted destination for luxury fashion in Lebanon.
            </p>
          </div>
          <div className={styles.storyVisual}>
            <div className={styles.storyCard}>
              <span className={styles.storyIcon}>🏔️</span>
              <p className={styles.storyCardLabel}>Aley, Mount Lebanon</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className={styles.values}>
          <div className={styles.valuesHeader}>
            <span className={styles.label}>What We Stand For</span>
            <h2 className={styles.valuesTitle}>Our <em>Values</em></h2>
          </div>
          <div className={styles.valuesGrid}>
            {[
              { icon: '🛡️', title: 'Authenticity', desc: 'Every single item is verified and authenticated by our expert team before reaching you.' },
              { icon: '💎', title: 'Quality', desc: 'We only carry pieces from the world\'s most prestigious luxury houses — no compromises.' },
              { icon: '🤝', title: 'Trust', desc: 'Built on transparency and honesty. We are always here to answer your questions.' },
              { icon: '🚀', title: 'Service', desc: 'From browsing to delivery, we make your luxury experience seamless and personal.' },
            ].map(v => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            { num: '500+', label: 'Luxury Pieces' },
            { num: '30+', label: 'Top Brands' },
            { num: '100%', label: 'Authentic' },
            { num: '1000+', label: 'Happy Clients' },
          ].map(s => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Visit Us */}
        <div className={styles.visit}>
          <div className={styles.visitInfo}>
            <span className={styles.label}>Come See Us</span>
            <h2 className={styles.visitTitle}>Visit Our <em>Store</em></h2>
            <p className={styles.visitDesc}>
              We'd love to welcome you to our boutique in Aley. Come experience our full collection in person and let our team help you find your perfect piece.
            </p>
            <div className={styles.visitDetails}>
              <div className={styles.visitItem}>
                <i className="ti ti-map-pin" />
                <div>
                  <p className={styles.visitItemTitle}>Address</p>
                  <p className={styles.visitItemText}>Aley, Mount Lebanon, Lebanon</p>
                </div>
              </div>
              <div className={styles.visitItem}>
                <i className="ti ti-clock" />
                <div>
                  <p className={styles.visitItemTitle}>Opening Hours</p>
                  <p className={styles.visitItemText}>Mon – Sat: 10:00 AM – 8:00 PM</p>
                  <p className={styles.visitItemText}>Sunday: 12:00 PM – 6:00 PM</p>
                </div>
              </div>
              <div className={styles.visitItem}>
                <i className="ti ti-brand-whatsapp" />
                <div>
                  <p className={styles.visitItemTitle}>WhatsApp</p>
                  <p className={styles.visitItemText}>Available 7 days · Fast replies</p>
                </div>
              </div>
              <div className={styles.visitItem}>
                <i className="ti ti-brand-instagram" />
                <div>
                  <p className={styles.visitItemTitle}>Instagram</p>
                  <p className={styles.visitItemText}>@second.lebanon</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.visitMap}>
            <div className={styles.mapPlaceholder}>
              <span>🗺️</span>
              <p>Aley, Mount Lebanon</p>
              <button className={styles.btnGold}>Get Directions</button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contact}>
          <div className={styles.contactHeader}>
            <span className={styles.label}>Get in Touch</span>
            <h2 className={styles.contactTitle}>Contact <em>Us</em></h2>
            <p className={styles.contactSub}>Have a question? We'd love to hear from you.</p>
          </div>

          {sent ? (
            <div className={styles.successMsg}>
              <span className={styles.successIcon}>✓</span>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
              <button className={styles.btnGold} onClick={() => setSent(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Your Name *</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Makram"
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Email *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Phone / WhatsApp</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="+961 70 000 000"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Message *</label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>
              <button type="submit" className={styles.btnSubmit}>
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
      <Footer />
    </>
  )
}