import { getCartItems } from "@/Redux/cartSlice"
import {  ShoppingCart } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


function CartIcon() {
    const {cart }=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getCartItems())


    },[])
   
  return (
    <div className="fixed bottom-20 right-5 z-50 ">
        <Link to={"/cart"}  className=" reletive flex justify-center items-center rounded-full cursor-pointer w-16 h-16" >
            <ShoppingCart  className="w-12 h-12 " />
            <p className="absolute text-white text-bold top-2 right-2 bg-red-700 px-1 text-sm rounded-full " > {cart.items?.length} </p> 
        </Link>
      
    </div>
  )
}

export default CartIcon
