import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  DollarSign,
  Package,
  Star,
  AlertCircle,
  Check,
  Plus,
  Calendar,
  Percent,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProductAdmin } from "@/Redux/ProductSlice";
import { toast } from "react-toastify";

const UpdateProductModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: {
      percentage: 0,
      isActive: false,
      startDate: "",
      endDate: "",
    },
    cost: "",
    stock: "",
    status: "Active",
    images: [],
    rating: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: {
          percentage: product.discount?.percentage,
          isActive: product.discount?.isActive,
          startDate: product.discount?.startDate?.split("T")[0],
          endDate: product.discount?.endDate?.split("T")[0],
        },
        cost: product.cost,
        stock: product.stock,
        status: product.status,

        rating: product.rating,
      });
    }
  }, [product]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {isLoading}=useSelector((state)=>state.product)



  const categories = [
    'Soups & Salads',
    'Entrees', 
    'Pasta & Risottos',
    'Seafood Specialties',
    'Desserts',
    'Kids',
    'special'
  ];

  const statusOptions = [
    { value: "Active", label: "Active", color: "text-green-600" },
    { value: "Inactive", label: "Inactive", color: "text-gray-600" },
    { value: "Out of Stock", label: "Out of Stock", color: "text-red-600" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Product name cannot exceed 100 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (
      formData.originalPrice &&
      (isNaN(formData.originalPrice) || parseFloat(formData.originalPrice) < 0)
    ) {
      newErrors.originalPrice = "Original price must be a positive number";
    }

    if (!formData.cost) {
      newErrors.cost = "Cost is required";
    } else if (isNaN(formData.cost) || parseFloat(formData.cost) < 0) {
      newErrors.cost = "Cost must be a positive number";
    }

    if (
      formData.stock &&
      (isNaN(formData.stock) || parseInt(formData.stock) < 0)
    ) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    if (
      formData.rating &&
      (isNaN(formData.rating) ||
        parseFloat(formData.rating) < 0 ||
        parseFloat(formData.rating) > 5)
    ) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    // Discount validation
    if (formData.discount.isActive) {
      if (
        formData.discount.percentage < 0 ||
        formData.discount.percentage > 100
      ) {
        newErrors.discount = "Discount percentage must be between 0 and 100";
      }
      if (formData.discount.startDate && formData.discount.endDate) {
        if (
          new Date(formData.discount.startDate) >=
          new Date(formData.discount.endDate)
        ) {
          newErrors.discount = "End date must be after start date";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("discount.")) {
      const discountField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        discount: {
          ...prev.discount,
          [discountField]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name] || errors.discount) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        discount: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(updateProductAdmin({ formData, ProductId: product._id }))
        .unwrap()
        .then((data) => {
          console.log(data);
          if (data.success) {
            toast.success("Product update added successfully!");
            handleReset();
            onClose();
          } else {
            toast.error("Failed to add product");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error adding product");
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      originalPrice: "",
      discount: {
        percentage: 0,
        isActive: false,
        startDate: "",
        endDate: "",
      },
      cost: "",
      stock: "",
      status: "Active",
      images: [],
      rating: 0,
    });
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const profitMargin =
    formData.price && formData.cost
      ? (
          ((parseFloat(formData.price) - parseFloat(formData.cost)) /
            parseFloat(formData.price)) *
          100
        ).toFixed(2)
      : 0;

  const effectivePrice =
    formData.discount.isActive && formData.discount.percentage > 0
      ? (
          parseFloat(formData.price || 0) *
          (1 - formData.discount.percentage / 100)
        ).toFixed(2)
      : formData.price;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <p className="text-blue-100 text-sm">
                Create a new menu item for your restaurant
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="Enter product name"
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.name.length}/100 characters
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.category
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock and Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.stock
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="0"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.stock}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Initial Rating
                    </label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="5"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.rating
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                        placeholder="0.0"
                      />
                    </div>
                    {errors.rating && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.rating}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle Column - Pricing & Discount */}
              <div className="space-y-6">
                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.price
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Original Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.originalPrice
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.originalPrice && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.originalPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cost *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.cost
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.cost && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cost}
                    </p>
                  )}
                </div>

                {/* Discount Section */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Discount Settings
                    </h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="discount.isActive"
                        checked={formData.discount.isActive}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        Enable Discount
                      </span>
                    </label>
                  </div>

                  {formData.discount.isActive && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Discount Percentage
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            name="discount.percentage"
                            value={formData.discount.percentage}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                          </label>
                          <input
                            type="date"
                            name="discount.startDate"
                            value={formData.discount.startDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                          </label>
                          <input
                            type="date"
                            name="discount.endDate"
                            value={formData.discount.endDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.discount && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.discount}
                    </p>
                  )}
                </div>

                {/* Profit Margin Display */}
                {formData.price && formData.cost && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">
                        Profit Margin
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {profitMargin}%
                      </span>
                    </div>
                    {formData.discount.isActive &&
                      formData.discount.percentage > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-700">
                            Effective Price:
                          </span>
                          <span className="font-medium text-green-600">
                            ${effectivePrice}
                          </span>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                }`}
                placeholder="Describe your product..."
                maxLength={500}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/500 characters
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">* Required fields</div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>{isLoading ? "Adding..." : "Add Product"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
