import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, MoreVertical, Package, TrendingUp, TrendingDown, AlertCircle, Check, X } from 'lucide-react';
import AddProductModal from './AddUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantLoader from '@/components/restaurant_loader';
import { allProductAdmin } from '@/Redux/ProductSlice';
import DeleteProductModal from './DeleteModal';
import UpdateProductModal from './UpdateModel';
import LoadingComponent from '@/components/Layout/LoadingComponent';

const ProductTable = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 7;
  const [addProductModal,setAddProductModal]=useState(false)
  const [deletemodal, setDeleteModel] = useState(false);
  const [deleteProductDetail, setDeleteProductDetail] = useState(null);
  const [eiditmodal, setEditModel] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const {isLoading,products:products}=useSelector((state)=>state.product)
  const dispatch=useDispatch()
  console.log(editProductData)


 



  useEffect(() => {
    dispatch(allProductAdmin());
  }, []);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(product => product.id));
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' },
      low_stock: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Low Stock' },
      out_of_stock: { bg: 'bg-red-100', text: 'text-red-800', label: 'Out of Stock' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Profit margin calculation
  const calculateProfitMargin = (price, cost) => {
    return ((price - cost) / price * 100).toFixed(1);
  };

  // Handle view product
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  // Product View Modal Component
  const ProductViewModal = ({ product, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img 
                src={product.images[0].url} 
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-gray-600">{product.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Details */}
              <div className="space-y-6">
                {/* Product Image */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src={product.images[0].url} 
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Pricing Information */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Selling Price</p>
                      <p className="text-2xl font-bold text-green-600">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost Price</p>
                      <p className="text-xl font-semibold text-gray-900">${product.cost}</p>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-blue-200">
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-xl font-bold text-blue-600">
                        {calculateProfitMargin(product.price, product.cost)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ingredients/Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      Popular
                    </span>
                    {product.rating >= 4.5 && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                        Top Rated
                      </span>
                    )}
                    {product.sales > 100 && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        Best Seller
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Analytics & Status */}
              <div className="space-y-6">
                {/* Status & Stock */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Status & Inventory</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <StatusBadge status={product.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Stock</span>
                      <span className={`font-semibold ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock <= 10 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {product.stock} units
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="text-gray-900">{product.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Customer Rating</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-lg">★</span>
                        <span className="font-semibold text-gray-900">{product.rating}</span>
                        <span className="text-gray-500 text-sm">/5.0</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Sales</span>
                      <span className="font-semibold text-gray-900">{product.sales} orders</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Revenue Generated</span>
                      <span className="font-semibold text-green-600">
                        ${(product.sales * product.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Profit Generated</span>
                      <span className="font-semibold text-blue-600">
                        ${(product.sales * (product.price - product.cost)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sales Chart Placeholder */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sales Trend</h3>
                  <div className="h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-purple-200">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-sm text-purple-600">Sales chart visualization</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Package className="w-4 h-4" />
                      Restock
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                      <AlertCircle className="w-4 h-4" />
                      Alert
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product ID:</span>
                      <span className="font-mono text-gray-900">#{product._id.toString().padStart(6, '0')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Order Value:</span>
                      <span className="text-gray-900">${product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion Rate:</span>
                      <span className="text-gray-900">
                        {((product.sales / (product.sales + 50)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit Product
            </button>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
   
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Product Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your restaurant menu items and inventory</p>
          </div>
          <button onClick={()=>setAddProductModal(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="sales">Sales</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Bulk Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto min-h-96">
      {isLoading ? <LoadingComponent />:(
         <table className="w-full">
         <thead className="bg-gray-50">
           <tr>
             <th className="px-6 py-3 text-left">
               <input
                 type="checkbox"
                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                 onChange={handleSelectAll}
               />
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Product
             </th>
             <th 
               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
               onClick={() => handleSort('price')}
             >
               <div className="flex items-center">
                 Price
                 {sortBy === 'price' && (
                   sortOrder === 'asc' ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />
                 )}
               </div>
             </th>
             <th 
               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
               onClick={() => handleSort('stock')}
             >
               <div className="flex items-center">
                 Stock
                 {sortBy === 'stock' && (
                   sortOrder === 'asc' ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />
                 )}
               </div>
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Status
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
               Performance
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
               Profit Margin
             </th>
             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
               Actions
             </th>
           </tr>
         </thead>
         <tbody className="bg-white divide-y divide-gray-200">
           {paginatedProducts.map((product) => (
             <tr key={product.id} className="hover:bg-gray-50 transition-colors">
               <td className="px-6 py-4">
                 <input
                   type="checkbox"
                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                   checked={selectedProducts.includes(product.id)}
                   onChange={() => handleProductSelect(product.id)}
                 />
               </td>
               <td className="px-6 py-4">
                 <div className="flex items-center">
                   <img 
                     className="h-16 w-16 rounded-lg object-cover mr-4" 
                     src={product?.images[0]?.url} 
                     alt={product.name}
                   />
                   <div className='flex flex-col gap-2'>
                     <div className="text-sm font-medium text-gray-900">{product.name}</div>
                     <div className="text-xs text-green bg-green-100 text-center rounded-lg py-0.5  ">{product.category}</div>
                     <div className="text-xs text-gray-400 mt-1 hidden sm:block">{product.description.slice(0,20)+"........"}</div>
                   </div>
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">${product.price}</div>
                 <div className="text-xs text-gray-500">Cost: ${product.cost}</div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="flex items-center">
                   <Package className="w-4 h-4 text-gray-400 mr-1" />
                   <span className={`text-sm font-medium ${
                     product.stock === 0 ? 'text-red-600' : 
                     product.stock <= 10 ? 'text-yellow-600' : 
                     'text-gray-900'
                   }`}>
                     {product.stock}
                   </span>
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <StatusBadge status={product.status} />
               </td>
               <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                 <div className="text-sm text-gray-900">
                   <div className="flex items-center">
                     <span className="text-yellow-400 mr-1">★</span>
                     {product.rating}
                   </div>
                   <div className="text-xs text-gray-500">{product.sales} sales</div>
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                 <div className="text-sm font-medium text-green-600">
                   {calculateProfitMargin(product.price, product.cost)}%
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                 <div className="flex items-center justify-end gap-2">
                   <button 
                     onClick={() => handleViewProduct(product)}
                     className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                   >
                     <Eye className="w-4 h-4" />
                   </button>
                   <button
                    onClick={() => {
                     setEditModel(true);
                     setEditProductData(product);
                   }}
                    className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50">
                     <Edit className="w-4 h-4" />
                   </button>
                   <button onClick={() => {
                             setDeleteModel(true);
                             setDeleteProductDetail(product);
                           }}  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                     <Trash2 className="w-4 h-4" />
                   </button>
                   <button className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50">
                     <MoreVertical className="w-4 h-4" />
                   </button>
                 </div>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
      ) }
       
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm border rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add First Product
          </button>
        </div>
      )}
      
      {/* Product View Modal */}
      <ProductViewModal 
        product={selectedProduct}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
         {deletemodal && (
        <DeleteProductModal
          product={deleteProductDetail}
          onClose={() => {
            setDeleteModel(false);
            setDeleteProductDetail(null);
          }}
        />
      )}
     
        <UpdateProductModal
          product={editProductData}
          isOpen={eiditmodal}
          onClose={() => {
            setEditModel(false);
            setEditProductData(null);
          }}
        />
    


     <AddProductModal
       isOpen={addProductModal}
       onClose={() => setAddProductModal(false)}

      />

    </div>
  );
};

export default ProductTable;