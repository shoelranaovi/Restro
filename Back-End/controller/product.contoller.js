const Product = require("../model/product.model");
const { validationResult } = require('express-validator');
const sendResponse = require("../utils/response/sendResponse");
const sharp = require("sharp");
const cloudinary = require("../confiq/claudinary");
const ErrorResponse = require("../utils/ErrorResponse");


// // // Get all products with filtering and pagination
// exports.getProducts = async (req, res) => {
//     try {
//       const {
//         page = 1,
//         limit = 10,
//         category,
//         isVegetarian,
//         isVegan,
//         isGlutenFree,
//         isAvailable = true,
//         minPrice,
//         maxPrice,
//         search,
//         sortBy = 'createdAt',
//         sortOrder = 'desc'
//       } = req.query;
  
//       // Build filter object
//       const filter = { isAvailable };
      
//       if (category) filter.category = category;
//       if (isVegetarian !== undefined) filter.isVegetarian = isVegetarian === 'true';
//       if (isVegan !== undefined) filter.isVegan = isVegan === 'true';
//       if (isGlutenFree !== undefined) filter.isGlutenFree = isGlutenFree === 'true';
      
//       if (minPrice || maxPrice) {
//         filter.price = {};
//         if (minPrice) filter.price.$gte = parseFloat(minPrice);
//         if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
//       }
      
//       if (search) {
//         filter.$text = { $search: search };
//       }
  
//       // Build sort object
//       const sort = {};
//       sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  
//       const skip = (page - 1) * limit;
      
//       const products = await Product.find(filter)
//         .sort(sort)
//         .skip(skip)
//         .limit(parseInt(limit))
//         .lean();
  
//       const total = await Product.countDocuments(filter);
//       const totalPages = Math.ceil(total / limit);
  
//       res.json({
//         success: true,
//         data: {
//           products,
//           pagination: {
//             current: parseInt(page),
//             total: totalPages,
//             hasNext: page < totalPages,
//             hasPrev: page > 1,
//             totalItems: total
//           }
//         }
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Error fetching products',
//         error: error.message
//       });
//     }
//   };


