const { body, validationResult } = require('express-validator');
const logger = require('../confiq/logger');
const sendResponse = require('../utils/response/sendResponse');


// Validate reservation data
const validateReservation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[0-9\s-]{10,15}$/).withMessage('Please enter a valid phone number'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('numberOfGuests')
    .isInt({ min: 1, max: 20 }).withMessage('Number of guests must be between 1 and 20'),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .isDate().withMessage('Please enter a valid date')
    .custom(value => {
      const reservationDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (reservationDate < today) {
        throw new Error('Reservation date cannot be in the past');
      }
      return true;
    }),
  
  body('time')
    .notEmpty().withMessage('Time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Please enter a valid time format (HH:MM)')
    .custom((value) => {
      // Restaurant hours from 11:00 to 22:00
      const [hours, minutes] = value.split(':').map(Number);
      const time = hours * 60 + minutes;
      if (time < 11 * 60 || time > 22 * 60) {
        throw new Error('Reservations are only available between 11:00 and 22:00');
      }
      return true;
    }),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Message cannot be more than 500 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      return sendResponse(res,400,"",null,errors.array() )
      
      // return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateReservation
};
