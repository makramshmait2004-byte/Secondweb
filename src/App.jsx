import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'

export default function App() {
  return (
    <Router>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}