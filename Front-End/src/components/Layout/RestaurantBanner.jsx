import React from 'react';

const RestaurantBanner = () => {
  return (
    <div className="relative w-full bg-green-50 overflow-hidden">
      <div data-aos="fade-up"
     data-aos-duration="3000" className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="w-full md:w-1/2 z-10 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            Ready to Experience Culinary Excellence?
          </h1>
          <p className="text-lg text-green-800 mb-6 max-w-md">
            Book a table today and let us take you on a delicious journey you'll never forget.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Book a Table
          </button>
        </div>
        
        {/* Right Content - Food Images Grid */}
        <div className="w-full md:w-1/2 relative">
          <div className="grid grid-cols-2 gap-3 md:gap-4 transform rotate-6 scale-110">
            {/* Food Image 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="bg-orange-100 p-2">
                <img 
                  src="https://th.bing.com/th/id/R.005be18c0b54b0895155ed203d64b49b?rik=Genc6wQjG6W9Kg&pid=ImgRaw&r=0" 
                  alt="Gourmet burger with fries" 
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            </div>
            
            {/* Food Image 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg mt-6">
              <div className="bg-green-100 p-2">
                <img 
                  src="https://th.bing.com/th/id/OIP.u3waZH4c-1mV9Daa7c66wgHaE8?w=800&h=534&rs=1&pid=ImgDetMain" 
                  alt="Assorted appetizers" 
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            </div>
            
            {/* Food Image 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg -mt-4">
              <div className="bg-red-100 p-2">
                <img 
                  src="https://th.bing.com/th/id/R.26f677899cb906831538311cac52504e?rik=s0GOw2btDQt1tQ&pid=ImgRaw&r=0" 
                  alt="Fresh salad" 
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            </div>
            
            {/* Food Image 4 */}
            <div className="rounded-lg overflow-hidden shadow-lg mt-2">
              <div className="bg-yellow-100 p-2">
                <img 
                  src="https://img.freepik.com/premium-photo/food-image-with-resturent_1042601-3472.jpg" 
                  alt="Grilled chicken" 
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="absolute top-1/4 left-12 w-8 h-8 rounded-full bg-red-500 opacity-30 transform rotate-45"></div>
      <div data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="1500"  className="absolute bottom-1/4 right-20 w-16 h-16 rounded-full bg-green-300 opacity-40"></div>
      <div data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="1500" className="absolute top-1/3 right-40 w-6 h-6 rounded-full bg-yellow-400 opacity-30"></div>
      
      {/* Food Icons */}
      <div className="hidden md:block absolute top-20 right-1/4 transform rotate-12">
        <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="hidden md:block absolute bottom-16 left-1/4 transform -rotate-12">
        <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </div>
    </div>
  );
};

export default RestaurantBanner;