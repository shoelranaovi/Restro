import React from 'react';
import { Link } from 'react-router-dom';

const FoodBlog = () => {
  const articles = [
    {
      id: 1,
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/young-happy-waiter-working-in-a-cafe.webp",
      category: "Menu",
      title: "Kid-Friendly Menu Options Everyone Will Love",
      date: "December 25, 2024",
      alt: "Server holding a tray in a restaurant"
    },
    {
      id: 2,
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-employees-receiving.webp",
      category: "Kitchen",
      title: "A Day in the Life of Our Kitchen Team",
      date: "December 25, 2024",
      alt: "Restaurant kitchen team standing together"
    },
    {
      id: 3,
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-employees-receiving.webp",
      category: "Menu",
      title: "Exploring Global Flavors on Our Menu",
      date: "December 25, 2024",
      alt: "Elegant table setting with covered dishes"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div data-aos="fade-right" className="flex justify-between items-center mb-4">
        <div>
          <p className="text-green-600 font-medium">---- Food for Thought ----</p>
          <h1 className="text-xl md:3xl font-bold text-gray-800 mt-2">Inspiration, Recipes, and Stories.</h1>
        </div>
        <Link to={"/"} className="text-green-600 hover:underline flex items-center">
          See More 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {/* Articles Grid */}
      <div data-aos="fade-left"  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="rounded-lg overflow-hidden shadow-md bg-white flex flex-col">
            {/* Article Image Container */}
            <div className="relative h-64">
              <img 
                src={article.image} 
                alt={article.alt}
                className="w-full h-full object-cover"
              />
              {/* Category Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-white px-6 py-2 rounded font-medium text-green-600">
                  {article.category}
                </span>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              
              <div className="flex items-center mt-auto pt-3">
                <div className="flex items-center text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                  <span className="text-sm">{article.date}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <a 
                  href="#" 
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span>Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodBlog;