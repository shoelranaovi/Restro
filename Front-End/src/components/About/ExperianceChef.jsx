import { useState, useEffect } from 'react';

export default function ExperianceChef() {
  const staffImages = [
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-employees-receiving-guests.webp",
      alt: "Restaurant staff standing in dining area",
      description: "Our dedicated team ready to serve you"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/the-owner-of-a-cozy-establishment-kindly.webp",
      alt: "Host greeting at the door",
      description: "Warm welcomes from our hosts"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/welcome-how-can-i-be-at-your-service-today.webp",
      alt: "Waiter serving a customer",
      description: "Attentive service is our specialty"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/we-serve-the-best-cakes.webp",
      alt: "Server with dessert",
      description: "Delightful desserts to finish your meal"
    }
  ];

  const foodImages = [
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-counter-with-different-lunch-menu.webp",
      alt: "Plated dishes on counter",
      description: "Chef's specialties ready to be served"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/kenyan-food-meals-dishes-cuisines-dinner-supperyum.webp",
      alt: "Food platters on wooden board",
      description: "Family-style sharing platters"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/in-this-captivating-aerial-view-delicious-food.webp",
      alt: "Table with various dishes",
      description: "Our signature feast spread"
    },
    {
      src: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/chef-preparing-vegetarian-shashlik.webp",
      alt: "Person serving food in bowls",
      description: "Freshly prepared and beautifully plated"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Title */}
      <div data-aos="fade-right" className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          See the Flavors, Feel the Experience
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Explore the vibrant flavors, ambiance, and unforgettable moments that make 
          Rasoi Reverie the perfect destination for every dining experience.
        </p>
      </div>

      {/* Staff Images Section */}
      <section className="mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {staffImages.map((image, index) => (
            <div data-aos="zoom-in-up" key={`staff-${index}`} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Food Images Section */}
      <section>
        <div className="grid grid-cols-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foodImages.map((image, index) => (
            <div data-aos="zoom-in-down" key={`food-${index}`} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}