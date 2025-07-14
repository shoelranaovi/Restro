import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

const ServicesComponent = () => {
  return (
    <div  className="w-full">
      {/* Top Banner */}
      <div data-aos="fade-right"  className="w-full bg-green-50 p-6 md:p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-3">Services</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
        </p>
      </div>
      
      {/* Services Content Section */}
      <div data-aos="fade-left" className="max-w-6xl mx-auto px-4 py-12">
        {/* Services Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center md:justify-start mb-3">
            <div className="h-px w-6 bg-green-600"></div>
            <span className="text-green-600 mx-2">Services</span>
            <div className="h-px w-6 bg-green-600"></div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif mb-6">Unforgettable Exceptional Service.</h3>
          
          <p className="text-gray-700 mb-8">
            At Rasoi Reverie, we take pride in offering a range of world-class services that elevate dining into an art form. Whether you're joining us for a casual meal, an exclusive event, or a tailored culinary experience, we are here to make your visit unforgettable.
          </p>
          
          <h4 className="text-xl font-medium mb-6">A Gourmet Journey Like No Other</h4>
        </div>
        
        {/* Services List */}
        <div className="mb-10">
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">Seasonal tasting menus</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">Vegan and gluten-free options</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">Signature dishes inspired by global cuisines</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">Personalized dining options for unique preferences.</span>
            </li>
          </ul>
        </div>
        
        {/* CTA Button */}
        <div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded flex items-center group transition-all duration-300">
            Explore Our Menu
            <div className="ml-2 bg-orange-400 rounded-full p-1 group-hover:bg-orange-500">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;