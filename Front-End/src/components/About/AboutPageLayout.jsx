import Footer from "../Layout/Fotter";
import Navbar from "../Layout/Navbar";
import RestaurantBanner from "../Layout/RestaurantBanner";
import AboutUs from "./About-Header";
import ChefTeam from "./chef-team-component";
import ExperianceChef from "./ExperianceChef";
import TestimonialSlider from "./TestimonialSlide";
import RestaurantUI from "./WhyChooseUs";

function AboutPageLayout() {
  return (
    <div className="w-full h-gull">
      <div className="bg-green-100 ">
        <Navbar />
        <AboutUs />
      </div>
   
      <ChefTeam />
      <TestimonialSlider />
      <RestaurantUI />
      <ExperianceChef />
      <RestaurantBanner/>
      <Footer />
    </div>
  );
}

export default AboutPageLayout;
