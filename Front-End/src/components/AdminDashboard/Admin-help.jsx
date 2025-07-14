import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, Settings, Users, UtensilsCrossed, BarChart3, CreditCard, Calendar, Bell, Shield, Phone, Mail } from 'lucide-react';

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          question: 'How do I log into the admin dashboard?',
          answer: 'Use your restaurant manager credentials provided by your system administrator. If you\'ve forgotten your password, click "Forgot Password" on the login page and follow the email instructions.'
        },
        {
          question: 'What\'s the first thing I should do after logging in?',
          answer: 'Start by reviewing your restaurant profile in Settings > Restaurant Info. Ensure your hours, contact information, and menu categories are up to date. Then check today\'s reservations and current orders.'
        },
        {
          question: 'How do I navigate the dashboard?',
          answer: 'Use the sidebar menu to access different sections. The main dashboard shows today\'s overview, while specific sections like Menu, Orders, and Staff have their own dedicated pages with detailed management tools.'
        }
      ]
    },
    {
      id: 'menu-management',
      title: 'Menu Management',
      icon: <UtensilsCrossed className="w-5 h-5" />,
      items: [
        {
          question: 'How do I add a new menu item?',
          answer: 'Go to Menu > Items and click "Add New Item". Fill in the name, description, price, and category. Upload a high-quality image (recommended 800x600px) and set dietary restrictions if applicable. Click Save to add it to your menu.'
        },
        {
          question: 'How do I update prices for multiple items?',
          answer: 'Use the bulk edit feature in Menu > Items. Select multiple items using checkboxes, then click "Bulk Actions" and choose "Update Prices". You can apply percentage increases or set new fixed prices for selected items.'
        },
        {
          question: 'How do I temporarily disable a menu item?',
          answer: 'In Menu > Items, find the item and toggle the "Available" switch off. This will gray out the item for customers but keep it in your system. To permanently remove it, click the trash icon and confirm deletion.'
        },
        {
          question: 'How do I organize menu categories?',
          answer: 'Go to Menu > Categories to add, edit, or reorder categories. Drag and drop to change the order they appear to customers. Each category can have a description and custom image.'
        }
      ]
    },
    {
      id: 'orders-reservations',
      title: 'Orders & Reservations',
      icon: <Calendar className="w-5 h-5" />,
      items: [
        {
          question: 'How do I view and manage incoming orders?',
          answer: 'The Orders section shows all incoming orders in real-time. New orders appear with a notification sound. Click on any order to view details, update status (Received, Preparing, Ready, Completed), or contact the customer.'
        },
        {
          question: 'How do I handle reservation requests?',
          answer: 'Go to Reservations to see all booking requests. You can approve, decline, or modify reservation times. The calendar view helps you see availability at a glance. Confirmed reservations will show customer contact information.'
        },
        {
          question: 'What do I do if I need to cancel an order?',
          answer: 'Only cancel orders within the first 5 minutes after they\'re placed. Go to the order details, click "Cancel Order", select a reason, and confirm. The customer will be automatically notified and refunded if payment was processed.'
        },
        {
          question: 'How do I set up delivery zones and fees?',
          answer: 'In Settings > Delivery, you can define delivery zones by drawing areas on the map. Set different delivery fees and minimum order amounts for each zone. You can also set delivery time estimates.'
        }
      ]
    },
    {
      id: 'staff-management',
      title: 'Staff Management',
      icon: <Users className="w-5 h-5" />,
      items: [
        {
          question: 'How do I add new staff members?',
          answer: 'Go to Staff > Team Members and click "Add Staff". Enter their details, assign a role (Server, Cook, Manager), and set their access permissions. They\'ll receive login credentials via email.'
        },
        {
          question: 'How do I manage staff schedules?',
          answer: 'Use Staff > Scheduling to create weekly schedules. Drag and drop staff members to time slots, set recurring schedules, and handle shift swaps. Staff can view their schedules through the mobile app.'
        },
        {
          question: 'How do I track staff performance?',
          answer: 'The Staff > Performance section shows individual metrics like order accuracy, customer ratings, and punctuality. Use this data for performance reviews and identifying training needs.'
        }
      ]
    },
    {
      id: 'analytics-reports',
      title: 'Analytics & Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      items: [
        {
          question: 'How do I view sales reports?',
          answer: 'Go to Analytics > Sales to see detailed revenue reports. Filter by date range, menu items, or order types. Export reports as PDF or Excel for accounting purposes. Daily, weekly, and monthly summaries are available.'
        },
        {
          question: 'How do I track popular menu items?',
          answer: 'The Analytics > Menu Performance section shows which items sell best, profit margins, and customer ratings. Use this data to optimize your menu and identify items that may need promotion or removal.'
        },
        {
          question: 'How do I monitor customer feedback?',
          answer: 'Customer reviews and ratings appear in Analytics > Feedback. Respond to reviews directly from the dashboard, track average ratings over time, and identify common complaint themes to address.'
        }
      ]
    },
    {
      id: 'payments-billing',
      title: 'Payments & Billing',
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        {
          question: 'How do I process refunds?',
          answer: 'Go to Orders, find the order requiring a refund, and click "Process Refund". Select full or partial refund, add a reason, and confirm. Refunds typically process within 3-5 business days back to the customer\'s original payment method.'
        },
        {
          question: 'How do I view payment processing fees?',
          answer: 'Check Analytics > Payments for a breakdown of all processing fees. This includes credit card fees, online payment gateway charges, and any third-party delivery platform commissions.'
        },
        {
          question: 'How do I update payment methods accepted?',
          answer: 'In Settings > Payments, you can enable or disable payment methods like credit cards, cash, or digital wallets. Each method can be configured for online orders, in-person dining, or both.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          question: 'Why am I not receiving order notifications?',
          answer: 'Check Settings > Notifications to ensure order alerts are enabled. Verify your browser allows notifications from this site. For mobile notifications, check that the admin app has notification permissions enabled.'
        },
        {
          question: 'What if the dashboard is running slowly?',
          answer: 'Try refreshing your browser and clearing cache. If problems persist, check your internet connection. The dashboard works best with modern browsers like Chrome, Firefox, or Safari. Contact support if issues continue.'
        },
        {
          question: 'How do I recover accidentally deleted items?',
          answer: 'Deleted menu items can be restored within 30 days from Settings > Backup & Recovery. For other deleted data like orders or customer information, contact support immediately as recovery options are limited.'
        },
        {
          question: 'What if I\'m locked out of my account?',
          answer: 'Use the "Forgot Password" feature on the login page. If that doesn\'t work, contact your system administrator or our support team. For security purposes, accounts are temporarily locked after 5 failed login attempts.'
        }
      ]
    }
  ];

  const filteredSections = helpSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard Help Center</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Find answers to common questions about managing your restaurant through the admin dashboard.
          </p>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Phone className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-blue-900 mb-1">Emergency Support</h3>
            <p className="text-blue-700 text-sm mb-2">Critical issues during service hours</p>
            <p className="text-blue-800 font-medium">1-800-REST-HELP</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <Mail className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-900 mb-1">Email Support</h3>
            <p className="text-green-700 text-sm mb-2">Non-urgent questions & feedback</p>
            <p className="text-green-800 font-medium">admin-help@restaurant.com</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <Shield className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-purple-900 mb-1">System Status</h3>
            <p className="text-purple-700 text-sm mb-2">Check for ongoing issues</p>
            <p className="text-purple-800 font-medium">status.restaurant.com</p>
          </div>
        </div>

        {/* Help Sections */}
        <div className="space-y-4">
          {filteredSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">{section.title}</h2>
                  <span className="ml-3 bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                    {section.items.length}
                  </span>
                </div>
                {expandedSections[section.id] ? 
                  <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                }
              </button>
              
              {expandedSections[section.id] && (
                <div className="px-6 pb-4 space-y-4">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                      <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to help you manage your restaurant efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Schedule Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;