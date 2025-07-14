import React from "react";
import { Clock, Check, Coffee, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-[#F0EDE8] py-16 px-4 md:px-10 lg:px-20" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section - Using placeholder instead of external URL */}
        <div data-aos="fade-right" className="flex justify-center">
          <div className="relative flex justify-center items-center border">
            <img 
              src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/food-Image-1.webp" 
              alt="Gourmet food platter with assorted dishes" 
              className=" w-[90%] max-w-lg shadow-lg p-8  border-dotted border-orange-500 border-[1px] rounded-full" 
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md hidden md:block">
              <span className="text-green-700 font-bold text-xl">15+</span>
              <p className="text-gray-600 text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div data-aos="fade-left" >
          <h3 className="text-green-700 text-lg font-semibold mb-2">Who We Are</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Blending Tradition with Innovation
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At Rasoi Reverie, we go above and beyond to make your dining experience
            unforgettable. From the quality of our dishes to the warmth of our
            service, we're committed to exceeding your expectations with authentic flavors
            and innovative culinary techniques.
          </p>

          {/* Feature Grid - Now with 4 items and better icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <FeatureItem 
              icon={<Clock />}
              title="Super Quality Food"
              description="Carefully selected ingredients prepared by our master chefs."
            />
            
            <FeatureItem 
              icon={<Check />}
              title="100% Fresh Food"
              description="We source local ingredients daily for maximum freshness."
            />

            <FeatureItem 
              icon={<Coffee />}
              title="Authentic Flavors"
              description="Traditional recipes with contemporary presentation."
            />

            <FeatureItem 
              icon={<Users />}
              title="Culinary Expertise"
              description="Our chefs bring decades of experience to every dish."
            />
          </div>

          {/* CTA Button */}
          <button className=" button-hover-orange text-orange border-green-500 hover:border-transparent border-[1px] font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2">
            Learn More About Our Story
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Extracted reusable component for feature items
const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-green-100 text-green-600 p-2 rounded-full flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;