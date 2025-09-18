import React, { useEffect, useState } from 'react';
import { User, MapPin, Phone, Mail, Edit3, Calendar, ShoppingBag, FileText, Settings, ChevronRight, Star, Clock, CheckCircle, XCircle, Eye, EyeOff, X, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersReservations } from '@/Redux/ReservationSlice';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Fotter';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Order from './Order';
import Reservation from './Reservation';
import Report from './Report';
import Setting from './Setting';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

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

  // const reservations = [
  //   { id: '001', date: '2024-07-10', time: '7:00 PM', guests: 4, table: 'Table 12', status: 'Confirmed' },
  //   { id: '002', date: '2024-07-08', time: '6:30 PM', guests: 2, table: 'Table 5', status: 'Completed' },
  //   { id: '003', date: '2024-07-15', time: '8:00 PM', guests: 6, table: 'Table 8', status: 'Pending' }
  // ];



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



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      
       <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Sidebar userInfo={userInfo} activeTab={activeTab} setActiveTab={setActiveTab}/>
         

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Profile setUserInfo={setUserInfo}  userInfo={userInfo} />
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <Order getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} orders={orders} />
                
              )}

              {/* Reservations Tab */}
              {activeTab === 'reservations' && (
                <Reservation getStatusColor={getStatusColor} getStatusIcon={getStatusIcon}/>
                
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <Report getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
             
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <Setting setShowChangePasswordModal={setShowChangePasswordModal} setShowDeleteAccountModal={setShowDeleteAccountModal} /> 
                
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md  animate-in fade-in zoom-in duration-300">
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