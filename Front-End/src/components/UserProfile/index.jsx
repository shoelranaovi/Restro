import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Edit3, Calendar, ShoppingBag, FileText, Settings, ChevronRight, Star, Clock, CheckCircle, XCircle, Eye, EyeOff, X, AlertTriangle } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    dateJoined: '2024-01-15'
  });

  const orders = [
    { id: '001', date: '2024-07-05', items: ['Biryani', 'Butter Chicken', 'Naan'], total: '$45.99', status: 'Delivered' },
    { id: '002', date: '2024-07-03', items: ['Dal Makhani', 'Roti', 'Raita'], total: '$28.50', status: 'Delivered' },
    { id: '003', date: '2024-07-01', items: ['Tandoori Chicken', 'Rice', 'Salad'], total: '$35.75', status: 'Processing' }
  ];

  const reservations = [
    { id: '001', date: '2024-07-10', time: '7:00 PM', guests: 4, table: 'Table 12', status: 'Confirmed' },
    { id: '002', date: '2024-07-08', time: '6:30 PM', guests: 2, table: 'Table 5', status: 'Completed' },
    { id: '003', date: '2024-07-15', time: '8:00 PM', guests: 6, table: 'Table 8', status: 'Pending' }
  ];

  const reports = [
    { id: '001', date: '2024-07-02', type: 'Order Issue', description: 'Food was cold when delivered', status: 'Resolved' },
    { id: '002', date: '2024-06-28', type: 'Service Complaint', description: 'Long wait time for reservation', status: 'Under Review' }
  ];

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = () => {
    // Add password validation logic here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // API call to change password would go here
    console.log('Password change requested');
    setShowChangePasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== 'DELETE') {
      alert('Please type "DELETE" to confirm account deletion');
      return;
    }
    // API call to delete account would go here
    console.log('Account deletion requested');
    setShowDeleteAccountModal(false);
    setDeleteConfirmation('');
    alert('Account deletion request submitted. You will receive a confirmation email.');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'confirmed':
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'pending':
      case 'under review':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'confirmed':
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
      case 'pending':
      case 'under review':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-orange-500 text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? 'rotate-90' : ''}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Rasoi Reverie</h1>
              <span className="text-orange-500 text-sm font-medium">Profile Dashboard</span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userInfo.name}</h2>
                <p className="text-gray-600">{userInfo.email}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">Premium Member</span>
                </div>
              </div>

              <div className="space-y-2">
                <TabButton
                  id="profile"
                  label="Profile Info"
                  icon={User}
                  isActive={activeTab === 'profile'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="orders"
                  label="My Orders"
                  icon={ShoppingBag}
                  isActive={activeTab === 'orders'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="reservations"
                  label="Reservations"
                  icon={Calendar}
                  isActive={activeTab === 'reservations'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="reports"
                  label="Reports"
                  icon={FileText}
                  isActive={activeTab === 'reports'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="settings"
                  label="Settings"
                  icon={Settings}
                  isActive={activeTab === 'settings'}
                  onClick={setActiveTab}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={userInfo.dateJoined}
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          value={userInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h3>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
                            <p className="text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </div>
                            <p className="text-lg font-bold text-gray-900 mt-2">{order.total}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reservations Tab */}
              {activeTab === 'reservations' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">My Reservations</h3>
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Reservation #{reservation.id}</h4>
                            <div className="mt-2 space-y-1">
                              <p className="text-gray-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {reservation.date} at {reservation.time}
                              </p>
                              <p className="text-gray-600 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {reservation.guests} guests • {reservation.table}
                              </p>
                            </div>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                            {getStatusIcon(reservation.status)}
                            {reservation.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Reports & Issues</h3>
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{report.type}</h4>
                            <p className="text-gray-600">{report.date}</p>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                            {getStatusIcon(report.status)}
                            {report.status}
                          </div>
                        </div>
                        <p className="text-gray-700">{report.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors">
                      Submit New Report
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 text-orange-500" defaultChecked />
                          <span>Email notifications for orders</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 text-orange-500" defaultChecked />
                          <span>SMS notifications for reservations</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 text-orange-500" />
                          <span>Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 text-orange-500" defaultChecked />
                          <span>Allow order history to be visible</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 text-orange-500" />
                          <span>Share preferences for recommendations</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h4>
                      <div className="space-y-3">
                        <button 
                          onClick={() => setShowChangePasswordModal(true)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Change Password
                        </button>
                        <button 
                          onClick={() => setShowDeleteAccountModal(true)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {passwordData.newPassword && passwordData.confirmPassword && 
               passwordData.newPassword !== passwordData.confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Delete Account</h3>
              </div>
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete your account? This action cannot be undone and will permanently remove:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Your profile information</li>
                  <li>• Order history and preferences</li>
                  <li>• Reservation history</li>
                  <li>• Saved addresses and payment methods</li>
                  <li>• All reports and communications</li>
                </ul>
                <p className="text-sm text-red-600 font-medium">
                  This action is permanent and cannot be reversed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE" to confirm account deletion
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Type DELETE here"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => {
                  setShowDeleteAccountModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage