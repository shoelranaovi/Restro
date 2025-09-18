const express = require('express');
const router = express.Router();
const { 
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getLogs,
  getUsersReservations
} = require('../controller/reservation.controller');
const { validateReservation } = require('../middleware/createBookingValidator');
const verifyUser = require('../middleware/verifyuser');
// /api/reservations
// Public routes
router.post('/', validateReservation,verifyUser, createReservation);

// Admin/protected routes (would typically add auth middleware)
router.get('/', getReservations);
router.get('/getUsersReservations',verifyUser,getUsersReservations );
router.get('/:id', getReservation);
router.put('/:id', validateReservation, updateReservation);
router.delete('/:id', deleteReservation);

// Admin logs routes
router.get('/admin/logs', getLogs);

module.exports = router;