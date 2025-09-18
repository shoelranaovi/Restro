import { getUsersReservations } from '@/Redux/ReservationSlice'
import { Calendar, Mail, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../Layout/LoadingComponent'
import { formatDate } from '@/helper/formatDate'

function Reservation({getStatusColor,getStatusIcon}) {
    const{reservations,isLoading}=useSelector((state)=>state.reservation)

    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getUsersReservations())
    },[])
  return (
    <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">My Reservations</h3>
                  {isLoading ? <div  ><LoadingComponent />  </div> :
                  <div className="space-y-4">
                    {reservations.length > 0 ? reservations.map((reservation) => (
                      <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Reservation #{reservation._id}</h4>
                            <div className="mt-2 space-y-1">
                              <p className="text-gray-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(reservation.date) } at {reservation.time}
                              </p>
                              <p className="text-gray-600 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {reservation.guests} guests • {reservation.numberOfGuests}
                              </p>
                              <p className="text-gray-600 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                 Email • {reservation.email}
                              </p>
                              <p className="text-gray-600 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                createBy • {reservation.createBy.email}
                              </p>
                            </div>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                            {getStatusIcon(reservation.status)}
                            {reservation.status}
                          </div>
                        </div>
                      </div>
                    )) : <p>No reservation Found</p> }
                  </div>}
                </div>
  )
}

export default Reservation