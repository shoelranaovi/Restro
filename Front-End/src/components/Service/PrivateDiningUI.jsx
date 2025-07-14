import React from 'react';

const PrivateDiningUI = () => {
  return (
    <div data-aos="fade-up-left" className="bg-amber-50 p-4 md:p-8 lg:p-12 w-full font-serif">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <p className="text-green-700 font-medium mb-2">
          <span className="hidden sm:inline-block">---- </span>
          Private Dining & Events 
          <span className="hidden sm:inline-block"> ----</span>
        </p>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Exclusive Spaces for Every Celebration
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Custom Menus */}
          <div className="border border-green-200 rounded-lg p-6 flex flex-col items-center bg-white/50">
            <div className="mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="10" width="36" height="40" rx="2" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2"/>
                <path d="M24 20H36M24 30H36M24 40H30" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 20H20M16 30H20M16 40H20" stroke="#9b2c2c" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Custom Menus</h3>
            <p className="text-gray-600 text-center text-sm">
              Curated by our expert chefs to suit your taste.
            </p>
          </div>
          
          {/* Dedicated Team */}
          <div className="border border-green-200 rounded-lg p-6 flex flex-col items-center bg-white/50">
            <div className="mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 25C38.3137 25 41 22.3137 41 19C41 15.6863 38.3137 13 35 13C31.6863 13 29 15.6863 29 19C29 22.3137 31.6863 25 35 25Z" fill="#f9a8d4" stroke="#6b7280" strokeWidth="2"/>
                <path d="M35 30C27 30 27 37 27 42H43C43 37 43 30 35 30Z" fill="#f9a8d4" stroke="#6b7280" strokeWidth="2"/>
                <path d="M18 37H32" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <path d="M25 30L25 44" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19 45C22.3137 45 25 42.3137 25 39C25 35.6863 22.3137 33 19 33C15.6863 33 13 35.6863 13 39C13 42.3137 15.6863 45 19 45Z" fill="#f9a8d4" stroke="#6b7280" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Dedicated Team</h3>
            <p className="text-gray-600 text-center text-sm">
              Professional staff to make your event seamless and stress-free.
            </p>
          </div>
          
          {/* Unparalleled Service */}
          <div className="border border-green-200 rounded-lg p-6 flex flex-col items-center bg-white/50">
            <div className="mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 37C10 33.6863 12.6863 31 16 31H44C47.3137 31 50 33.6863 50 37V42C50 43.1046 49.1046 44 48 44H12C10.8954 44 10 43.1046 10 42V37Z" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2"/>
                <path d="M38 31V24C38 20.6863 35.3137 18 32 18H28C24.6863 18 22 20.6863 22 24V31" stroke="#6b7280" strokeWidth="2"/>
                <path d="M30 26L35 26" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <path d="M43 31L43 25" stroke="#eab308" strokeWidth="4" strokeLinecap="round"/>
                <path d="M37 22C39.7614 22 42 19.7614 42 17C42 14.2386 39.7614 12 37 12C34.2386 12 32 14.2386 32 17C32 19.7614 34.2386 22 37 22Z" fill="#fef3c7" stroke="#eab308" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Unparalleled Service</h3>
            <p className="text-gray-600 text-center text-sm">
              A dedicated team to make your event seamless
            </p>
          </div>
          
          {/* Elegant Spaces */}
          <div className="border border-green-200 rounded-lg p-6 flex flex-col items-center bg-white/50">
            <div className="mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 44H45" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <rect x="10" y="22" width="40" height="6" rx="2" fill="#bfdbfe" stroke="#6b7280" strokeWidth="2"/>
                <path d="M18 22V18C18 16.8954 18.8954 16 20 16H40C41.1046 16 42 16.8954 42 18V22" stroke="#6b7280" strokeWidth="2"/>
                <path d="M30 30L30 44" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <path d="M13 38C15.7614 38 18 35.7614 18 33C18 30.2386 15.7614 28 13 28C10.2386 28 8 30.2386 8 33C8 35.7614 10.2386 38 13 38Z" fill="#f9a8d4" stroke="#6b7280" strokeWidth="2"/>
                <path d="M47 38C49.7614 38 52 35.7614 52 33C52 30.2386 49.7614 28 47 28C44.2386 28 42 30.2386 42 33C42 35.7614 44.2386 38 47 38Z" fill="#f9a8d4" stroke="#6b7280" strokeWidth="2"/>
                <path d="M30 12L30 16" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="30" cy="10" r="2" fill="#bfdbfe" stroke="#6b7280" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Elegant Spaces</h3>
            <p className="text-gray-600 text-center text-sm">
              Versatile settings for both small gatherings and large events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateDiningUI;