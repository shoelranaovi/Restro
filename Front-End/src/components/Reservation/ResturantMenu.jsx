import { categoryProduct } from '@/Redux/ProductSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../Layout/LoadingComponent';

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
  const {isLoading}=useSelector((state)=>state.product) 
  // const isLoading=true
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
    <div className="max-w-4xl z-10 mx-auto px-4 py-8 bg-white">
      {/* Reservations Section */}
      
      <div data-aos="fade-right" className=" p-8 mb-12 text-center rounded-lg">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Reservations</h1>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
      </div>
      <div  data-aos="fade-left" className="relative rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
            <img
              src="https://img.freepik.com/free-photo/hamburger-table-restaurant_23-2148006676.jpg?t=st=1758190878~exp=1758194478~hmac=8d6abca3526849d739f71aaf3f51f82b1b1878063f71813dbba6f62286531663&w=1060"
              alt="Table with delicious food spread"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
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
      {/* <div className="space-y-6">
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
      </div> */}
       {
        isLoading ? <div className=''>  <LoadingComponent /> </div> : foodItems && foodItems.length >0 &&<><div  className=" mt- 10 p-4 space-y-4">
        {foodItems.slice(0,4).map((item, index) => (
          <div key={index}>
             <div data-aos="zoom-in" className="flex flex-col md:flex-row items-center py-3 shadow-xl">
              <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="ml-4 mt-4 p-1  flex- flex-grow">
                <div className="flex w-full justify-between gap-8 items-baseline">
                  <h3 className="text-lg   font-medium">{item.name}</h3>
                  <div className="flex pr-4    items-center md:items-end ">
                    <div className="w-16  md:w-56  border-b border-dotted border-gray-400 mx-2 my-3" />
                    <div className='flex w-full'>
                    <span className=""><span className='text-orange-600'>$</span> {item.price}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
            {index < foodItems.length - 1 && (
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