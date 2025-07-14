/* eslint-disable react/prop-types */
import { updateReservationAdmin } from '@/Redux/ReservationSlice';
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function EditModal({setEditModal,editModal}) {
  const {open,reservation}=editModal
  const [errors, setErrors] = useState({});
  const dispatch=useDispatch()
  
  useEffect(() => {
    if (reservation) {
      setEditModal(prev => ({
        ...prev,
        reservation: {
          ...reservation,
          date: reservation.date.split("T")[0]  // শুধুমাত্র তারিখ অংশ
        }
      }));
    }
  }, [reservation]);
  
  const validateTime = (time) => {
    if (!time) return false;
    const [hours, minutes] = time.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const minTime = 8 * 60; // 8:00 AM
    const maxTime = 22 * 60; // 10:00 PM
    return timeInMinutes >= minTime && timeInMinutes <= maxTime;
  };

  // Clear specific error when user starts typing
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!reservation.name.trim()) newErrors.name = "Name is required";
    if (!reservation.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(reservation.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!reservation.phone.trim()) newErrors.phone = "Phone is required";
    if (!reservation.date) newErrors.date = "Date is required";
    if (!reservation.time) {
      newErrors.time = "Time is required";
    } else if (!validateTime(reservation.time)) {
      newErrors.time = "Please select a time between 8:00 AM and 10:00 PM";
    }
    if (!reservation.numberOfGuests || reservation.numberOfGuests < 1) {
      newErrors.numberOfGuests = "Number of guests must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(updateReservationAdmin({ reservation, reservationID: reservation._id }))
        .unwrap()
        .then((data) => {
          console.log(data);
          if (data.success) {
            toast.success("Reservation updated successfully!");
            setEditModal({ open: false, reservation: null });
          } else {
            toast.error("Failed to update reservation");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error updating reservation");
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Reservation</h3>
          <button 
            onClick={() => setEditModal({ open: false, reservation: null })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={editModal.reservation.name}
              onChange={(e) => {
                setEditModal(prev => ({
                  ...prev,
                  reservation: { ...prev.reservation, name: e.target.value }
                }));
                clearError('name');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={editModal.reservation.email}
              onChange={(e) => {
                setEditModal(prev => ({
                  ...prev,
                  reservation: { ...prev.reservation, email: e.target.value }
                }));
                clearError('email');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={editModal.reservation.phone}
              onChange={(e) => {
                setEditModal(prev => ({
                  ...prev,
                  reservation: { ...prev.reservation, phone: e.target.value }
                }));
                clearError('phone');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={editModal.reservation.date.split("T")}
              onChange={(e) => {
                setEditModal(prev => ({
                  ...prev,
                  reservation: { ...prev.reservation, date: e.target.value }
                }));
                clearError('date');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          {/* Time Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={editModal.reservation.time}
              onChange={(e) => {
                setEditModal(prev => ({
                  ...prev,
                  reservation: { ...prev.reservation, time: e.target.value }
                }));
                clearError('time');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.time ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
          </div>

          {/* Number of Guests Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input
              type="number"
              min="1"
              max="20"
              value={editModal.reservation.numberOfGuests}
              onChange={(e) => {
                setEditModal(prev => ({
                  ...prev,
                  reservation: { ...prev.reservation, numberOfGuests: parseInt(e.target.value) }
                }));
                clearError('numberOfGuests');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.numberOfGuests && <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests}</p>}
          </div>

          {/* Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={editModal.reservation.status}
              onChange={(e) => setEditModal(prev => ({
                ...prev,
                reservation: { ...prev.reservation, status: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={editModal.reservation.message || ''}
              onChange={(e) => setEditModal(prev => ({
                ...prev,
                reservation: { ...prev.reservation, message: e.target.value }
              }))}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setEditModal({ open: false, reservation: null })}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal