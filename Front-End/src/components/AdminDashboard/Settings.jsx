import React, { useState } from 'react';
import { Settings, Users, Bell, Shield, Palette, Globe, CreditCard, Clock, MapPin, Phone, Mail, Save, Eye, EyeOff, Store } from 'lucide-react';

export default function RestaurantSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      restaurantName: 'Bella Vista Restaurant',
      email: 'admin@bellavista.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Downtown, NY 10001',
      description: 'Authentic Italian cuisine with a modern twist',
      website: 'https://bellavista.com',
      timezone: 'America/New_York'
    },
    hours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false }
    },
    notifications: {
      newOrders: true,
      lowInventory: true,
      staffSchedule: false,
      customerReviews: true,
      promotions: false
    },
    payments: {
      acceptCash: true,
      acceptCards: true,
      acceptDigital: true,
      taxRate: '8.25',
      serviceCharge: '18'
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'hours', label: 'Hours', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    // Simulate save operation
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
          <input
            type="text"
            value={settings.general.restaurantName}
            onChange={(e) => handleInputChange('general', 'restaurantName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.general.email}
            onChange={(e) => handleInputChange('general', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={settings.general.phone}
            onChange={(e) => handleInputChange('general', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={settings.general.website}
            onChange={(e) => handleInputChange('general', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          type="text"
          value={settings.general.address}
          onChange={(e) => handleInputChange('general', 'address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={settings.general.description}
          onChange={(e) => handleInputChange('general', 'description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
        <select
          value={settings.general.timezone}
          onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
        </select>
      </div>
    </div>
  );

  const renderHoursSettings = () => (
    <div className="space-y-4">
      {Object.entries(settings.hours).map(([day, hours]) => (
        <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-24">
            <span className="font-medium text-gray-700 capitalize">{day}</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={!hours.closed}
              onChange={(e) => handleHoursChange(day, 'closed', !e.target.checked)}
              className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">Open</span>
          </div>
          {!hours.closed && (
            <>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Open</label>
                <input
                  type="time"
                  value={hours.open}
                  onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Close</label>
                <input
                  type="time"
                  value={hours.close}
                  onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p className="text-sm text-gray-500">
              {key === 'newOrders' && 'Get notified when new orders are placed'}
              {key === 'lowInventory' && 'Alerts when inventory is running low'}
              {key === 'staffSchedule' && 'Notifications about staff scheduling'}
              {key === 'customerReviews' && 'New customer reviews and feedback'}
              {key === 'promotions' && 'Marketing and promotional updates'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Methods</h3>
        <div className="space-y-3">
          {Object.entries({
            acceptCash: 'Cash Payments',
            acceptCards: 'Credit/Debit Cards',
            acceptDigital: 'Digital Payments (Apple Pay, Google Pay)'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{label}</span>
              <input
                type="checkbox"
                checked={settings.payments[key]}
                onChange={(e) => handleInputChange('payments', key, e.target.checked)}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={settings.payments.taxRate}
            onChange={(e) => handleInputChange('payments', 'taxRate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Service Charge (%)</label>
          <input
            type="number"
            step="0.01"
            value={settings.payments.serviceCharge}
            onChange={(e) => handleInputChange('payments', 'serviceCharge', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-700">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.twoFactor}
            onChange={(e) => handleInputChange('security', 'twoFactor', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
        <select
          value={settings.security.sessionTimeout}
          onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={settings.security.currentPassword}
                onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={settings.security.newPassword}
              onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={settings.security.confirmPassword}
              onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'hours': return renderHoursSettings();
      case 'notifications': return renderNotificationSettings();
      case 'payments': return renderPaymentSettings();
      case 'security': return renderSecuritySettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Settings</h1>
              <p className="text-gray-600">Manage your restaurant configuration and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab} Settings
                </h2>
                <p className="text-gray-600">
                  {activeTab === 'general' && 'Configure basic restaurant information and details'}
                  {activeTab === 'hours' && 'Set your restaurant operating hours'}
                  {activeTab === 'notifications' && 'Manage notification preferences'}
                  {activeTab === 'payments' && 'Configure payment methods and rates'}
                  {activeTab === 'security' && 'Security settings and password management'}
                </p>
              </div>

              {renderTabContent()}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}