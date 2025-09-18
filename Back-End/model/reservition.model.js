const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    match: [/^\+?[0-9\s-]{10,15}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please enter a valid email'
    ],
    lowercase: true
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Please add number of guests'],
    min: [1, 'Must have at least 1 guest'],
    max: [20, 'Cannot exceed 20 guests']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  time: {
    type: String,
    required: [true, 'Please add a time'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  createBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to prevent duplicate reservations
reservationSchema.index({ date: 1, time: 1, email: 1 }, { unique: true });

const Reservation=  mongoose.model('Reservation', reservationSchema);
module.exports =Reservation