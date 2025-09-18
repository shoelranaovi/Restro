import Footer from "../Layout/Fotter"
import Navbar from "../Layout/Navbar"
import ContactPage from "./Contact"
import GoogleMapComponent from "./GoogleMap"


function ContactLayout() {
  return (
    <div className="overflow-x-hidden ">
        <div className="bg-green-50  ">
        <Navbar />
      </div>
      <ContactPage />
      <GoogleMapComponent />
      <Footer/>
      
    </div>
  )
}

export default ContactLayout
