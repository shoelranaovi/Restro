

function Setting({setShowDeleteAccountModal,setShowChangePasswordModal}) {
  return (<div className="p-8">
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
  )
}

export default Setting