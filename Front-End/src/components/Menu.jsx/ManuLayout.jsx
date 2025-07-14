import Footer from "../Layout/Fotter"
import Navbar from "../Layout/Navbar"
import RestaurantBanner from "../Layout/RestaurantBanner"
import WhyChooseUs from "../Layout/whyChooseUs"
import RestaurantMenu from "./Menu"



function ManuLayout() {
  return (
    <div className="w-full overflow-hidden">
        <div className="bg-green-50 shadow-lg">
        <Navbar />
        <RestaurantMenu />
      </div>
     
        <WhyChooseUs />
        <RestaurantBanner/>
        <Footer />
      
    </div>
  )
}

export default ManuLayout
