const Address = require("../model/Address.model");
const ErrorResponse = require("../utils/ErrorResponse");
const sendResponse = require("../utils/response/sendResponse");


// Get all addresses for a user
const getAddresses = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming user ID comes from auth middleware

    const addresses = await Address.find({ user: userId })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();

    return sendResponse(res, 200, "Addresses retrieved successfully", addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get single address by ID
const getAddressById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    if (!addressId) {
      return sendResponse(res, 400, "Address ID is required");
    }

    const address = await Address.findOne({ _id: addressId, user: userId }).lean();

    if (!address) {
      return sendResponse(res, 404, "Address not found");
    }

    return sendResponse(res, 200, "Address retrieved successfully", address);
  } catch (error) {
    console.error("Error fetching address:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Create new address
const createAddress = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { type, label, street, city, state, zipCode, instructions, isDefault = false } = req.body;


    // Validate required fields
    if (!type  || !street || !city || !state || !zipCode) {
      return sendResponse(res, 400, "All required fields must be provided");
    }

    // Validate type
    if (!['home', 'work', 'other'].includes(type)) {
      return sendResponse(res, 400, "Invalid address type. Must be 'home', 'work', or 'other'");
    }

    // If this is the first address for the user, make it default
    const existingAddresses = await Address.countDocuments({ user: userId });
    const shouldBeDefault = existingAddresses === 0 || isDefault;

    const newAddress = new Address({
      user: userId,
      type,
      label:type,
      street,
      city,
      state,
      zipCode,
      instructions: instructions || '',
      isDefault: shouldBeDefault
    });

    await newAddress.save();

    return sendResponse(res, 201, "Address created successfully", newAddress);
  } catch (error) {
    console.error("Error creating address:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Update address
const updateAddress = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;
    const { type, label, street, city, state, zipCode, instructions, isDefault } = req.body;
 console.log(userId,addressId)
    if (!addressId) {
      return sendResponse(res, 400, "Address ID is required");
    }

    // Validate type if provided
    if (type && !['home', 'work', 'other'].includes(type)) {
      return sendResponse(res, 400, "Invalid address type. Must be 'home', 'work', or 'other'");
    }

    const address = await Address.findOne({ _id: addressId, user: userId });

    if (!address) {
      return sendResponse(res, 404, "Address not found");
    }

    // Update fields if provided
    if (type) address.type = type;
    if (label) address.label = label;
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;
    if (instructions !== undefined) address.instructions = instructions;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await address.save();

    return sendResponse(res, 200, "Address updated successfully", address);
  } catch (error) {
    console.error("Error updating address:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Delete address
const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    if (!addressId) {
      return sendResponse(res, 400, "Address ID is required");
    }

    const address = await Address.findOne({ _id: addressId, user: userId });

    if (!address) {
      return sendResponse(res, 404, "Address not found");
    }

    // If deleting default address, make another address default
    if (address.isDefault) {
      const otherAddress = await Address.findOne({ 
        user: userId, 
        _id: { $ne: addressId } 
      });
      
      if (otherAddress) {
        otherAddress.isDefault = true;
        await otherAddress.save();
      }
    }

 const deleteAddress =await Address.findByIdAndDelete(addressId);

    return sendResponse(res, 200, "Address deleted successfully",deleteAddress);
  } catch (error) {
    console.error("Error deleting address:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Set default address
const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    if (!addressId) {
      return sendResponse(res, 400, "Address ID is required");
    }

    const address = await Address.findOne({ _id: addressId, user: userId });

    if (!address) {
      return sendResponse(res, 404, "Address not found");
    }

    // Set this address as default (pre-save hook will handle unsetting others)
    address.isDefault = true;
    await address.save();

    return sendResponse(res, 200, "Default address set successfully", address);
  } catch (error) {
    console.error("Error setting default address:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get default address
const getDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.userId;

    const defaultAddress = await Address.findOne({ user: userId, isDefault: true }).lean();

    if (!defaultAddress) {
      return sendResponse(res, 404, "No default address found");
    }

    return sendResponse(res, 200, "Default address retrieved successfully", defaultAddress);
  } catch (error) {
    console.error("Error fetching default address:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

module.exports = {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getDefaultAddress
};