import React, { useState } from 'react';
import { AlertCircle, Camera, Send, Star, Clock, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    issueType: '',
    priority: 'medium',
    subject: '',
    description: '',
    orderNumber: '',
    contactMethod: 'email',
    email: '',
    phone: '',
    rating: 0
  });
  
  const [attachedImages, setAttachedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const issueTypes = [
    { id: 'food-quality', label: 'Food Quality', icon: '🍽️' },
    { id: 'service', label: 'Service Issue', icon: '👥' },
    { id: 'delivery', label: 'Delivery Problem', icon: '🚚' },
    { id: 'billing', label: 'Billing/Payment', icon: '💳' },
    { id: 'hygiene', label: 'Hygiene Concern', icon: '🧼' },
    { id: 'app-technical', label: 'App Technical Issue', icon: '📱' },
    { id: 'other', label: 'Other', icon: '❓' }
  ];

  const priorityLevels = [
    { id: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'high', label: 'High', color: 'bg-red-100 text-red-800 border-red-200' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: event.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setAttachedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Issue Reported Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for bringing this to our attention. We'll review your report and get back to you within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Reference ID:</strong> #REP{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                issueType: '',
                priority: 'medium',
                subject: '',
                description: '',
                orderNumber: '',
                contactMethod: 'email',
                email: '',
                phone: '',
                rating: 0
              });
              setAttachedImages([]);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Report an Issue</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're sorry to hear about your experience. Help us make it right by sharing the details below.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Issue Type Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What type of issue are you experiencing?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {issueTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, issueType: type.id }))}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.issueType === type.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Level */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">Priority Level</label>
              <div className="flex flex-wrap gap-3">
                {priorityLevels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: level.id }))}
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 hover:shadow-md ${
                      formData.priority === level.id
                        ? level.color + ' shadow-lg transform scale-105'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Number */}
            <div className="mb-8">
              <label htmlFor="orderNumber" className="block text-lg font-semibold text-gray-900 mb-2">
                Order Number (Optional)
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                placeholder="e.g., ORD123456"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg"
              />
            </div>

            {/* Subject */}
            <div className="mb-8">
              <label htmlFor="subject" className="block text-lg font-semibold text-gray-900 mb-2">
                Issue Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Brief description of the issue"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg"
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Please provide as much detail as possible about what happened..."
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Attach Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Click to upload images or drag and drop</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-blue-700 transition-colors duration-300"
                >
                  Choose Files
                </label>
              </div>
              
              {/* Attached Images */}
              {attachedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {attachedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Rate your overall experience
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-all duration-300 hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredStar || formData.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            {/* Contact Method */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Preferred Contact Method
              </label>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'email' }))}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.contactMethod === 'email'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'phone' }))}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.contactMethod === 'phone'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Phone</span>
                </button>
              </div>
            </div>

            {/* Email/Phone Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !formData.issueType || !formData.subject || !formData.description || !formData.email}
              className={`inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isSubmitting || !formData.issueType || !formData.subject || !formData.description || !formData.email
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Response Time</span>
            </div>
            <p className="text-gray-600">
              We typically respond to reports within <strong>24 hours</strong>. 
              For urgent issues, please call our customer service hotline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}