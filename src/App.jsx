import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import TopBar from './components/TopBar/TopBar'
import Navbar from './components/Navbar/Navbar'
import Loader from './components/Loader/Loader'
import PageTransition from './components/PageTransition/PageTransition'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Wishlist from './pages/Wishlist/Wishlist'
import Search from './pages/Search/Search'
import Profile from './pages/Profile/Profile'
import About from './pages/About/About'
import Admin from './pages/Admin/Admin'
import Auth from './pages/Auth/Auth'
import NotFound from './pages/NotFound/NotFound'

function ProtectedAdmin() {
  const { isAdmin } = useAuth()
  return isAdmin ? <Admin /> : <Navigate to="/login" />
}

function StoreLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bags" element={<Shop />} />
          <Route path="/shoes" element={<Shop />} />
          <Route path="/watches" element={<Shop />} />
          <Route path="/accessories" element={<Shop />} />
          <Route path="/new-in" element={<Shop />} />
          <Route path="/sale" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  )
}

function AppContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/admin" element={<ProtectedAdmin />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/*" element={<StoreLayout />} />
        </Routes>
      </Router>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}