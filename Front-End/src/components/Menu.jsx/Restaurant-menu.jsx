import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingCart, Star, Plus, ChevronLeft, ChevronRight, Minus, Trash2, ArrowLeft } from 'lucide-react';

const RestaurantMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const itemsPerPage = 8;

  // Sample menu data
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "pizza",
      price: 14.99,
      description: "Fresh tomatoes, mozzarella, basil, olive oil",
      image: "🍕",
      rating: 4.5,
      vegetarian: true
    },
    {
      id: 2,
      name: "Grilled Salmon",
      category: "seafood",
      price: 28.99,
      description: "Atlantic salmon with lemon butter sauce",
      image: "🐟",
      rating: 4.8,
      vegetarian: false
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "salads",
      price: 12.99,
      description: "Romaine lettuce, parmesan, croutons, caesar dressing",
      image: "🥗",
      rating: 4.2,
      vegetarian: true
    },
    {
      id: 4,
      name: "Beef Burger",
      category: "burgers",
      price: 16.99,
      description: "Angus beef patty, cheese, lettuce, tomato, fries",
      image: "🍔",
      rating: 4.6,
      vegetarian: false
    },
    {
      id: 5,
      name: "Chicken Alfredo",
      category: "pasta",
      price: 18.99,
      description: "Fettuccine pasta with grilled chicken in cream sauce",
      image: "🍝",
      rating: 4.4,
      vegetarian: false
    },
    {
      id: 6,
      name: "Chocolate Cake",
      category: "desserts",
      price: 8.99,
      description: "Rich chocolate cake with chocolate frosting",
      image: "🍰",
      rating: 4.7,
      vegetarian: true
    },
    {
      id: 7,
      name: "Pepperoni Pizza",
      category: "pizza",
      price: 16.99,
      description: "Pepperoni, mozzarella cheese, tomato sauce",
      image: "🍕",
      rating: 4.3,
      vegetarian: false
    },
    {
      id: 8,
      name: "Greek Salad",
      category: "salads",
      price: 13.99,
      description: "Mixed greens, feta cheese, olives, tomatoes",
      image: "🥗",
      rating: 4.1,
      vegetarian: true
    },
    {
      id: 9,
      name: "BBQ Ribs",
      category: "mains",
      price: 24.99,
      description: "Slow-cooked ribs with BBQ sauce and coleslaw",
      image: "🥩",
      rating: 4.9,
      vegetarian: false
    },
    {
      id: 10,
      name: "Tiramisu",
      category: "desserts",
      price: 9.99,
      description: "Italian coffee-flavored dessert with mascarpone",
      image: "🍰",
      rating: 4.8,
      vegetarian: true
    }
  ];

  const categories = ['all', 'pizza', 'seafood', 'salads', 'burgers', 'pasta', 'desserts', 'mains'];

  // Filter and sort menu items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination calculations
  const totalItems = filteredAndSortedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(startIndex, endIndex);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showCart ? (
        // Cart Page
        <div>
          {/* Cart Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowCart(false)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft size={20} />
                    <span className="ml-2 hidden sm:inline">Back to Menu</span>
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
                </div>
                <div className="text-sm text-gray-600">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {cart.length === 0 ? (
              // Empty Cart
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some delicious items from our menu!</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              // Cart Items
              <div className="space-y-6">
                {/* Cart Items List */}
                <div className="bg-white rounded-lg shadow-sm">
                  {cart.map((item, index) => (
                    <div key={item.id} className={`p-6 ${index !== cart.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="flex items-center space-x-4">
                        {/* Item Image */}
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {item.image}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 text-sm truncate">{item.description}</p>
                          <div className="flex items-center mt-1">
                            <Star className="text-yellow-400 fill-current" size={14} />
                            <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                            {item.vegetarian && (
                              <>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Veg
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price and Remove */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            ${item.price.toFixed(2)} each
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 p-1 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-900">Order Summary</span>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>$3.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${(getTotalPrice() + 3.99 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium text-lg transition-colors">
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Menu Page
        <div>
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-2xl font-bold text-gray-900">Delicious Bites</h1>
                <div className="relative">
                  <button 
                    onClick={() => setShowCart(true)}
                    className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span className="hidden sm:inline">Cart</span>
                    {getTotalItems() > 0 && (
                      <span className="bg-white text-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                className="lg:hidden flex items-center space-x-2 text-gray-600 mb-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>

              {/* Filters */}
              <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={priceRange[1]}
                      className="w-full"
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  {/* Item Image */}
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-6xl">
                    {item.image}
                  </div>

                  {/* Item Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      {item.vegetarian && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Veg
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      </div>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-sm text-gray-600 capitalize">{item.category}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                      >
                        <Plus size={16} />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No dishes found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline ml-1">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                    // Show first page, last page, current page, and pages around current page
                    const showPage = 
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                        return (
                          <span key={pageNumber} className="px-3 py-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="hidden sm:inline mr-1">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;