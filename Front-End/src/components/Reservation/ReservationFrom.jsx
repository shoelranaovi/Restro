import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "@/Redux/ReservationSlice";

import LoadingBtn from "../Layout/Loader/LoadingBtn";
import LoginRequiredModal from "../Layout/Loader/LoginRequired";
import { toast } from "sonner";

const RestaurantReservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    numberOfGuests: "",
    date: "",
    time: "",
    message: "",
    status: "pending",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {isLoading} = useSelector((state)=>state.reservation)
  const {isAuthenticate} = useSelector((state)=>state.auth)
  const[isloggedIn,setIsLoggedIn]=useState(true)
  console.log(isloggedIn)
  


  const dispatch = useDispatch();



  // Guest options (1-12 people)
  const guestOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate time slots from 8:00 AM to 10:00 PM (30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";

      if (hour < 22) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      } else {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Validation functions
  const validateName = (name) => {
    if (!name?.trim()) return "Name is required";
    if (name?.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s-']+$/.test(name))
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required";
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, "")))
      return "Please enter a valid phone number";
    return "";
  };

  const validateEmail = (email) => {
    if (!email?.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateGuests = (guests) => {
    if (!guests) return "Number of guests is required";
    const guestCount = parseInt(guests);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 12)
      return "Please select 1-12 guests";
    return "";
  };

  const validateDate = (date) => {
    if (!date) return "Date is required";
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) return "Please select a future date";

    // Check if date is more than 3 months in advance
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (selectedDate > maxDate)
      return "Reservations are only available up to 3 months in advance";

    return "";
  };

  const validateTime = (time) => {
    if (!time) return "Time is required";
    const [hours] = time.split(":").map(Number);
    if (hours < 8 || hours > 22)
      return "Reservations are available from 8:00 AM to 10:00 PM";
    return "";
  };

  // Real-time validation on change
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "numberOfGuests":
        error = validateGuests(value);
        break;
      case "date":
        error = validateDate(value);
        break;
      case "time":
        error = validateTime(value);
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Check if form is valid
  useEffect(() => {
    const requiredFields = [
      "name",
      "phone",
      "email",
      "numberOfGuests",
      "date",
      "time",
    ];
    const hasAllFields = requiredFields.every(
      (field) => formData[field]?.trim() !== ""
    );
    const hasNoErrors = Object.values(errors).every((error) => error === "");
    console.log(hasAllFields, hasNoErrors);

    setIsFormValid(hasAllFields && hasNoErrors);
  }, [formData, errors]);

  const handleSubmit = async () => {
    setIsLoggedIn(true)
    // Final validation before submit
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== "message") {
        // message is optional
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    
    if(!isAuthenticate){
    setIsLoggedIn(false)
    toast.error("You must be logged in to make a reservation.");
     return 
    }

    dispatch(addReservation(formData))
      .unwrap()
      .then((data) => {
        console.log(data);
        if (data.success) {
          setShowModal(true);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error adding Reservation ");
      });

    // Simulate API call
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      numberOfGuests: "",
      date: "",
      time: "",
      message: "",
    });
    setErrors({});
  };

  const formatDisplayTime = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour12 =
      hours > 12 ? hours - 12 : hours === "00" ? 12 : parseInt(hours);
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <>
      <div className="bg-stone-50 min-h-screen w-full">
      {!isloggedIn && <LoginRequiredModal value={true} /> }
      
        {/* Header Image */}
        <div className="w-full max-w-4xl mx-auto pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
            <img
              src="https://thumbs.dreamstime.com/b/lot-delicious-food-table-buffet-feast-delicious-food-table-141632833.jpg"
              alt="Table with delicious food spread"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          {/* Form Section */}
          <div className="pb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-3 sm:mb-4 text-stone-800">
              Reserve Your Table
            </h1>
            <p className="text-stone-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Make your dining experience seamless by reserving your table at
              Rasoi Reverie. Whether it's an intimate dinner, a celebration, or
              a casual outing, we're ready to make it unforgettable.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* Name Input */}
                <div className="relative">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 z-10" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-stone-300 focus:ring-orange-500"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left absolute">
                      {errors.name}
                    </p>
                  )}
                  {errors.name && <div className="h-5 sm:h-6"></div>}
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 z-10" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+60-123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-stone-300 focus:ring-orange-500"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left absolute">
                      {errors.phone}
                    </p>
                  )}
                  {errors.phone && <div className="h-5 sm:h-6"></div>}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 z-10" />
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-stone-300 focus:ring-orange-500"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left absolute">
                      {errors.email}
                    </p>
                  )}
                  {errors.email && <div className="h-5 sm:h-6"></div>}
                </div>

                {/* Number of Guests Select */}
                <div className="relative">
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 z-10" />
                    <select
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 transition duration-200 appearance-none cursor-pointer ${
                        errors.numberOfGuests
                          ? "border-red-500 focus:ring-red-500"
                          : "border-stone-300 focus:ring-orange-500"
                      }`}
                    >
                      <option value="">Number of Guests</option>
                      {guestOptions.map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.numberOfGuests && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left absolute">
                      {errors.guests}
                    </p>
                  )}
                  {errors.numberOfGuests && <div className="h-5 sm:h-6"></div>}
                </div>

                {/* Date Input */}
                <div className="relative">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 z-10" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 transition duration-200 cursor-pointer ${
                        errors.date
                          ? "border-red-500 focus:ring-red-500"
                          : "border-stone-300 focus:ring-orange-500"
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left absolute">
                      {errors.date}
                    </p>
                  )}
                  {errors.date && <div className="h-5 sm:h-6"></div>}
                </div>

                {/* Time Select */}
                <div className="relative">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 z-10" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 transition duration-200 appearance-none cursor-pointer ${
                        errors.time
                          ? "border-red-500 focus:ring-red-500"
                          : "border-stone-300 focus:ring-orange-500"
                      }`}
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {formatDisplayTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left absolute">
                      {errors.time}
                    </p>
                  )}
                  {errors.time && <div className="h-5 sm:h-6"></div>}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="relative mb-6">
                <div className="flex items-start">
                  <MessageSquare className="absolute left-3 top-4 text-stone-400 w-5 h-5 z-10" />
                  <textarea
                    name="message"
                    placeholder="Special requests or dietary requirements (optional)"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 sm:py-4 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 h-24 sm:h-32 resize-none"
                    maxLength="500"
                  ></textarea>
                </div>
                <p className="text-xs text-stone-500 mt-1 text-right">
                  {formData.message.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className={`w-full font-medium py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 ease-in-out transform text-sm sm:text-base ${
                  isFormValid && !isLoading
                    ? "bg-orange-500 hover:bg-amber-600 text-white hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    : "bg-stone-300 text-stone-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                
                    <LoadingBtn />
                
                  </span>
                ) : (
                  "Make a Reservation"
                )}
              </button>

              <p className="text-xs sm:text-sm text-stone-500 mt-4">
                Reservations are available from 8:00 AM to 10:00 PM daily. For
                parties larger than 12, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Reservation Confirmed!
              </h3>
              <p className="text-amber-100 text-sm sm:text-base">
                Thank you for choosing Restro
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-3 mb-6 text-sm sm:text-base">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-600">Name:</span>
                  <span className="font-medium text-stone-800">
                    {formData.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-600">Date:</span>
                  <span className="font-medium text-stone-800">
                    {new Date(formData.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-600">Time:</span>
                  <span className="font-medium text-stone-800">
                    {formatDisplayTime(formData.time)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-600">Guests:</span>
                  <span className="font-medium text-stone-800">
                    {formData.numberOfGuests}{" "}
                    {formData.numberOfGuests === "1" ? "Guest" : "Guests"}
                  </span>
                </div>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm mb-6 bg-stone-50 p-3 rounded-lg">
                We'll send a confirmation email to{" "}
                <strong>{formData.email}</strong> shortly. Please arrive 15
                minutes early for your reservation.
              </p>

              <button
                onClick={closeModal}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantReservation;
