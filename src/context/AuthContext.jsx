import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const ADMIN_EMAILS = ['admin@second.com']

const DEFAULT_USERS = [
  { id: 1, name: 'Admin', email: 'admin@second.com', password: 'second2026', role: 'admin', joined: 'Jan 2026', orders: 0, spent: 0 },
  { id: 2, name: 'Lara K.', email: 'lara@example.com', password: '123456', role: 'member', joined: 'Jan 2026', orders: 3, spent: 2500 },
  { id: 3, name: 'Rami S.', email: 'rami@example.com', password: '123456', role: 'member', joined: 'Mar 2026', orders: 1, spent: 720 },
]

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('second_users')
    return saved ? JSON.parse(saved) : DEFAULT_USERS
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('second_current_user')
    return saved ? JSON.parse(saved) : null
  })

  const saveUsers = (newUsers) => {
    setUsers(newUsers)
    localStorage.setItem('second_users', JSON.stringify(newUsers))
  }

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      setCurrentUser(user)
      localStorage.setItem('second_current_user', JSON.stringify(user))
      return { success: true, user }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = (name, email, password) => {
    const exists = users.find(u => u.email === email)
    if (exists) return { success: false, error: 'Email already registered' }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'member',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      orders: 0,
      spent: 0,
    }

    const newUsers = [...users, newUser]
    saveUsers(newUsers)
    setCurrentUser(newUser)
    localStorage.setItem('second_current_user', JSON.stringify(newUser))
    return { success: true, user: newUser }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('second_current_user')
  }

  const promoteToAdmin = (userId) => {
    const newUsers = users.map(u =>
      u.id === userId ? { ...u, role: 'admin' } : u
    )
    saveUsers(newUsers)
    if (currentUser?.id === userId) {
      const updated = { ...currentUser, role: 'admin' }
      setCurrentUser(updated)
      localStorage.setItem('second_current_user', JSON.stringify(updated))
    }
  }

  const demoteToMember = (userId) => {
    const newUsers = users.map(u =>
      u.id === userId ? { ...u, role: 'member' } : u
    )
    saveUsers(newUsers)
  }

  const isAdmin = currentUser?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      users, currentUser, login, signup, logout,
      promoteToAdmin, demoteToMember, isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}