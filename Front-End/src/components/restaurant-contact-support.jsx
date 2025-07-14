import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, User, Star, ChefHat, Utensils, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      description: 'Available 24/7 for urgent matters',
      action: 'Call Now',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      info: 'Chat with our team',
      description: 'Average response time: 2 minutes',
      action: 'Start Chat',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@restaurant.com',
      description: 'We respond within 1 hour',
      action: 'Send Email',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const supportCategories = [
    { id: 'order', label: 'Order Issues', icon: Utensils },
    { id: 'payment', label: 'Payment & Billing', icon: Star },
    { id: 'delivery', label: 'Delivery Support', icon: MapPin },
    { id: 'menu', label: 'Menu Questions', icon: ChefHat },
    { id: 'account', label: 'Account Help', icon: User },
    { id: 'other', label: 'Other', icon: MessageCircle }
  ];

  const faqItems = [
    {
      question: "How can I track my order?",
      answer: "You can track your order in real-time through our app. Go to 'My Orders' and select your current order to see live updates."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer full refunds for orders cancelled within 5 minutes of placement, or if there's an issue with your order quality."
    },
    {
      question: "How do I modify my order?",
      answer: "Orders can be modified within 3 minutes of placement. Contact our support team or use the 'Modify Order' button in the app."
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Yes! We have detailed allergen information for all menu items and offer various dietary options including vegan, gluten-free, and keto."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              We're Here to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Help
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Get instant support for orders, payments, delivery, and everything else. 
              Our team is available 24/7 to make your dining experience perfect.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200">
            {[
              { id: 'contact', label: 'Contact Us' },
              { id: 'faq', label: 'FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'contact' && (
          <>
            {/* Quick Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{method.title}</h3>
                      <p className="text-slate-600 font-medium mb-2">{method.info}</p>
                      <p className="text-slate-500 text-sm mb-6">{method.description}</p>
                      <button className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${method.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3`}>
                        {method.action}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                  <p className="text-slate-300">We'll get back to you within the hour</p>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-slate-700 font-semibold text-sm">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50 focus:bg-white"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-700 font-semibold text-sm">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50 focus:bg-white"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Priority Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-slate-700 font-semibold text-sm">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50 focus:bg-white"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-700 font-semibold text-sm">Priority Level</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50 focus:bg-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label className="text-slate-700 font-semibold text-sm">Support Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {supportCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => setFormData({...formData, category: category.id})}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 text-sm font-medium ${
                              formData.category === category.id
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                            {category.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-slate-700 font-semibold text-sm">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50 focus:bg-white"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-slate-700 font-semibold text-sm">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50 focus:bg-white resize-none"
                      placeholder="Please provide detailed information about your issue..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Restaurant Location</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
                        <p className="text-slate-600">123 Gourmet Street<br />Foodie District, FD 12345</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Business Hours</h4>
                        <div className="text-slate-600 space-y-1">
                          <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                          <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                          <p>Sunday: 12:00 PM - 9:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="mb-6 opacity-90">
                    For urgent order issues or emergency support, call our 24/7 hotline.
                  </p>
                  <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all duration-300 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Emergency Line
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-600">Find quick answers to common questions</p>
            </div>
            
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-slate-600 mb-6">Can't find what you're looking for?</p>
              <button 
                onClick={() => setActiveTab('contact')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}