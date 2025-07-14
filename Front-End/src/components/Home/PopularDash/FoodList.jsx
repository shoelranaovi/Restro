import  { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import LoadingComponent from '@/components/Layout/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularProducts } from '@/Redux/ProductSlice';
import { toast } from 'react-toastify';



const FoodList = () => {
  const dispatch=useDispatch()
  const {isLoading}=useSelector((state)=>state.product) 
  const [foodItems,setfoodItems]=useState([])


  

  useEffect(() => {
    const fetchPopularProducts = async () => {
      const data = await dispatch(getPopularProducts({ limit: 4 }));

      console.log(data);

      if (data.payload?.success) {
        setfoodItems(data.payload.data.dishes)
      } else {
        toast.error("Fetch error!");
      }
    };

    fetchPopularProducts();
  }, [dispatch]);



  return (
    <div className="p-10 w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {
        isLoading ? <div className='w-[100vw]'>  <LoadingComponent /> </div> : foodItems && foodItems.length >0 &&<>{foodItems.map((item) => (
          <FoodCard key={item.id} {...item} />
        ))} </>
      }
     
    </div>
  );
};

export default FoodList;
