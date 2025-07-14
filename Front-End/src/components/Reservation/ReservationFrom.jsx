import React, { useState } from 'react';

const RestaurantReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Reservation data:', formData);
    // Here you would typically send this data to a server
    alert('Reservation submitted successfully!');
  };

  return (
    <div className="bg-stone-50 min-h-screen w-full">
      {/* Header Image */}
      <div  data-aos="fade-left" className="w-full max-w-3xl mx-auto pt-6 px-4 sm:px-0">
        <div className="relative rounded-full overflow-hidden mb-6">
          <img 
            src="https://thumbs.dreamstime.com/b/lot-delicious-food-table-buffet-feast-delicious-food-table-141632833.jpg" 
            alt="Table with delicious food spread" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div data-aos="fade-right"className="pb-8 text-center">
          <h1 className="text-3xl font-serif mb-3 text-stone-800">Reserve Your Table</h1>
          <p className="text-stone-600 mb-6 max-w-lg mx-auto">
            Make your dining experience seamless by reserving your table at Rasoi Reverie. Whether it's an
            intimate dinner, a celebration, or a casual outing, we're ready to make it unforgettable.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name Input */}
              <input
                type="text"
                name="name"
                placeholder="John-michel"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                placeholder="+60-123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Number of Guests */}
              <input
                type="number"
                name="guests"
                placeholder="Number of Guests"
                value={formData.guests}
                onChange={handleChange}
                className="p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                min="1"
              />

              {/* Date Input */}
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Time Input */}
              <input
                type="time"
                name="time"
                placeholder="Time"
                value={formData.time}
                onChange={handleChange}
                className="p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Message Textarea */}
            <textarea
              name="message"
              placeholder="Write Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4 h-32"
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-300 ease-in-out"
            >
              Make a Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReservation;