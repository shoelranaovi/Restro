import React, { useState } from 'react';

const RestaurantMenu = () => {
  const [activeTab, setActiveTab] = useState('Soups & Salads');
  
  // Menu data structure with all categories and their items
  const menuData = {
    'Soups & Salads': {
      image: 'https://th.bing.com/th/id/R.23bd7fe27c21491912f0e843adf29fa0?rik=rUaRIu2veSRCWA&pid=ImgRaw&r=0',
      items: [
        {
          name: 'Tomato Basil Soup',
          description: 'Rich and creamy tomato soup with a hint of basil.',
          price: '9.95'
        },
        {
          name: 'Classic Caesar Salad',
          description: 'Crisp romaine, Parmesan, and croutons tossed in Caesar dressing.',
          price: '12.50'
        },
        {
          name: 'Greek Salad',
          description: 'Mixed greens with feta, olives, cucumbers, and a tangy vinaigrette.',
          price: '11.95'
        },
        {
          name: 'Chef\'s Special Soup',
          description: 'A daily creation crafted with seasonal ingredients.',
          price: '10.50'
        }
      ]
    },
    'Entrees': {
      image: 'https://th.bing.com/th/id/OIP.x1EfN0ZGyXx2xzxmZ9l3HgHaE8?w=276&h=184&c=7&r=0&o=5&pid=1.7',
      items: [
        {
          name: 'Grilled Ribeye Steak',
          description: 'Prime cut ribeye grilled to perfection with herb butter and roasted vegetables.',
          price: '34.95'
        },
        {
          name: 'Herb Roasted Chicken',
          description: 'Free-range chicken marinated in herbs, slow-roasted with seasonal vegetables.',
          price: '24.50'
        },
        {
          name: 'Rack of Lamb',
          description: 'New Zealand lamb with a rosemary crust, served with mint sauce and potato purée.',
          price: '38.95'
        },
        {
          name: 'Vegetable Wellington',
          description: 'Seasonal vegetables and mushroom duxelles wrapped in puff pastry.',
          price: '26.50'
        }
      ]
    },
    'Pasta & Risottos': {
      image: 'https://www.thedailymeal.com/img/gallery/cook-pasta-risotto-style-for-the-creamiest-result/l-intro-1699469320.jpg',
      items: [
        {
          name: 'Wild Mushroom Risotto',
          description: 'Arborio rice slowly cooked with wild mushrooms and truffle oil.',
          price: '21.95'
        },
        {
          name: 'Fettuccine Alfredo',
          description: 'Handmade pasta tossed in a creamy Parmesan sauce.',
          price: '18.50'
        },
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian meat sauce simmered for hours and served over al dente pasta.',
          price: '19.95'
        },
        {
          name: 'Seafood Linguine',
          description: 'Linguine pasta with shrimp, scallops, and mussels in a white wine sauce.',
          price: '26.50'
        }
      ]
    },
    'Seafood Specialties': {
      image: 'https://th.bing.com/th/id/OIP.yGY3DpKCF6IA6BTtZbj31gHaE8?rs=1&pid=ImgDetMain',
      items: [
        {
          name: 'Grilled Atlantic Salmon',
          description: 'Fresh salmon fillet with lemon-dill sauce and seasonal vegetables.',
          price: '27.95'
        },
        {
          name: 'Seared Sea Scallops',
          description: 'Jumbo scallops seared golden brown, served with saffron risotto.',
          price: '32.50'
        },
        {
          name: 'Lobster Tail',
          description: 'Broiled Maine lobster tail served with drawn butter and lemon.',
          price: '42.95'
        },
        {
          name: 'Fish of the Day',
          description: 'Fresh catch prepared according to chef\'s inspiration.',
          price: '29.95'
        }
      ]
    },
    'Desserts': {
      image: 'https://th.bing.com/th/id/OIP.Ex-TnW2hqjaVImbHG4-N7wHaE8?rs=1&pid=ImgDetMain',
      items: [
        {
          name: 'Tiramisu',
          description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.',
          price: '9.95'
        },
        {
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
          price: '10.50'
        },
        {
          name: 'Crème Brûlée',
          description: 'Rich vanilla custard topped with a layer of caramelized sugar.',
          price: '9.50'
        },
        {
          name: 'Seasonal Fruit Tart',
          description: 'Buttery pastry filled with pastry cream and topped with seasonal fruits.',
          price: '8.95'
        }
      ]
    },
    'Kids\' Menu': {
      image: 'https://th.bing.com/th/id/R.260b0fc3014dc26e26d8877b41f4db27?rik=qdsuOCULIZ%2f0Lw&pid=ImgRaw&r=0',
      items: [
        {
          name: 'Mini Cheeseburger',
          description: 'Small beef patty with cheese on a bun, served with fries.',
          price: '8.95'
        },
        {
          name: 'Chicken Tenders',
          description: 'Crispy breaded chicken strips with honey mustard dipping sauce.',
          price: '7.50'
        },
        {
          name: 'Mac & Cheese',
          description: 'Creamy macaroni and cheese made with three different cheeses.',
          price: '6.95'
        },
        {
          name: 'Spaghetti & Meatballs',
          description: 'Kid-sized portion of spaghetti with mini meatballs and tomato sauce.',
          price: '7.95'
        }
      ]
    }
  };
  
  // Extract menu categories for navigation
  const menuCategories = Object.keys(menuData);
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto bg-gray-100 min-h-screen">
      {/* Top Banner Section */}
      <div data-aos="fade-down" className="bg-green-50 p-8 text-center rounded-b-lg shadow-sm w-full">
        <h1 className="text-4xl font-serif text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Culinary excellence with fresh, locally-sourced ingredients
        </p>
      </div>
      
      {/* Menu Introduction */}
      <div data-aos="fade-up" className="text-center py-10 px-4">
        <h2 className="text-3xl font-serif text-gray-800 mb-4">Explore Our Menu</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Indulge in a culinary journey where every dish is crafted with passion, fresh ingredients, and authentic flavors. From appetizers to desserts, our menu is designed to tantalize your taste buds.
        </p>
      </div>
      
      {/* Menu Navigation Tabs */}
      <div data-aos="fade-left" className="flex flex-wrap justify-center gap-4 px-4 pb-6">
        {menuCategories.map((category) => (
          <button
            key={category}
            className={`whitespace-nowrap px-6 py-3 text-sm rounded-md font-medium transition-all ${
              activeTab === category 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Menu Items Section - Dynamically rendered based on active tab */}
      <div data-aos="fade-right" className="mt-4 p-4 w-full max-w-5xl">
        {menuData[activeTab] && (
          <div className="bg-green-50 rounded-lg overflow-hidden shadow-md">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="md:w-2/5">
                <img 
                  src={menuData[activeTab].image}
                  alt={`${activeTab} dishes`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right side - Menu items */}
              <div className="md:w-3/5 p-6">
                <h3 className="text-2xl font-serif text-gray-800 mb-6 border-b border-gray-200 pb-2">{activeTab}</h3>
                {menuData[activeTab].items.map((item, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-serif text-gray-800">{item.name}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2 hidden sm:inline">···········</span>
                        <span className="text-green-600 font-medium">${item.price}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action Section */}
      <div data-aos="fade-left" className="text-center py-12 px-4">
        <h3 className="text-2xl font-serif text-gray-800 mb-4">Ready to Experience Our Cuisine?</h3>
        <p className="text-gray-600 mb-6">Make a reservation today and enjoy our chef's special creations.</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-md transition-colors">
          Reserve a Table
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;