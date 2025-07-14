import React from 'react'
import Navbar from '../Layout/Navbar'
import ChefTeam from './Chefs'
import Discounts from '../Layout/Discounts'
import RestaurantUI from './Exeriance'
import Footer from '../Layout/Fotter'


function ChefLayout () {
  return (
    <div>
      <div className="w-full overflow-hidden">
        <div className="bg-green-50 shadow-lg">
        <Navbar />
      </div>
      <ChefTeam />
      <Discounts />
      <RestaurantUI />
      <Footer />
    </div>
    </div>
  )
}

export default ChefLayout
