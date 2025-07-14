

import Discounts from "../Layout/Discounts";
import Footer from "../Layout/Fotter";
import RestaurantBanner from "../Layout/RestaurantBanner";
import WhyChooseUs from "../Layout/whyChooseUs";
import AboutSection from "./AboutUs/AboutSection";
import AboutUs from "./AboutUs/AboutUs";
import FoodBlog from "./FoodBlog";
import Header from "./Header";
import PopularDish from "./PopularDash/PopularDish";
import RestaurantMenu from "./RestaurantMenu";


function Home() {
  return (
    <div className="flex flex-col  overflow-hidden h-auto   ">
      <Header />
      <PopularDish/>
      <AboutUs />
      <Discounts />
      <WhyChooseUs />
      <AboutSection />
      <RestaurantMenu/>
      <FoodBlog />
      <RestaurantBanner/>
      <Footer/>
      
     
    
    </div>
  );
}

export default Home;
