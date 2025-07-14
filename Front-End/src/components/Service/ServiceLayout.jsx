import FoodBlog from "../Home/FoodBlog"
import Discounts from "../Layout/Discounts"
import Footer from "../Layout/Fotter"
import Navbar from "../Layout/Navbar"
import ChefsTableExperience from "./ChefsTableExperience "
import PrivateDiningSection from "./PrivateDiningSection"
import PrivateDiningUI from "./PrivateDiningUI"
import PuzzleGallery from "./PuzzleGallery"
import ServicesComponent from "./ServicesComponent"


function ServiceLayout() {
  return (
    <div className="overflow-hidden">
         <div className="bg-green-50 ">
        <Navbar />
        <ServicesComponent />
      </div>
    
      <PrivateDiningUI />
      <PuzzleGallery />
      <PrivateDiningSection />
      <Discounts />
      <FoodBlog />
      <ChefsTableExperience />
      <Footer />

      
    </div>
  )
}

export default ServiceLayout
