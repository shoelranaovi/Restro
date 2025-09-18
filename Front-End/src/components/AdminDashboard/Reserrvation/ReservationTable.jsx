import LoadingComponent from '@/components/Layout/LoadingComponent'
import { Calendar, Clock, Edit, Eye, Mail, Phone, Trash2, Users } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

function ReservationTable({currentReservations,handleDelete,handleEdit,handleView,formatTime,formatDate,getStatusColor}) {
    const {isLoading}=useSelector((state)=>state.reservation)
 
  return (
    <div className="overflow-x-auto">
    {isLoading ? <LoadingComponent />:
    currentReservations?.length >0 ?
      
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact & Details
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Performance
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Activity
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentReservations.map((reservation) => (
            <tr key={reservation._id} className="hover:bg-gray-50">
              <td className="py-4 px-6">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-medium">
                    {reservation.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="text-sm text-gray-900">
                  <div className="flex items-center mb-1">
                    <Mail className="h-3 w-3 mr-1 text-gray-400" />
                    {reservation.email}
                  </div>
                  <div className="flex items-center mb-1">
                    <Phone className="h-3 w-3 mr-1 text-gray-400" />
                    {reservation.phone}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1 text-gray-400" />
                    {reservation.numberOfGuests} guests
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="text-sm text-gray-900">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                    {formatDate(reservation.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-400" />
                    {formatTime(reservation.time)}
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-500">
                {new Date(reservation.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleView(reservation)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleEdit(reservation)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(reservation)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          )) }
        </tbody>
      </table>  : <div className='h-24  w-full  mt-5 flex justify-center items-center '> <div>No reservation found</div> </div>  } 
    
    
    </div>
  )
}

export default ReservationTable