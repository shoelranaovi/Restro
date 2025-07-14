import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function QuotePage() {
  // Form fields array for easier rendering
  const formFields = [
    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your Name', required: true, colSpan: 1 },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Your Email', required: true, colSpan: 1 },
    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Your Phone', required: true, colSpan: 1 },
    { id: 'guests', label: 'Number of Guests', type: 'number', placeholder: 'Guest Count', required: true, colSpan: 1, min: 1 },
    { 
      id: 'date', 
      label: 'Event Date', 
      type: 'date', 
      required: true, 
      colSpan: 1,
      icon: <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
    },
    { 
      id: 'time', 
      label: 'Event Time', 
      type: 'time', 
      required: true, 
      colSpan: 1,
      icon: <Clock className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
    },
    { 
      id: 'occasion', 
      label: 'Event Type/Occasion', 
      type: 'select', 
      required: true, 
      colSpan: 2,
      options: [
        { value: '', label: 'Select an option', disabled: true },
        { value: 'Birthday', label: 'Birthday Celebration' },
        { value: 'Wedding', label: 'Wedding Reception' },
        { value: 'Corporate', label: 'Corporate Event' },
        { value: 'Anniversary', label: 'Anniversary' },
        { value: 'Holiday', label: 'Holiday Party' },
        { value: 'Other', label: 'Other' }
      ]
    },
    { 
      id: 'specialRequests', 
      label: 'Special Requests or Requirements', 
      type: 'textarea', 
      placeholder: 'Tell us about any dietary restrictions, special arrangements, or other requirements',
      rows: 4,
      colSpan: 2
    }
  ];

  // Contact information array
  const contactInfo = [
    { icon: <Phone className="text-amber-500 mt-1 mr-3" size={20} />, title: 'Phone', value: '+123-456-7890' },
    { icon: <Mail className="text-amber-500 mt-1 mr-3" size={20} />, title: 'Email', value: 'info@rasolreverie.com' },
    { icon: <MapPin className="text-amber-500 mt-1 mr-3" size={20} />, title: 'Address', value: '123 Culinary Street, Foodie Town, FT 12345' },
    { icon: <Clock className="text-amber-500 mt-1 mr-3" size={20} />, title: 'Business Hours', values: ['Monday–Friday: 10AM–10PM', 'Saturday–Sunday: 11AM–11PM'] }
  ];

  // Benefits array
  const benefits = [
    'Customized menus tailored to your event',
    'Professional service staff',
    'Elegant presentation and setup',
    'Accommodation for dietary restrictions',
    'Private dining spaces available'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! Your quote request has been submitted.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      occasion: '',
      specialRequests: ''
    });
  };

  return (
    <div className="bg-green-50 py-16">
      {/* Quote Form Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div data-aos="fade-right" className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Request a Quote</h2>
            <p className="text-gray-600 mb-8">
              Please provide the details of your event, and we'll get back to you with a personalized quote within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div key={field.id} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                    <label className="block text-gray-700 mb-2" htmlFor={field.id}>{field.label}</label>
                    
                    {field.type === 'select' ? (
                      <select
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required={field.required}
                      >
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        rows={field.rows}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder={field.placeholder}
                      ></textarea>
                    ) : (
                      <div className={field.icon ? "relative" : ""}>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder={field.placeholder}
                          required={field.required}
                          min={field.min}
                        />
                        {field.icon}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
                  Submit Quote Request
                </button>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div data-aos="fade-left" className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    {item.icon}
                    <div>
                      <p className="font-medium text-gray-700">{item.title}</p>
                      {item.value && <p className="text-gray-600">{item.value}</p>}
                      {item.values && item.values.map((value, i) => (
                        <p key={i} className="text-gray-600">{value}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div data-aos="fade-left" className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us For Your Event</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-amber-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-gray-600">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}