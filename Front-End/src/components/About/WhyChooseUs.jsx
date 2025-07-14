import React from 'react';

const RestaurantUI = () => {
  return (
    <div data-aos="zoom-in" className="max-w-7xl mx-auto px-4 py-8">
      {/* Why Choose Us Section */}
      <div className="text-center mb-8">
        <h2 className="flex items-center justify-center text-lg text-green-600 font-medium">
          <span className="text-orange-400 mr-2">----</span>
          Why Choose Us
          <span className="text-orange-400 ml-2">----</span>
        </h2>
        
        <h1 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-gray-800">
          Exceptional Dining, Every Time
        </h1>
        
        <p className="max-w-3xl mx-auto text-gray-700">
          At Rasoi Reverie, we go above and beyond to make your dining experience unforgettable. 
          From the quality of our dishes to the warmth of our service, we're committed to exceeding your expectations.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Left Column */}
        <div className="space-y-12 md:space-y-16">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
              <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-800 mb-2">Expertly Crafted Dishes</h3>
              <p className="text-gray-600">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
              <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-800 mb-2">Inviting Ambiance</h3>
              <p className="text-gray-600">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
              <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-800 mb-2">Unparalleled Service</h3>
              <p className="text-gray-600">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit.
              </p>
            </div>
          </div>
        </div>
        
        {/* Center Column - Restaurant Image */}
        <div className="flex items-center justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://wallpapercave.com/wp/wp10322913.jpg" 
              alt="Restaurant interior with modern dining tables" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-12 md:space-y-16">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
              <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-800 mb-2">Exceptional Food</h3>
              <p className="text-gray-600">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
              <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-800 mb-2">Unique Ambiance</h3>
              <p className="text-gray-600">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
              <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8"></path>
                <path d="M12 18v4"></path>
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 12l8.5 8.5"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-800 mb-2">Unmatched Hospitality</h3>
              <p className="text-gray-600">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantUI;