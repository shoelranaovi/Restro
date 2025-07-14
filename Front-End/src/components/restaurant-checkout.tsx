import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Smartphone, MapPin, Clock, Star, Plus, Minus, X, Check, ChevronDown, Lock } from 'lucide-react';

export default function RestaurantCheckout() {
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Truffle Risotto",
      description: "Creamy arborio rice with black truffle and parmesan",
      price: 28.99,
      quantity: 2,
      image: "🍚",
      customizations: ["Extra truffle", "No onions"]
    },
    {
      id: 2,
      name: "Grilled Salmon",
      description: "Atlantic salmon with lemon herb butter",
      price: 24.99,
      quantity: 1,
      image: "🐟",
      customizations: ["Medium rare"]
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Crisp romaine with house-made dressing",
      price: 14.99,
      quantity: 1,
      image: "🥗",
      customizations: []
    }
  ]);

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedTip, setSelectedTip] = useState(18);
  const [customTip, setCustomTip] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('asap');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    instructions: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const deliveryFee = 3.99;
  const tipAmount = selectedTip === 'custom' ? parseFloat(customTip) || 0 : (subtotal - discount) * (selectedTip / 100);
  const total = subtotal - discount + tax + deliveryFee + tipAmount;

  const updateQuantity = (id, change) => {
    setOrderItems(items => items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const processOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setOrderPlaced(true);
  };

  const tipOptions = [15, 18, 20, 25];

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-pulse">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your delicious meal will be delivered in 25-35 minutes.</p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="font-semibold">Order #12847</p>
            <p className="text-sm text-gray-500">Track your order in the app</p>
          </div>
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-300">
            Track Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Bella Vista Restaurant
          </h1>
          <p className="text-gray-600">Complete your order</p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">4.9 (2,847 reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-orange-500" />
                Your Order
              </h2>

              {/* Delivery Time */}
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                <select 
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="asap">ASAP (25-35 min)</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-4 relative group hover:shadow-md transition-all duration-300">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-100 rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        {item.customizations.length > 0 && (
                          <div className="text-xs text-orange-600 mb-2">
                            {item.customizations.join(', ')}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={promoApplied}
                  />
                  <button 
                    onClick={applyPromo}
                    disabled={promoApplied}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2 flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    10% discount applied!
                  </p>
                )}
              </div>

              {/* Tip Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Add Tip</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {tipOptions.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setSelectedTip(tip)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        selectedTip === tip
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedTip('custom')}
                  className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedTip === 'custom'
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Custom Amount
                </button>
                {selectedTip === 'custom' && (
                  <input
                    type="number"
                    placeholder="Enter custom tip"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tip</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-orange-500" />
                Delivery Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <input
                type="text"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 mb-4"
              />
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <textarea
                placeholder="Special delivery instructions (optional)"
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 h-24 resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-orange-500" />
                Payment Method
              </h2>
              
              {/* Payment Options */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'card', icon: CreditCard, label: 'Credit Card' },
                  { id: 'digital', icon: Wallet, label: 'Digital Wallet' },
                  { id: 'mobile', icon: Smartphone, label: 'Mobile Pay' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                      selectedPayment === id
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {/* Card Details */}
              {selectedPayment === 'card' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              )}

              {/* Digital Wallet Options */}
              {selectedPayment === 'digital' && (
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span className="text-2xl">🍎</span>
                    <span>Apple Pay</span>
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span className="text-2xl">💳</span>
                    <span>Google Pay</span>
                  </button>
                </div>
              )}

              {/* Mobile Pay Options */}
              {selectedPayment === 'mobile' && (
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span className="text-2xl">📱</span>
                    <span>Venmo</span>
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span className="text-2xl">💰</span>
                    <span>PayPal</span>
                  </button>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <button
              onClick={processOrder}
              disabled={isProcessing || orderItems.length === 0}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-6 rounded-3xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                `Place Order • $${total.toFixed(2)}`
              )}
            </button>

            {/* Security Badge */}
            <div className="text-center text-sm text-gray-500 flex items-center justify-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}