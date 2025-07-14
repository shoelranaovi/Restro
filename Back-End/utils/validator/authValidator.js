const { body } = require('express-validator');

exports.registerValidator = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),

  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),

  body('email')
    .isEmail().withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('phone')
    .matches(/^\d{10,15}$/).withMessage('Phone must be valid and between 10-15 digits'),

  body('role')
    .optional()
    .isIn(['user', 'seller', 'admin']).withMessage('Invalid role')
];

exports.loginValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
];

exports.forgotPasswordValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
];

exports.resetPasswordValidator = [
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.resendEmailValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .trim()
    .escape(),
];

