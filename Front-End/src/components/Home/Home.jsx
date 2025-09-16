

import { GoogleOneTapLoginWrapper } from "@/utils/auth";
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
import LoadingLayout from "../Layout/Loader/LoadingLayout";
import { useSelector } from "react-redux";


function Home() {
  const{isLoading}=useSelector((state)=>state.auth)
  console.log(isLoading)

  return (
    <div className="flex flex-col  overflow-hidden h-auto   ">
      {isLoading && <LoadingLayout />}
       <GoogleOneTapLoginWrapper />
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
