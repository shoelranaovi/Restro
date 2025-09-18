import Footer from "../Layout/Fotter"
import Navbar from "../Layout/Navbar"
import RestaurantReservation from "./ReservationFrom"
import RestaurantMenu from "./ResturantMenu"

function ReservationLayout() {
  return (
    <div className="overflow-x-hidden"  >
          
        <div className="pb-6">
        <Navbar />
      </div>
      <RestaurantMenu />
      
      <RestaurantReservation />
      <Footer />
      
    </div>
  )
}

export default ReservationLayout
