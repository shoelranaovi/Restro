

const AboutUs = () => {
  return (
    <div data-aos="zoom-in" className="bg-green-100 min-h-screen w-full flex justify-center  p-4">
      <div className="max-w-4xl w-full py-6">
        {/* About Us Header Section */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
        </div>

        {/* Food Dish Display Section */}
        <div className="relative">
          {/* Center Main Dish */}
          <div className="flex justify-center">
            <div className="relative z-10">
              <img 
                src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/buddha-bowl-dish-tomatoes-chickpeas-quinoa-chicken.webp" 
                alt="Main dish with various healthy foods" 
                className="rounded-full border-4 border-white shadow-lg w-64 h-64 md:w-80 md:h-80 object-cover"
              />
            </div>
          </div>

          {/* Dotted Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-dotted border-gray-400"></div>
          </div>

          {/* Small Dish Top Left */}
          <div className="absolute top-0 left-0 md:left-16 transform -translate-y-1/4">
            <img 
              src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/Classic-Margherita-Pizza-2.webp" 
              alt="Small dish with fruits" 
              className="rounded-full border-2 border-white shadow-md w-16 h-16 md:w-24 md:h-24 object-cover"
            />
            <div className="absolute w-16 h-px bg-gray-300 top-1/2 left-full"></div>
          </div>

          {/* Small Dish Bottom Left */}
          <div className="absolute bottom-0 left-0 md:left-24 transform translate-y-1/4">
            <img 
              src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/food-Image-1-1.webp" 
              alt="Small dish with grilled food" 
              className="rounded-full border-2 border-white shadow-md w-16 h-16 md:w-24 md:h-24 object-cover"
            />
            <div className="absolute w-16 h-px bg-gray-300 top-1/2 left-full"></div>
          </div>

          {/* Small Dish Top Right */}
          <div className="absolute top-0 right-0 md:right-16 transform -translate-y-1/4">
            <img 
              src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/food-Image-2.webp" 
              alt="Small dish with beans" 
              className="rounded-full border-2 border-white shadow-md w-16 h-16 md:w-24 md:h-24 object-cover"
            />
            <div className="absolute w-16 h-px bg-gray-300 top-1/2 right-full"></div>
          </div>

          {/* Small Dish Bottom Right */}
          <div className="absolute bottom-0 right-0 md:right-24 transform translate-y-1/4">
            <img 
              src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/Seafood-Paella-3.webp" 
              alt="Small dish with seafood" 
              className="rounded-full border-2 border-white shadow-md w-16 h-16 md:w-24 md:h-24 object-cover"
            />
            <div className="absolute w-16 h-px bg-gray-300 top-1/2 right-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;