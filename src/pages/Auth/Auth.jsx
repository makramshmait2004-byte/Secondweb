import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Auth.module.css'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      if (form.password !== form.confirm) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }
      const result = signup(form.name, form.email, form.password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error)
      }
    } else {
      const result = login(form.email, form.password)
      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        setError(result.error)
      }
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.logoWrap} onClick={() => navigate('/')}>
          <span className={styles.logo}>SECOND</span>
          <span className={styles.logoSub}>Luxury Fashion Lebanon</span>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => { setMode('login'); setError('') }}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => { setMode('signup'); setError('') }}
          >
            Sign Up
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Full Name *</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your full name"
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email *</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="email@example.com"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password *</label>
            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Confirm Password *</label>
              <input
                required
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>
          )}

          {error && <p className={styles.error}>✕ {error}</p>}

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          {mode === 'login' && (
            <div className={styles.hint}>
              <p>Admin login: <strong>admin@second.com</strong> / <strong>second2026</strong></p>
            </div>
          )}

        </form>

        <button className={styles.btnBack} onClick={() => navigate('/')}>
          ← Continue as Guest
        </button>

      </div>
    </div>
  )
}