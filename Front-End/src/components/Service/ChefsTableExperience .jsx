import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const ChefsTableExperience = () => {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-neutral-100 rounded-lg overflow-hidden">
        {/* Header Image - Three connected circles with chef image */}
        <div data-aos="fade-right" className="flex justify-center">
          <div className="flex">
            <div className="w-32 h-64 bg-amber-800 rounded-l-full overflow-hidden border-r border-neutral-100"></div>
            <div className="w-64 h-64 overflow-hidden relative border-l border-r border-neutral-100">
              <img
                src="https://img.freepik.com/premium-photo/female-chef-with-tray-food-hand-isolated-white_70216-4205.jpg?w=740"
                alt="Chef holding a tray"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-32 h-64 bg-amber-700 rounded-r-full overflow-hidden border-l border-neutral-100 relative">
              <div className="absolute inset-0 bg-amber-950/20"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div  data-aos="fade-left"  className="px-4 pt-2 pb-6">
          {/* Experience Title Banner */}
          <div className="flex justify-center items-center py-2">
            <div className="h-px bg-amber-500 flex-grow"></div>
            <span className="px-4 text-amber-600 font-semibold text-sm">Chef's Table Experience</span>
            <div className="h-px bg-amber-500 flex-grow"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-serif text-gray-900 mb-3">A Front-Row Seat to Culinary Excellence</h1>

          {/* Description */}
          <p className="text-gray-700 mb-6">
            Step into the heart of our kitchen with the Chef's Table experience. Watch as our chefs create a custom menu just for you, showcasing their passion and skill in every dish.
          </p>

          {/* Features List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <div className="mt-1 mr-2 bg-green-100 rounded-full p-1">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">Personalized multi-course menu.</span>
            </div>
            <div className="flex items-start">
              <div className="mt-1 mr-2 bg-green-100 rounded-full p-1">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">Up-close interaction with our culinary team.</span>
            </div>
            <div className="flex items-start">
              <div className="mt-1 mr-2 bg-green-100 rounded-full p-1">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">An intimate and exclusive dining experience.</span>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded flex items-center space-x-2 transition-colors">
              <span>Order Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefsTableExperience;