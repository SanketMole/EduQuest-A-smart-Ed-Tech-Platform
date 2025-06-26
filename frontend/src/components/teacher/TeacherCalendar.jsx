import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/styles/TeacherCustomCalendar.css'

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TeacherCalendar = () => {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    start: null,
    end: null,
  });

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDate(start);
    setNewReminder({
      title: '',
      description: '',
      start,
      end,
    });
    setShowModal(true);
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (newReminder.title.trim() === '') return;

    setReminders([...reminders, {
      id: Date.now(),
      ...newReminder,
    }]);
    setShowModal(false);
    setNewReminder({
      title: '',
      description: '',
      start: null,
      end: null,
    });
  };

  const handleDeleteReminder = (reminderId) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  return (
    <div className="p-6">
      <div className="bg-yellow-200 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Teacher Calendar</h1>
        
        {/* Calendar */}
        <div className="h-[600px] mb-8">
          <Calendar
            localizer={localizer}
            events={reminders}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
            selectable
            style={{ 
              height: '100%',
              border: '2px solid black',
             }}
            className="font-sans border-2 border-black bg-yellow-300 shadow-sm rounded-lg p-4"
            views={['month']}
            tooltipAccessor={event => `${event.title}\n${event.description || ''}`}
          />
        </div>

        {/* Add Reminder Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div 
              className="bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 text-white">
                <h2 className="text-2xl font-semibold">
                  Add Reminder
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-50 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-gray-50 mb-6">
                Date: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </div>
              
              <form onSubmit={handleAddReminder} className="space-y-6">
                <div>
                  <label className="text-xl block text-white font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({
                      ...newReminder,
                      title: e.target.value
                    })}
                    className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter reminder title"
                    required
                  />
                </div>

                <div>
                  <label className="text-xl block text-gray-50 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({
                      ...newReminder,
                      description: e.target.value
                    })}
                    className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter reminder description"
                    rows="4"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-white px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer" 
                  >
                    Add Reminder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reminders List */}
        <div className="bg-yellow-300 rounded-lg shadow-sm p-6 border-2 border-black">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-gray-800 text-center py-4">No reminders yet</p>
          ) : (
            <div className="space-y-3">
              {reminders
                .sort((a, b) => a.start - b.start)
                .map(reminder => (
                  <div
                    key={reminder.id}
                    className="bg-gray-800 rounded-lg p-4 flex justify-between items-start "
                  >
                    <div>
                      <h3 className="font-bold text-xl text-white">{reminder.title}</h3>
                      {reminder.description && (
                        <p className="text-gray-50 text-sm mt-1">{reminder.description}</p>
                      )}
                      <p className="text-gray-100 text-sm mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {format(reminder.start, 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="text-gray-50 hover:text-red-500 transition-colors p-1"
                      title="Delete reminder"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCalendar;
