import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Calendar, MapPin, Filter } from 'lucide-react';

const RestaurantCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample events data
  const [events] = useState([
    {
      id: 1,
      title: 'Private Party - Johnson Wedding',
      date: new Date(2025, 4, 25),
      time: '18:00',
      type: 'booking',
      guests: 50,
      table: 'VIP Section',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Staff Meeting',
      date: new Date(2025, 4, 22),
      time: '14:00',
      type: 'meeting',
      duration: '1 hour',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Kitchen Deep Clean',
      date: new Date(2025, 4, 23),
      time: '09:00',
      type: 'maintenance',
      duration: '4 hours',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Wine Tasting Event',
      date: new Date(2025, 4, 28),
      time: '19:30',
      type: 'event',
      guests: 25,
      status: 'confirmed'
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'booking': return 'bg-blue-500 text-white';
      case 'meeting': return 'bg-green-500 text-white';
      case 'maintenance': return 'bg-orange-500 text-white';
      case 'event': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const EventModal = () => {
    if (!selectedEvent) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {selectedEvent.date.toLocaleDateString()}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {selectedEvent.time}
              {selectedEvent.duration && ` (${selectedEvent.duration})`}
            </div>
            
            {selectedEvent.guests && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {selectedEvent.guests} guests
              </div>
            )}
            
            {selectedEvent.table && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {selectedEvent.table}
              </div>
            )}
            
            <div className="mt-4">
              <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(selectedEvent.type)}`}>
                {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Calendar</h1>
              <p className="text-gray-600">Manage bookings, events, and staff schedules</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <h2 className="text-xl font-semibold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['month', 'week', 'day'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        viewMode === mode 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((date, index) => {
                  const dayEvents = getEventsForDate(date);
                  const isToday = date && date.toDateString() === new Date().toDateString();
                  const isSelected = date && date.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-24 p-2 border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                        isToday ? 'bg-blue-50 border-blue-200' : ''
                      } ${isSelected ? 'bg-blue-100 border-blue-300' : ''}`}
                      onClick={() => date && setSelectedDate(date)}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {date.getDate()}
                          </div>
                          
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                }}
                                className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
              
              <div className="space-y-3">
                {getEventsForDate(new Date()).length > 0 ? (
                  getEventsForDate(new Date()).map((event) => (
                    <div 
                      key={event.id}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {event.time}
                      </div>
                      {event.guests && (
                        <div className="text-xs text-gray-600">
                          <Users className="w-3 h-3 inline mr-1" />
                          {event.guests} guests
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No events scheduled for today</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">This Month</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="font-semibold">24</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Private Events</span>
                  <span className="font-semibold">8</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Staff Meetings</span>
                  <span className="font-semibold">4</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Maintenance</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Event Types</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm">Bookings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-3"></div>
                  <span className="text-sm">Meetings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-3"></div>
                  <span className="text-sm">Maintenance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-3"></div>
                  <span className="text-sm">Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Modal */}
        {selectedEvent && <EventModal />}
      </div>
    </div>
  );
};

export default RestaurantCalendar;