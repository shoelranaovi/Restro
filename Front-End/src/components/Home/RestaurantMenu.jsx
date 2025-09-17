import { categoryProduct } from '@/Redux/ProductSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import LoadingComponent from '../Layout/LoadingComponent';

const RestaurantMenu = () => {
  const menuItems = [
    {
      name: 'Crispy Calamari',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: '110 $',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/cooked-squid-rings-and-shrimp-on-a-plate-top-view.webp'
    },
    {
      name: 'Mushroom Risotto',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: '120 $',
      image: "https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/risotto-with-mushrooms-in-a-plate.webp"
    },
    {
      name: 'Lobster Thermidor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: '150 $',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/cooked-fresh-lobster-red-lobster-dinner-seafood.webp'
    },
    {
      name: 'Classic Mojito',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: '125 $',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/wooden-tray-under-a-platter-of-cooked-pasta.webp'
    },
    {
      name: 'Signature Lemonade',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: '210 $',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/fresh-cocktail-of-lime-mint-rum.webp'
    },
    {
      name: 'Tiramisu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: '160 $',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/sweet-puff-tart-with-meringue-cream.webp'
    }
  ];


  const {isLoading}=useSelector((state)=>state.product) 
  const [foodItems,setfoodItems]=useState([])

  const dispatch=useDispatch()

  

  useEffect(() => {
    const fetchPopularProducts = async () => {
      const data = await dispatch(categoryProduct());

      console.log(data);

      if (data.payload?.success) {
        setfoodItems(data.payload.data.dishes)
      }
    };

    fetchPopularProducts();
  }, [dispatch]);



  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div data-aos="fade-left" className="text-center mb-6">
        <p className="text-green-600 font-medium">
          <span className="mr-2 text-orange-600">----</span>
          Our Menu
          <span className="ml-2 text-orange-600">----</span>
        </p>
        <h1 className="text-3xl font-serif mt-2">Menu Of Our Restaurant</h1>
        <p className="mt-4 text-gray-700 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>


      {
        isLoading ? <div className=''>  <LoadingComponent /> </div> : foodItems && foodItems.length >0 &&<><div  className="space-y-4">
        {foodItems.map((item, index) => (
          <div key={index}>
            <div data-aos="zoom-in" className="flex items-start py-3 shadow-xl">
              <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="ml-4 flex- flex-grow">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="flex pr-4 items-center">
                    <div className="w-24 md:w-32  border-b border-dotted border-gray-400 mx-2" />
                    <span className="text-right"><span className='text-orange-600'>$</span> {item.price}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
            {index < menuItems.length - 1 && (
              <div className="border-b border-gray-200" />
            )}
          </div>
        ))}
      </div> </>
      }




      
    </div>
  );
};

export default RestaurantMenu;