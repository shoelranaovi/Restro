const { body } = require('express-validator');

const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-\&\'\,\.]+$/)
    .withMessage('Name contains invalid characters'),

  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),

  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number greater than 0')
    .custom(value => {
      // Ensure price has at most 2 decimal places
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        throw new Error('Price must have at most 2 decimal places');
      }
      return true;
    }),

  body('category')
    .isIn(['Soups & Salads', 'Entrees', 'Pasta & Risottos', 'Seafood Specialties', 'Desserts', 'Kids',"special"])
    .withMessage('Category must be one of: appetizer, main, dessert, beverage, special'),


  // Additional validations for other fields
  body('cost')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage('Cost must be a positive number'),

  body('stock')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),

  body('status')
    .optional()
    .isIn(['Active', 'Inactive', 'Discontinued'])
    .withMessage('Status must be Active, Inactive, or Discontinued'),

  body('rating')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5')
];

module.exports = { productValidation };