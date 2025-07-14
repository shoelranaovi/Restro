import React from "react";

const DiscountCard = ({ title, subtitle, buttonText, bgColor, icon }) => (
  <div className={`rounded-lg  p-6 md:p-8 ${bgColor} w-full md:w-1/2 transition duration-300 hover:shadow-lg flex flex-col justify-between`}>
    <div>
      {icon && <span className="text-gray-700 mb-2 block">{icon}</span>}
      <p className="text-xs md:sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
        {subtitle}
      </p>
      <h2 className="text-xl md:2xl  md:text-3xl font-semibold mb-4 text-gray-900">
        {title}
      </h2>
    </div>
    <button 
      className="bg-orange-500 hover:bg-orange-600 text-white text-xs  font-semibold px-5 py-3 rounded-md shadow-md transition duration-200 ease-in-out inline-flex items-center group w-fit mt-4"
      aria-label={`${buttonText} for ${title}`}
    >
      <span>{buttonText}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  </div>
);

const Discounts = () => {
  const discountOptions = [
    {
      id: "weekday-special",
      title: "Weekday Special Discounts",
      subtitle: "Dine and Save Up to 20%",
      buttonText: "Reserve Your Table",
      bgColor: "bg-green-100 hover:bg-green-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "group-dining",
      title: "Celebrate Together and Save",
      subtitle: "Save 10% on Group Dining",
      buttonText: "Reserve Your Table",
      bgColor: "bg-neutral-200 hover:bg-neutral-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section data-aos="fade-right" aria-labelledby="discounts-heading" className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 id="discounts-heading" className="sr-only">Discount Offers</h1>
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {discountOptions.map((discount) => (
            <DiscountCard
              key={discount.id}
              title={discount.title}
              subtitle={discount.subtitle}
              buttonText={discount.buttonText}
              bgColor={discount.bgColor}
              icon={discount.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discounts;