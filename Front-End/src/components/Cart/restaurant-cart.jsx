import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  CreditCard,
  Tag,
  AlertCircle,
  ChevronRight,
  Gift,
  Star,
  Heart,
  X,
  Home,
  Building,
  Edit,
  Check,
  MoreVertical,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getCartItems, removeFromCart, updateCartItem } from "@/Redux/cartSlice";
import Address from "./Address";
import { getAllAddress } from "@/Redux/addressSlice";
import { addOrder } from "@/Redux/orderSlice";
import { useNavigate } from "react-router-dom";

// Address Menu Component

const RestaurantCart = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Truffle Mushroom Risotto",
  //     description: "Creamy arborio rice with wild mushrooms and black truffle oil",
  //     price: 28.99,
  //     quantity: 2,
  //     image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop",
  //     category: "Main Course",
  //     dietary: ["Vegetarian", "Gluten-Free"],
  //     customizations: ["Extra truffle oil", "No parmesan"]
  //   },
  //   {
  //     id: 2,
  //     name: "Wagyu Beef Burger",
  //     description: "Premium wagyu patty with aged cheddar, caramelized onions",
  //     price: 34.50,
  //     quantity: 1,
  //     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
  //     category: "Burgers",
  //     dietary: [],
  //     customizations: ["Medium rare", "Extra pickles"]
  //   },
  //   {
  //     id: 3,
  //     name: "Lobster Thermidor",
  //     description: "Fresh Atlantic lobster with cognac cream sauce",
  //     price: 45.99,
  //     quantity: 1,
  //     image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
  //     category: "Seafood",
  //     dietary: ["Gluten-Free"],
  //     customizations: []
  //   }
  // ]);

  const { cart } = useSelector((state) => state.cart);
  const cartItems = cart.items;

  const [appliedPromo, setAppliedPromo] = useState(null);

  const [deliveryTime, setDeliveryTime] = useState("45-60 min");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(0);
  const navigate=useNavigate()

  // const [addresses, setAddresses] = useState([
  //   {
  //     id: 1,
  //     type: "home",
  //     label: "Home",
  //     street: "123 Oak Street, Apt 4B",
  //     city: "San Francisco",
  //     state: "CA",
  //     zipCode: "94102",
  //     instructions: "Ring doorbell twice",
  //   },
  //   {
  //     id: 2,
  //     type: "work",
  //     label: "Work",
  //     street: "456 Market Street, Floor 12",
  //     city: "San Francisco",
  //     state: "CA",
  //     zipCode: "94105",
  //     instructions: "Leave with reception",
  //   },
  // ]);

  const promoCodes = {
    SAVE20: { discount: 0.2, description: "20% off your order" },
    FIRST10: { discount: 0.1, description: "10% off first order" },
    FREESHIP: { discount: 0, description: "Free delivery", freeShipping: true },
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = appliedPromo?.freeShipping ? 0 : 4.99;
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;
  const { address: addresses } = useSelector((state) => state.address);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAddress());
    console.log("hlwq")
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity === 0) {
      removeItem(itemId);
      return;
    }

    const data = await dispatch(updateCartItem({ itemId, quantity }));

    if (data.payload?.success) {
      toast.success("remove from cart");
    } else {
      toast.error("Fetch error!");
    }
  };

  const removeItem = async (itemId) => {
    const data = await dispatch(removeFromCart(itemId));

    if (data.payload?.success) {
      toast.success("remove from cart");
    } else {
      toast.error("Fetch error!");
    }
  };

  const handleCheckOut=async()=>{
    const deleveryAddress=addresses[selectedAddress]._id
    console.log(deleveryAddress)
    console.log(deleveryAddress)
  const formData={
    deliveryAddressId:deleveryAddress,
    paymentMethod:paymentMethod,
  }
  const data = await dispatch(addOrder(formData));
  console.log(data)

  if (data.payload?.success) {
    toast.success("Order added");
    dispatch(getCartItems())
    navigate("/")
  } else {
    toast.error("Fetch error! cart");
  }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-sm text-gray-500">
                  {cartItems.length} items
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Downtown Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full  px-4 py-6">
          <div className=" w-full  flex flex-col lg:flex-row gap-2 ">
            {/* Cart Items */}
            <div className="lg:w-1/2  space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Item Image */}
                      <div className="relative">
                        <img
                          src={item?.product?.images[0]?.url}
                          alt={item.product.name}
                          className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.product.description}
                            </p>

                            {/* Dietary Tags */}
                            {/* {item.dietary.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {item.dietary.map((tag) => (
                                  <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )} */}

                            {/* Customizations */}
                            {/* {item.customizations.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1">Customizations:</p>
                                {item.customizations.map((custom, idx) => (
                                  <span key={idx} className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-1">
                                    {custom}
                                  </span>
                                ))}
                              </div>
                            )} */}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">
                              ${item.price}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                              <Heart className="w-4 h-4 text-gray-400" />
                            </button>
                            <p className="font-bold text-orange-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Items CTA */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <div className="text-center">
                  <Gift className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Want to add more items?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Browse our full menu for more delicious options
                  </p>
                  <button className="bg-white text-orange-600 px-4 py-2 rounded-xl border border-orange-200 hover:bg-orange-50 transition-colors font-medium">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className=" flex-col  items-center md:flex-row  lg:w-1/2 flex justify-between gap-4 ">
              {/* Delivery Address */}

              <Address
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />

              {/* Order Summary */}
              <div className="bg-white w-1/2 rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {appliedPromo && discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span
                      className={
                        appliedPromo?.freeShipping
                          ? "line-through text-gray-400"
                          : ""
                      }
                    >
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="bg-orange-50 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-orange-600 mr-2" />
                      <span className="text-sm font-medium text-orange-800">
                        Delivery Time
                      </span>
                    </div>
                    <span className="text-sm font-bold text-orange-800">
                      {deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-orange-700">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>to {addresses[selectedAddress]?.street}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <p className="font-medium text-gray-900 mb-3">
                    Payment Method
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                {/* Checkout Button */}
                <button onClick={handleCheckOut} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-[1.02] shadow-lg">
                  Proceed to Checkout
                  <ChevronRight className="w-5 h-5 inline ml-2" />
                </button>

                {/* Security Notice */}
                <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Secure checkout with 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center ">
          {" "}
          <p> no cart found go to shoppping page</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantCart;
