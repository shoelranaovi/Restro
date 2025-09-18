import { User,  Calendar, ShoppingBag, FileText, Settings, Star, ChevronRight, } from 'lucide-react';

function Sidebar({userInfo,activeTab,setActiveTab}) {
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
  )
}

export default Sidebar