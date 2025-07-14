import React from 'react';

const RestaurantUI = () => {
  // Image data arrays
  const staffImages = [
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-employees-receiving-guests.webp",
      alt: "Restaurant staff standing at bar"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/the-owner-of-a-cozy-establishment-kindly.webp",
      alt: "Chef opening restaurant door"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/welcome-how-can-i-be-at-your-service-today.webp",
      alt: "Waiter serving customers"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/we-serve-the-best-cakes.webp",
      alt: "Server with food tray"
    }
  ];

  const foodImages = [
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-counter-with-different-lunch-menu.webp",
      alt: "Plated gourmet dish"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/kenyan-food-meals-dishes-cuisines-dinner-supperyum.webp",
      alt: "Food spread on wooden table"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/kenyan-food-meals-dishes-cuisines-dinner-supperyum.webp",
      alt: "Family dinner table with various dishes"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/in-this-captivating-aerial-view-delicious-food.webp",
      alt: "Sushi and Asian cuisine"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-serif">
      {/* Headline Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-xl lg:text-3xl font-bold text-gray-800 mb-4">
          See the Flavors, Feel the Experience
        </h1>
        <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the vibrant flavors, ambiance, and unforgettable moments that make
          Rasoi Reverie the perfect destination for every dining experience.
        </p>
      </div>

      {/* Image Gallery - Staff */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {staffImages.map((image, index) => (
          <div data-aos="zoom-in" key={`staff-${index}`} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Image Gallery - Food */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {foodImages.map((image, index) => (
          <div data-aos="zoom-in-up"key={`food-${index}`} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantUI;