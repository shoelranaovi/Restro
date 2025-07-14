import { X, User, Mail, Phone, Calendar, Users, MessageSquare, Clock } from "lucide-react"

function ViewModal({ setViewModal, viewModal, formatTime, getStatusColor, formatDate }) {
  console.log(viewModal)
  
  return (
    <div className="fixed  inset-0 bg-gradient-to-br from-black/70 to-purple-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className=" h-[90vh] overflow-y-scroll  bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in fade-in zoom-in duration-300">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Reservation Details</h3>
              <p className="text-blue-100 text-sm mt-1">Complete booking information</p>
            </div>
            <button
              onClick={() => setViewModal({ open: false, reservation: null })}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Name */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-full p-2">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-700">Customer Name</label>
                <p className="text-gray-800 font-medium">{viewModal.reservation.name}</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 rounded-full p-2">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-green-700">Email Address</label>
                <p className="text-gray-800 font-medium">{viewModal.reservation.email}</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-full p-2">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-orange-700">Phone Number</label>
                <p className="text-gray-800 font-medium">{viewModal.reservation.phone}</p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 rounded-full p-2">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-700">Date & Time</label>
                <p className="text-gray-800 font-medium">
                  {formatDate(viewModal.reservation.date)} 
                  <span className="inline-flex items-center ml-2 text-purple-600">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(viewModal.reservation.time)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border-l-4 border-teal-500">
            <div className="flex items-center gap-3">
              <div className="bg-teal-500 rounded-full p-2">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-700">Number of Guests</label>
                <p className="text-gray-800 font-medium">{viewModal.reservation.numberOfGuests} guests</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 rounded-full p-2">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-indigo-700">Reservation Status</label>
                </div>
              </div>
              <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-full shadow-lg ${getStatusColor(viewModal.reservation.status)}`}>
                {viewModal.reservation.status.charAt(0).toUpperCase() + viewModal.reservation.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Message (if exists) */}
          {viewModal.reservation.message && (
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border-l-4 border-rose-500">
              <div className="flex items-start gap-3">
                <div className="bg-rose-500 rounded-full p-2 mt-1">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-rose-700 mb-2">Special Message</label>
                  <p className="text-gray-800 leading-relaxed bg-white/50 rounded-lg p-3 border border-rose-200">
                    {viewModal.reservation.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-2xl p-4 border-t border-gray-200">
          <div className="flex justify-center">
            <button
              onClick={() => setViewModal({ open: false, reservation: null })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewModal