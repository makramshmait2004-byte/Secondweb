import React from 'react'
import Hero from '../../components/Hero/Hero'
import Ticker from '../../components/Ticker/Ticker'
import FeaturedBrands from '../../components/FeaturedBrands/FeaturedBrands'
import Products from '../../components/Products/Products'
import Reviews from '../../components/Reviews/Reviews'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <FeaturedBrands />
      <Products />
      <Reviews />
      <Footer />
    </main>
  )
}