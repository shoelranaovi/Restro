/* eslint-disable react/prop-types */
import { addReservation } from "@/Redux/ReservationSlice";
import {
  X,
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AddReservationModal({ setAddModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfGuests: 1,
    status: "pending",
    message: "",
  });
const dispatch=useDispatch()

  const [errors, setErrors] = useState({});

  const validateTime = (time) => {
    if (!time) return false;
    const [hours, minutes] = time.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const minTime = 8 * 60; // 8:00 AM
    const maxTime = 22 * 60; // 10:00 PM
    return timeInMinutes >= minTime && timeInMinutes <= maxTime;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) {
      newErrors.time = "Time is required";
    } else if (!validateTime(formData.time)) {
      newErrors.time = "Please select a time between 8:00 AM and 10:00 PM";
    }
    if (!formData.numberOfGuests || formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = "Number of guests must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };




  const handleSubmit = () => {
    if (validateForm()) {
      //   addReservation(formData)

      console.log(formData)


      dispatch(addReservation(formData))
      .unwrap()
      .then((data) => {
        console.log(data)
        if (data.success) {
          toast.success("Reservation added successfully!");
         
          setAddModal(false)

          setFormData({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            numberOfGuests: 1,
            status: "pending",
            message: "",
          });
          setErrors({});
        } else {
          toast.error("Failed to add product");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error adding product");
      });




    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[100vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Add New Reservation
              </h2>
              <p className="text-blue-100 mt-1">
                Create a new table reservation
              </p>
            </div>
            <button
              onClick={() => setAddModal(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Guest Information
              </h3>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                        errors.name
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-600"
                      }`}
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.name
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      placeholder="Enter guest name"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                        errors.email
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-600"
                      }`}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      placeholder="guest@example.com"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                        errors.phone
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-600"
                      }`}
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Reservation Details
              </h3>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                        errors.date
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-600"
                      }`}
                    />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.date
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      min={new Date().toISOString().split("T")[0]} // 🟢 disables past dates
                      required
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                    <span className="text-xs text-gray-500 ml-2">
                      (8:00 AM - 10:00 PM)
                    </span>
                  </label>
                  <div className="relative">
                    <Clock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                        errors.time
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-600"
                      }`}
                    />
                    <input
                      type="time"
                      min="08:00"
                      max="22:00"
                      value={formData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.time
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      required
                    />
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                        errors.numberOfGuests
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-600"
                      }`}
                    />
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.numberOfGuests}
                      onChange={(e) =>
                        handleInputChange(
                          "numberOfGuests",
                          parseInt(e.target.value)
                        )
                      }
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.numberOfGuests
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      required
                    />
                  </div>
                  {errors.numberOfGuests && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.numberOfGuests}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="pending">🟡 Pending</option>
                    <option value="confirmed">🟢 Confirmed</option>
                    <option value="cancelled">🔴 Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="mt-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Special Requests or Notes
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                placeholder="Any special requests, dietary restrictions, or additional notes..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setAddModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
            >
              Create Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
