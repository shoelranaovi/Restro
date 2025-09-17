import { categoryProduct } from '@/Redux/ProductSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import LoadingComponent from '../Layout/LoadingComponent';

const RestaurantMenu = () => {


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
    <div className="max-w-3xl mx-auto mt-5 ">
      <div data-aos="fade-left" className="text-center w-full h-full mb-6 pl-4 pb-5">
        <p className="text-green-600 font-medium">
          <span className="mr-2 text-orange-600">----</span>
          Our Menu
          <span className="ml-2 text-orange-600">----</span>
        </p>
        <h1 className="text-4xl font-serif mt-2">Menu Of Our Restaurant</h1>
        <div className="mt-4 text-gray-700 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </div>
      </div>


      {
        isLoading ? <div className=''>  <LoadingComponent /> </div> : foodItems && foodItems.length >0 &&<><div  className=" mt- 10 p-4 space-y-4">
        {foodItems.map((item, index) => (
          <div key={index}>
            <div data-aos="zoom-in" className="flex flex-col md:flex-row items-center py-3 shadow-xl">
              <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="ml-4 bg-slate-100 flex- flex-grow">
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