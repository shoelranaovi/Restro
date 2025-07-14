import Footer from "../Layout/Fotter"
import Navbar from "../Layout/Navbar"
import RestaurantReservation from "./ReservationFrom"
import RestaurantMenu from "./ResturantMenu"

function ReservationLayout() {
  return (
    <div>
          
        <div className="bg-green-50 ">
        <Navbar />
      </div>
      <RestaurantMenu />
      
      <RestaurantReservation />
      <Footer />
      
    </div>
  )
}

export default ReservationLayout
