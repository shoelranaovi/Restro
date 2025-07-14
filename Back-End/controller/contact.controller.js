const Contact = require("../model/Contact.model");
const ErrorResponse = require("../utils/ErrorResponse");
const sendResponse = require("../utils/response/sendResponse");


// Create new contact message
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return sendResponse(res, 400, "All required fields must be provided");
    }

    const newContact = new Contact({
      name,
      email,
      phone: phone || '',
      subject,
      message
    });

    await newContact.save();

    return sendResponse(res, 201, "Contact message sent successfully", newContact);
  } catch (error) {
    console.error("Error creating contact:", error.message);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, errors.join(', '));
    }
    return next(new ErrorResponse("Internal server error", 500));
  }
}

// Get all contact messages (Admin only)
const getAllContacts = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .populate('repliedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Contact.countDocuments(filter);

    const pagination = {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalContacts: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    };

    return sendResponse(res, 200, "Contacts retrieved successfully", {
      contacts,
      pagination
    });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get single contact by ID (Admin only)
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return sendResponse(res, 400, "Contact ID is required");
    }

    const contact = await Contact.findById(contactId)
      .populate('repliedBy', 'name email')
      .lean();

    if (!contact) {
      return sendResponse(res, 404, "Contact message not found");
    }

    return sendResponse(res, 200, "Contact retrieved successfully", contact);
  } catch (error) {
    console.error("Error fetching contact:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Reply to contact message (Admin only)
const replyToContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { reply } = req.body;
    const adminId = req.userId; // Assuming admin ID comes from auth middleware

    if (!contactId) {
      return sendResponse(res, 400, "Contact ID is required");
    }

    if (!reply || reply.trim() === '') {
      return sendResponse(res, 400, "Reply message is required");
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return sendResponse(res, 404, "Contact message not found");
    }

    contact.reply = reply.trim();
    contact.status = 'replied';
    contact.repliedBy = adminId;
    contact.repliedAt = new Date();

    await contact.save();

    // Populate the replied contact
    const populatedContact = await Contact.findById(contactId)
      .populate('repliedBy', 'name email')
      .lean();

    return sendResponse(res, 200, "Reply sent successfully", populatedContact);
  } catch (error) {
    console.error("Error replying to contact:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Update contact status (Admin only)
const updateContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { status, priority } = req.body;

    if (!contactId) {
      return sendResponse(res, 400, "Contact ID is required");
    }

    // Validate status
    if (status && !['pending', 'replied', 'resolved'].includes(status)) {
      return sendResponse(res, 400, "Invalid status. Must be 'pending', 'replied', or 'resolved'");
    }

    // Validate priority
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return sendResponse(res, 400, "Invalid priority. Must be 'low', 'medium', or 'high'");
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return sendResponse(res, 404, "Contact message not found");
    }

    if (status) contact.status = status;
    if (priority) contact.priority = priority;

    await contact.save();

    const populatedContact = await Contact.findById(contactId)
      .populate('repliedBy', 'name email')
      .lean();

    return sendResponse(res, 200, "Contact updated successfully", populatedContact);
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Delete contact message (Admin only)
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return sendResponse(res, 400, "Contact ID is required");
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return sendResponse(res, 404, "Contact message not found");
    }

    const deletedContact = await Contact.findByIdAndDelete(contactId);

    return sendResponse(res, 200, "Contact message deleted successfully", deletedContact);
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get contact statistics (Admin only)
const getContactStats = async (req, res, next) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: 'pending' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });
    const resolvedContacts = await Contact.countDocuments({ status: 'resolved' });

    // Get contacts by priority
    const highPriority = await Contact.countDocuments({ priority: 'high' });
    const mediumPriority = await Contact.countDocuments({ priority: 'medium' });
    const lowPriority = await Contact.countDocuments({ priority: 'low' });

    const stats = {
      total: totalContacts,
      byStatus: {
        pending: pendingContacts,
        replied: repliedContacts,
        resolved: resolvedContacts
      },
      byPriority: {
        high: highPriority,
        medium: mediumPriority,
        low: lowPriority
      }
    };

    return sendResponse(res, 200, "Contact statistics retrieved successfully", stats);
  } catch (error) {
    console.error("Error fetching contact stats:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  replyToContact,
  updateContactStatus,
  deleteContact,
  getContactStats
};