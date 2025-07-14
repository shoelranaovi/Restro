import React from 'react';

export default function PrivateDiningSection() {
  return (
    <div className="bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500" className="text-center mb-12">
        <p className="text-green-600 font-medium">
          <span className="mr-2">----</span>
          Private Dining & Events
          <span className="ml-2">----</span>
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mt-2">
          Exclusive Spaces for Every Celebration
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>

      {/* Feature Boxes */}
      <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Custom Menus */}
        <div className="border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <rect x="12" y="8" width="40" height="48" rx="4" fill="#FFEEE3" />
              <rect x="20" y="20" width="16" height="2" rx="1" fill="#333" />
              <rect x="20" y="26" width="16" height="2" rx="1" fill="#333" />
              <rect x="20" y="32" width="16" height="2" rx="1" fill="#333" />
              <path d="M40 20H44" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M40 26H44" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M40 32H44" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 12L52 12" stroke="#E55A2D" strokeWidth="2" />
              <path d="M12 52L52 52" stroke="#E55A2D" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">Custom Menus</h3>
          <p className="text-slate-600">
            Curated by our expert chefs to suit your taste.
          </p>
        </div>

        {/* Dedicated Team */}
        <div className="border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <path d="M28 42C32.4183 42 36 38.4183 36 34C36 29.5817 32.4183 26 28 26C23.5817 26 20 29.5817 20 34C20 38.4183 23.5817 42 28 42Z" fill="#FFD7BF" />
              <path d="M25 50H30C33.3137 50 36 47.3137 36 44V42H20V44C20 47.3137 22.6863 50 26 50H28" stroke="#E55A2D" strokeWidth="2" />
              <path d="M30 30C30 28.8954 29.1046 28 28 28C26.8954 28 26 28.8954 26 30" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
              <path d="M38 28L42 24" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M38 40L42 44" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M44 34H50" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <rect x="29" y="14" width="20" height="12" rx="2" fill="#EFEFEF" stroke="#333333" strokeWidth="2" />
              <path d="M39 20L39 14" stroke="#333333" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">Dedicated Team</h3>
          <p className="text-slate-600">
            Professional staff to make your event seamless and stress-free.
          </p>
        </div>

        {/* Unparalleled Service */}
        <div className="border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <path d="M16 30H48V40C48 42.2091 46.2091 44 44 44H20C17.7909 44 16 42.2091 16 40V30Z" fill="#C2EAFF" />
              <path d="M16 30H48" stroke="#333333" strokeWidth="2" />
              <path d="M32 22V30" stroke="#333333" strokeWidth="2" />
              <rect x="24" y="16" width="16" height="12" rx="6" fill="#FFFBE9" stroke="#333333" strokeWidth="2" />
              <path d="M32 36C32 34.8954 32.8954 34 34 34H36C37.1046 34 38 34.8954 38 36V36C38 37.1046 37.1046 38 36 38H34C32.8954 38 32 37.1046 32 36V36Z" fill="#FFECB3" />
              <path d="M38 30L42 26" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 36H12" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M48 36H52" stroke="#E55A2D" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">Unparalleled Service</h3>
          <p className="text-slate-600">
            A dedicated team to make your event seamless.
          </p>
        </div>

        {/* Elegant Spaces */}
        <div className="border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <rect x="10" y="20" width="44" height="4" rx="2" fill="#7CD3FF" />
              <path d="M18 20V16" stroke="#7CD3FF" strokeWidth="2" strokeLinecap="round" />
              <path d="M46 20V16" stroke="#7CD3FF" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="32" r="4" fill="#FFECB3" />
              <circle cx="40" cy="32" r="4" fill="#FFECB3" />
              <rect x="20" y="36" width="8" height="12" rx="1" stroke="#E55A2D" strokeWidth="2" />
              <rect x="36" y="36" width="8" height="12" rx="1" stroke="#E55A2D" strokeWidth="2" />
              <path d="M28 40H36" stroke="#333333" strokeWidth="2" />
              <circle cx="32" cy="40" r="2" fill="white" stroke="#333333" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">Elegant Spaces</h3>
          <p className="text-slate-600">
            Versatile settings for both small gatherings and large events.
          </p>
        </div>
      </div>
    </div>
  );
}