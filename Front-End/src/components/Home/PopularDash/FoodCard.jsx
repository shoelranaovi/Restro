import { addToCart } from '@/Redux/cartSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const FoodCard = ({ images, name, price, rating,_id }) => {
  const fullStars = Math.floor(rating); // eg: 4 for 4.5 or 4.9
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75; // eg: true for 4.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // total 5 stars
  const {cart}=useSelector((state)=>state.cart)
  

  const alreadyInCart = cart?.items?.some((item) => item.product._id === _id);

  const dispatch=useDispatch()

  const addToCarthandler=async()=>{
    const formData={
      productId:_id
    }
    const data = await dispatch(addToCart(formData));

    console.log(data);

    if (data.payload?.success) {
      toast.success("Add to cart successfully")
    } else {
      toast.error("Fetch error! get cart ");
    }
  };

  
  

  return (
    <div data-aos="zoom-in" className="border border-orange-400 rounded-md p-4 text-center bg-[#f8f6f3] w-full ">
      <img src={images[0].url} alt={name} className="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>

      <div className="flex w-full justify-between items-center">
        <div className="flex items-center space-x-1 mb-2 text-orange-500">
          {[...Array(fullStars)].map((_, i) => (
            <span className="text-xl" key={`full-${i}`}>★</span>
          ))}
          {hasHalfStar && <span className="text-xl text-orange-400">⯪</span> /* You can replace with better icon */}
          {[...Array(emptyStars)].map((_, i) => (
            <span className="text-xl text-gray-300" key={`empty-${i}`}>★</span>
          ))}
        </div>

        <div className="text-gray-800 font-medium mb-4">
          <span className="text-orange-600 font-bold text-lg">$</span> {price}
        </div>
      </div>

      {
        alreadyInCart ?  <Link to={"/cart"} className="border w-full border-green-700 text-green-700 px-4 py-2 rounded-md button-hover-orange hover:border-transparent hover:text-white transition flex items-center justify-center gap-2">
       Go to cart <span>→</span>
      </Link> :
      <button onClick={addToCarthandler} className="border w-full border-green-700 text-green-700 px-4 py-2 rounded-md button-hover-orange hover:border-transparent hover:text-white transition flex items-center justify-center gap-2">
      Add To Cart <span>→</span>
    </button> 
      }
    </div>
  );
};

export default FoodCard;
