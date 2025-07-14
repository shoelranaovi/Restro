import React from 'react';

const PuzzleGallery = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 aspect-square md:aspect-[4/3]">
        {/* Top Left - Empty space for logo or offset */}
        <div className="hidden md:block md:col-span-1"></div>
        
        {/* Top Center - Image */}
        <div data-aos="zoom-in" className="rounded-3xl overflow-hidden bg-orange-100">
          <img 
            src="https://townsquare.media/site/672/files/2022/08/attachment-RS37806_ambulance.jpg?w=980&q=75" 
            alt="Restaurant ambiance" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Top Right - Image */}
        <div data-aos="zoom-in-up" className="rounded-3xl overflow-hidden bg-orange-100">
          <img 
            src="https://www.rewardsnetwork.com/wp-content/uploads/2016/03/Bar-Inventory_Main.jpg" 
            alt="Bar area" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Middle Left - Image */}
        <div data-aos="zoom-in-up" className="rounded-3xl overflow-hidden bg-orange-100">
          <img 
            src="https://149449860.v2.pressablecdn.com/wp-content/uploads/2018/08/RC-NEWS-STAYING-COMPETITIVE-IN-TABLE-0818.jpg" 
            alt="Customers at table" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Middle Center - Main Image (Server with food) */}
        <div data-aos="zoom-in-up" className="col-span-1 md:row-span-2 rounded-3xl overflow-hidden bg-orange-100">
          <img 
            src="https://assets.eposnow.com/public/Uploads/lefteris-kallergis-NQZiQxuIyFk-unsplash__FocusFillWzkxNiw0MzMsInkiLDg5XQ.jpg" 
            alt="Server with plates of food" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Middle Right - Empty space for offset */}
        <div className="hidden md:block"></div>
        
        {/* Bottom Left - Empty space for offset */}
        <div className="hidden md:block"></div>
        
        {/* Bottom Center - Image */}
        <div data-aos="zoom-in-left" className="rounded-3xl overflow-hidden bg-orange-100">
          <img 
            src="https://img.freepik.com/premium-photo/restaurant-plates-waiter-serving-food-fine-dining-luxury-meal-classy-date-valentines-day-hospitality-service-dinner-server-with-supper-formal-event-party-celebration_590464-138677.jpg?w=996" 
            alt="Food plates" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Title and call to action */}
      <div className="mt-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Experience Culinary Excellence</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Enjoy exceptional service and delicious cuisine in our warm, inviting atmosphere.</p>
        <button className="mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition duration-300">
          Make a Reservation
        </button>
      </div>
    </div>
  );
};

export default PuzzleGallery;