import React from 'react';

const RestaurantMenu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Crispy Calamari",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: "110 $",
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/cooked-squid-rings-and-shrimp-on-a-plate-top-view.webp"
    },
    {
      id: 2,
      name: "Mushroom Risotto",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: "120 $",
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/risotto-with-mushrooms-in-a-plate.webp"
    },
    {
      id: 3,
      name: "Lobster Thermidor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: "150 $",
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/cooked-fresh-lobster-red-lobster-dinner-seafood.webp"
    }
  ];

  return (
    <div className="max-w-4xl z-10 mx-auto px-4 py-8 bg-white">
      {/* Reservations Section */}
      <div data-aos="fade-right" className="bg-green-50 p-8 mb-12 text-center rounded-lg">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Reservations</h1>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Menu Header */}
      <div data-aos="fade-left" className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <span className="text-yellow-500 mr-2">----</span>
          <span className="text-green-600 font-medium">Our Menu</span>
          <span className="text-yellow-500 ml-2">----</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif mb-4">Menu Of Our Restaurant</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>

      {/* Menu Items */}
      <div className="space-y-6">
        {menuItems.map((item) => (
          <div data-aos="zoom-in-down" key={item.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="flex items-center">
                  <div className="border-b border-dotted border-gray-300 w-12 md:w-24"></div>
                  <span className="ml-2 font-medium">{item.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;