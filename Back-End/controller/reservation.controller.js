// controllers/reservationController.js - Reservation Controller
const Reservation = require("../model/reservition.model");
const logger = require("../confiq/logger");
const mongoose = require("mongoose");
const {
  sendBookingConfirmationMail,
} = require("../utils/sendMail/sendMail");
const sendResponse = require("../utils/response/sendResponse");
const User = require("../model/user.model");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Public
const createReservation = async (req, res, next) => {
  try {
    // Extract data from request body
   
    const { name, phone, email, numberOfGuests, date, time, message } =
      req.body;

     

    // Create reservation
    const reservation = await Reservation.create({
      name,
      phone,
      email,
      numberOfGuests,
      date,
      time,
      message,
      createBy:req.userId 
    });

    // Log the activity
    await logger.logActivity("create", {
      reservationId: reservation._id,
      email,
      date,
      time,
      numberOfGuests,
    });

    ///send message

    sendBookingConfirmationMail({
      reservationId:reservation._id,
      table:1,
      username: "email",
      email,
      date,
      time,
      numberOfGuests,
    },res,reservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private (Admin)
const getReservations = async (req, res, next) => {
  try {
    // Extract query parameters for filtering
    const { date, status, email } = req.query;

    // Build filter object
    const filter = {};
    if (date)
      filter.date = { $gte: new Date(date), $lt: new Date(date + "T23:59:59") };
    if (status) filter.status = status;
    if (email) filter.email = email;

    const reservations = await Reservation.find(filter).sort({
      date: 1,
      time: 1,
    });

    // Log the activity
    await logger.logActivity("view", {
      filter,
      count: reservations.length,
    });

    return sendResponse(res,200,"",reservations)

  
  } catch (error) {
    next(error);
  }
};
const getUsersReservations = async (req, res, next) => {
  try {
    // Extract query parameters for filtering


    // Build filter object
 

    const reservations = await Reservation.find({ createBy: req.userId })
  .populate({ path: "createBy", select: "email" });


    // Log the activity
    // await logger.logActivity("view", {
    //   filter,
    //   count: reservations.length,
    // });

    return sendResponse(res,200,"",reservations)

  
  } catch (error) {
    next(error);
  }
};

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private (Admin)
const getReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      
      return sendResponse(res,400,"Invalid reservation ID",null)
    }

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return sendResponse(res,404,"Reservation not found",null)
    }

    // Log the activity
    await logger.logActivity("view", {
      reservationId,
      name: reservation.name,
      email: reservation.email,
    });

    return sendResponse(res,200,"",reservation)

  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private (Admin)
const updateReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      return sendResponse(res,400,"Invalid reservation ID",null)
    }

    let reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return sendResponse(res,404,"Reservation not found",null)
    }

    // Extract data and update
    reservation = await Reservation.findByIdAndUpdate(reservationId, req.body, {
      new: true,
      runValidators: true,
    });

    // Log the activity
    await logger.logActivity("update", {
      reservationId,
      updates: req.body,
    });

    return sendResponse(res,200,"",reservation)
  } catch (error) {
    next(error);
  }
};

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private (Admin)
const deleteReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      return sendResponse(res,400,"Invalid reservation ID",null)
    }

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return sendResponse(res,404,"Reservation not found",null)
    }

    await reservation.deleteOne();

    // Log the activity
    await logger.logActivity("delete", {
      reservationId,
      name: reservation.name,
      email: reservation.email,
      date: reservation.date,
      time: reservation.time,
    });

    return sendResponse(res,200,"",reservation)
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin logs
// @route   GET /api/logs
// @access  Private (Admin)
const getLogs = async (req, res, next) => {
  try {
    const {
      action,
      status,
      startDate,
      endDate,
      limit = 50,
      page = 1,
    } = req.query;

    // Build filter object
    const filter = {};
    if (action) filter.action = action;
    if (status) filter.status = status;

    // Date range filter
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Log.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: logs.length,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getLogs,
  getUsersReservations
};