const getAllProduct = async (req, res, next) => {
  try {
    // Fetch all users with selected fields
    const allUsers = await Product.find({}).lean();

    if (!allUsers || allUsers.length === 0) {
      return sendResponse(res,400,"No users found")
     
    }

 
    return sendResponse(res,200,"Users retrieved successfully",allUsers)
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

  
//   // Get single product by ID
//   exports.getProduct = async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
      
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: 'Product not found'
//         });
//       }
  
//       res.json({
//         success: true,
//         data: product
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Error fetching product',
//         error: error.message
//       });
//     }
//   };
  
  // Create new product
  const createProduct = async (req, res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return sendResponse(res, 400, message, null);
    }

    const files = req.files;
    let uploadedImages = [];
    const uploadedPublicIds = [];
    try {
   
  

   if(files){
    const Images = files["Images"] || [];
  

    for (const image of Images) {
      const optimizedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;

      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: "image",
        folder: "restro_product_image",
      });
      uploadedImages.push({
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      });
      uploadedPublicIds.push(cloudinaryResponse.public_id);
    }
   }

   
  
      req.body.images = uploadedImages;
      req.body.user = req.userId;

  
      const product = new Product(req.body);
      await product.save();
      return sendResponse(res, 200, 'Product created successfully', product);
    } catch (error) {
      console.log(error)
        // 🔹 যদি কোনো সমস্যা হয়, Cloudinary থেকে সব ইমেজ ও ভিডিও মুছে ফেলা হবে
    if (uploadedPublicIds.length > 0) {
      try {
        for (const publicId of uploadedPublicIds) {
          await cloudinary.uploader.destroy(publicId);
        }
        console.log("Media deleted from Cloudinary due to an error.");
      } catch (deleteError) {
        console.log(
          "Failed to delete media from Cloudinary:",
          deleteError.message
        );
      }
    }

    return next(new ErrorResponse(error.message,501))
  }
    }

    const updateProductbyadmin = async (req, res, next) => {
      try {
        const productId = req.params.id;
    
        if (!productId) {
          return next(new ErrorResponse(400, "Product ID is required."));
        }
    
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          req.body,
          { new: true, runValidators: true }
        );
    
        if (!updatedProduct) {
          return next(new ErrorResponse(404, "Product not found."));
        }
    
        return sendResponse(res, 200, "Product updated successfully.", {
          product: updatedProduct,
        });
      } catch (error) {
        console.error("Error updating product:", error.message);
        return next(new ErrorResponse(500, "Internal server error."));
      }
    };
    
  

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)

  try {
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      
      return next(new ErrorResponse(401,"Invalid user ID format"))
    }

    // Check if the user exists
    const ProductToDelete = await Product.findById(id);
    if (!ProductToDelete) {
    
      return next(new ErrorResponse(401,"Product not found"))
    }
    if (ProductToDelete.images?.length > 0) {
      // Delete previous images from Cloudinary
      for (const image of ProductToDelete.images || []) {
        await cloudinary.uploader.destroy(image.public_id);
        console.log("image delete");
      }
    }

    // Perform deletion
    await ProductToDelete.deleteOne();

    

    return sendResponse(res,200,"product deleted successfully",{_id:ProductToDelete._id})
  } catch (error) {
    console.error("Error deleting user:", error.message);

    return next(error)
  }
};
const popularDish=async (req, res) => {
  try {
    const {
      limit = 4,
      category,
      minRating = 0,
      sortBy = 'totalSales',
      order = 'desc',
      includeDiscounted = false
    } = req.query;

    // Build query filter
    let filter = {
      status: 'Active',
      isDeleted: false,
      rating: { $gte: parseFloat(minRating) }
    };

    // Add category filter if specified
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Add discount filter if specified
    if (includeDiscounted === 'true') {
      filter['discount.isActive'] = true;
      filter['discount.percentage'] = { $gt: 0 };
    }

    // Define sort options
    const sortOptions = {};
    const validSortFields = ['totalSales', 'rating', 'price', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'totalSales';
    sortOptions[sortField] = order === 'asc' ? 1 : -1;

    // If sorting by totalSales, add rating as secondary sort
    if (sortField === 'totalSales') {
      sortOptions.rating = -1;
    }

    const popularDishes = await Product.find(filter)
      .populate('user', 'name')
      .sort(sortOptions)
      .limit(parseInt(limit))
      .select('-__v -isDeleted')
      .lean();

    // Transform data to include calculated fields
    const transformedDishes = popularDishes.map(dish => {
      // Calculate effective price (with discount if applicable)
      let effectivePrice = dish.price;
      let discountAmount = 0;
      let hasActiveDiscount = false;

      if (dish.discount && dish.discount.isActive && dish.discount.percentage > 0) {
        const now = new Date();
        const discountValid = (!dish.discount.startDate || now >= dish.discount.startDate) &&
                             (!dish.discount.endDate || now <= dish.discount.endDate);
        
        if (discountValid) {
          effectivePrice = Number((dish.price * (1 - dish.discount.percentage / 100)).toFixed(2));
          discountAmount = Number((dish.price * (dish.discount.percentage / 100)).toFixed(2));
          hasActiveDiscount = true;
        }
      }

      return {
        _id: dish._id,
        name: dish.name,
        category: dish.category,
        description: dish.description,
        price: dish.price,
        effectivePrice,
        originalPrice: hasActiveDiscount ? dish.price : null,
        discountAmount,
        discountPercentage: hasActiveDiscount ? dish.discount.percentage : 0,
        hasActiveDiscount,
        images: dish.images,
        rating: dish.rating,
        totalSales: dish.totalSales,
        stock: dish.stock,
        status: dish.status,
        createdAt: dish.createdAt,
        updatedAt: dish.updatedAt
      };
    });

    // Get categories for filtering
    const categories = await Product.distinct('category', {
      status: 'Active',
      isDeleted: false
    });

    res.status(200).json({
      success: true,
      count: transformedDishes.length,
      data: {
        dishes: transformedDishes,
        availableCategories: categories,
        filters: {
          category: category || 'all',
          minRating: parseFloat(minRating),
          sortBy: sortField,
          order,
          includeDiscounted
        }
      }
    });

  } catch (error) {
    console.error('Error fetching popular dishes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch popular dishes',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}


const getCategoryRepresentativeDishes = async (req, res) => {
  try {
    const {
      minRating = 0,
      sortBy = 'totalSales',
      order = 'desc',
      includeDiscounted = false
    } = req.query;

    // Build base filter
    let baseFilter = {
      status: 'Active',
      isDeleted: false,
      rating: { $gte: parseFloat(minRating) }
    };

    // Add discount filter if specified
    if (includeDiscounted === 'true') {
      baseFilter['discount.isActive'] = true;
      baseFilter['discount.percentage'] = { $gt: 0 };
    }

    // Define sort options
    const sortOptions = {};
    const validSortFields = ['totalSales', 'rating', 'price', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'totalSales';
    sortOptions[sortField] = order === 'asc' ? 1 : -1;

    // If sorting by totalSales, add rating as secondary sort
    if (sortField === 'totalSales') {
      sortOptions.rating = -1;
    }

    // Get all unique categories first
    const categories = await Product.distinct('category', baseFilter);

    // Get one representative dish from each category using aggregation
    const categoryDishes = await Product.aggregate([
      {
        $match: baseFilter
      },
      {
        $sort: sortOptions
      },
      {
        $group: {
          _id: '$category',
          dish: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$dish' }
      },
      {
        $lookup: {
          from: 'users', // Assuming your users collection name
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo',
          pipeline: [{ $project: { name: 1 } }]
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$userInfo', 0] }
        }
      },
      {
        $project: {
          __v: 0,
          isDeleted: 0,
          userInfo: 0
        }
      }
    ]);

    // Transform data to include calculated fields (same as your original function)
    const transformedDishes = categoryDishes.map(dish => {
      // Calculate effective price (with discount if applicable)
      let effectivePrice = dish.price;
      let discountAmount = 0;
      let hasActiveDiscount = false;

      if (dish.discount && dish.discount.isActive && dish.discount.percentage > 0) {
        const now = new Date();
        const discountValid = (!dish.discount.startDate || now >= dish.discount.startDate) &&
                             (!dish.discount.endDate || now <= dish.discount.endDate);
                
        if (discountValid) {
          effectivePrice = Number((dish.price * (1 - dish.discount.percentage / 100)).toFixed(2));
          discountAmount = Number((dish.price * (dish.discount.percentage / 100)).toFixed(2));
          hasActiveDiscount = true;
        }
      }

      return {
        _id: dish._id,
        name: dish.name,
        category: dish.category,
        description: dish.description,
        price: dish.price,
        effectivePrice,
        originalPrice: hasActiveDiscount ? dish.price : null,
        discountAmount,
        discountPercentage: hasActiveDiscount ? dish.discount.percentage : 0,
        hasActiveDiscount,
        images: dish.images,
        rating: dish.rating,
        totalSales: dish.totalSales,
        stock: dish.stock,
        status: dish.status,
        user: dish.user,
        createdAt: dish.createdAt,
        updatedAt: dish.updatedAt
      };
    });

    // Sort the final result by category name for consistent ordering
    transformedDishes.sort((a, b) => a.category.localeCompare(b.category));

    res.status(200).json({
      success: true,
      count: transformedDishes.length,
      data: {
        dishes: transformedDishes,
        totalCategories: categories.length,
        categories: categories.sort(),
        filters: {
          minRating: parseFloat(minRating),
          sortBy: sortField,
          order,
          includeDiscounted
        }
      }
    });

  } catch (error) {
    console.error('Error fetching category representative dishes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category representative dishes',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};



  
  // // Update product
  // exports.updateProduct = async (req, res) => {
  //   try {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Validation errors',
  //         errors: errors.array()
  //       });
  //     }
  
  //     const product = await Product.findByIdAndUpdate(
  //       req.params.id,
  //       req.body,
  //       { new: true, runValidators: true }
  //     );
  
  //     if (!product) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Product not found'
  //       });
  //     }
  
  //     res.json({
  //       success: true,
  //       message: 'Product updated successfully',
  //       data: product
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: 'Error updating product',
  //       error: error.message
  //     });
  //   }
  // };
  
  // // Delete product
  // exports.deleteProduct = async (req, res) => {
  //   try {
  //     const product = await Product.findByIdAndDelete(req.params.id);
  
  //     if (!product) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Product not found'
  //       });
  //     }
  
  //     res.json({
  //       success: true,
  //       message: 'Product deleted successfully'
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error deleting product',
  //       error: error.message
  //     });
  //   }
  // };
  
  // Get products by category
  // exports.getProductsByCategory = async (req, res) => {
  //   try {
  //     const { category } = req.params;
  //     const { isAvailable = true } = req.query;
  
  //     const products = await Product.find({
  //       category,
  //       isAvailable
  //     }).sort({ name: 1 });
  
  //     res.json({
  //       success: true,
  //       data: products
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error fetching products by category',
  //       error: error.message
  //     });
  //   }
  // };
  
  // // Toggle product availability
  // exports.toggleAvailability = async (req, res) => {
  //   try {
  //     const product = await Product.findById(req.params.id);
  
  //     if (!product) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Product not found'
  //       });
  //     }
  
  //     product.isAvailable = !product.isAvailable;
  //     await product.save();
  
  //     res.json({
  //       success: true,
  //       message: `Product ${product.isAvailable ? 'enabled' : 'disabled'} successfully`,
  //       data: product
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error toggling product availability',
  //       error: error.message
  //     });
  //   }
  // };
  
  // // Get featured/popular products
  // exports.getFeaturedProducts = async (req, res) => {
  //   try {
  //     const { limit = 6 } = req.query;
  
  //     const products = await Product.find({
  //       isAvailable: true,
  //       'rating.average': { $gte: 4.0 }
  //     })
  //     .sort({ 'rating.average': -1, 'rating.count': -1 })
  //     .limit(parseInt(limit));
  
  //     res.json({
  //       success: true,
  //       data: products
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error fetching featured products',
  //       error: error.message
  //     });
  //   }
  // };
  
  // // Update product rating
  // exports.updateRating = async (req, res) => {
  //   try {
  //     const { rating } = req.body;
      
  //     if (rating < 1 || rating > 5) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Rating must be between 1 and 5'
  //       });
  //     }
  
  //     const product = await Product.findById(req.params.id);
      
  //     if (!product) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Product not found'
  //       });
  //     }
  
  //     // Calculate new average rating
  //     const totalRating = (product.rating.average * product.rating.count) + rating;
  //     product.rating.count += 1;
  //     product.rating.average = totalRating / product.rating.count;
  
  //     await product.save();
  
  //     res.json({
  //       success: true,
  //       message: 'Rating updated successfully',
  //       data: {
  //         average: product.rating.average,
  //         count: product.rating.count
  //       }
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error updating rating',
  //       error: error.message
  //     });
  //   }
  // };
  
  module.exports={createProduct,getAllProduct,deleteProduct,updateProductbyadmin,popularDish,getCategoryRepresentativeDishes}