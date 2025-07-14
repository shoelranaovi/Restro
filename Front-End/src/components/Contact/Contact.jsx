import { addContact } from '@/Redux/contactlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const dispatch=useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    const data=await dispatch(addContact(formData))
    console.log(data)
    if(data.payload.success){
      toast.success("cantact add succesfully")
         // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    }else{
      toast.error("some Thing Went wrong")
    }


 
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      {/* Header Section */}
      <div data-aos="fade-up" className="bg-green-50 rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div data-aos="fade-left" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Call Now Card */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
          <div className="bg-green-600 rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">Call Now</h2>
          <p className="text-gray-600">+88-123-4567</p>
        </div>

        {/* Email Card */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
          <div className="bg-green-600 rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">Email</h2>
          <p className="text-gray-600">support@gmail.com</p>
        </div>

        {/* Address Card */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
          <div className="bg-green-600 rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">Address</h2>
          <p className="text-gray-600">1234 Foodie City, United States</p>
        </div>

        {/* Business Hours Card */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
          <div className="bg-green-600 rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">Business Hours:</h2>
          <p className="text-gray-600">Monday – Friday: 11:00 AM – 10:00 PM</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div data-aos="fade-right" className="rounded-lg overflow-hidden h-full">
          <img 
            src="https://img.freepik.com/premium-photo/man-is-sitting-cafe-having-phone-call_232070-14609.jpg?w=996" 
            alt="Man on phone in cafe" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div data-aos="fade-left" className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
          <p className="text-gray-600 mb-6">
            Use the form below for any inquiries, feedback, or special requests. We'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <input
              type="text"
              name="name"
              placeholder="John-michel"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            {/* Email and Phone Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-md p-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="+88-123-4567"
                className="w-full border border-gray-300 rounded-md p-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Subject Input */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            
            {/* Message Input */}
            <textarea
              name="message"
              placeholder="Write Your Message"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-none"
              value={formData.message}
              onChange={handleChange}
              required
            />
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition duration-300"
            >
              Submit Your Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;