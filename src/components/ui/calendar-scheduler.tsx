'use client'

import { useState, useCallback, useMemo } from 'react'
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { cn } from '@/lib/utils'

const localizer = momentLocalizer(moment)

interface TimeSlot {
  id: string
  title: string
  start: Date
  end: Date
  isBooked: boolean
  clientName?: string
  service?: string
}

interface CalendarSchedulerProps {
  selectedDate?: Date
  selectedTime?: string
  onDateTimeSelect: (date: Date, time: string) => void
  bookedSlots?: TimeSlot[]
  className?: string
}

export function CalendarScheduler({
  selectedDate,
  selectedTime,
  onDateTimeSelect,
  bookedSlots = [],
  className
}: CalendarSchedulerProps) {
  const [view, setView] = useState<View>(Views.WEEK)
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())

  // Business hours: Mon-Fri 8:00-18:00, Sat 8:00-12:00, Sun closed
  const businessHours = useMemo(() => {
    const hours = []
    const startOfWeek = moment().startOf('week')
    
    for (let day = 1; day <= 6; day++) { // Monday = 1, Saturday = 6
      const currentDay = startOfWeek.clone().add(day, 'days')
      let startHour = 8
      let endHour = day === 6 ? 12 : 18 // Saturday ends at 12:00
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) { // 30-minute slots
          const start = currentDay.clone().hour(hour).minute(minute).toDate()
          const end = currentDay.clone().hour(hour).minute(minute + 30).toDate()
          
          const isBooked = bookedSlots.some(slot => 
            moment(slot.start).isSame(start) && moment(slot.end).isSame(end)
          )
          
          hours.push({
            id: `${currentDay.format('YYYY-MM-DD')}-${hour}:${minute.toString().padStart(2, '0')}`,
            title: isBooked ? 'Booked' : 'Available',
            start,
            end,
            isBooked,
            resource: { available: !isBooked }
          })
        }
      }
    }
    
    return hours
  }, [bookedSlots, currentDate])

  const handleSelectSlot = useCallback(({ start, end }: { start: Date; end: Date }) => {
    const isBusinessHour = moment(start).day() !== 0 && // Not Sunday
      (moment(start).day() !== 6 || moment(start).hour() < 12) && // Saturday before 12:00
      moment(start).hour() >= 8 && // After 8:00
      moment(start).hour() < (moment(start).day() === 6 ? 12 : 18) // Before business end

    if (!isBusinessHour) {
      return
    }

    const isBooked = bookedSlots.some(slot => 
      moment(slot.start).isSame(start) && moment(slot.end).isSame(end)
    )

    if (!isBooked && moment(start).isAfter(moment())) {
      onDateTimeSelect(start, moment(start).format('HH:mm'))
    }
  }, [bookedSlots, onDateTimeSelect])

  const eventStyleGetter = (event: any) => {
    const isSelected = selectedDate && selectedTime && 
      moment(event.start).isSame(selectedDate, 'day') &&
      moment(event.start).format('HH:mm') === selectedTime

    if (isSelected) {
      return {
        style: {
          backgroundColor: '#059669',
          borderColor: '#047857',
          color: 'white',
          border: '2px solid #047857'
        }
      }
    }

    if (event.isBooked) {
      return {
        style: {
          backgroundColor: '#ef4444',
          borderColor: '#dc2626',
          color: 'white',
          opacity: 0.7
        }
      }
    }

    return {
      style: {
        backgroundColor: '#10b981',
        borderColor: '#059669',
        color: 'white',
        cursor: 'pointer'
      }
    }
  }

  const dayPropGetter = (date: Date) => {
    const isSunday = moment(date).day() === 0
    const isPast = moment(date).isBefore(moment(), 'day')
    
    if (isSunday || isPast) {
      return {
        style: {
          backgroundColor: '#f3f4f6',
          color: '#9ca3af'
        }
      }
    }
    
    return {}
  }

  return (
    <div className={cn('h-96 bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      <style jsx global>{`
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-header {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 8px;
        }
        .rbc-time-view {
          border: 1px solid #e5e7eb;
        }
        .rbc-time-header {
          background-color: #f9fafb;
        }
        .rbc-allday-cell {
          display: none;
        }
        .rbc-time-content {
          border-top: none;
        }
        .rbc-timeslot-group {
          border-bottom: 1px solid #f3f4f6;
        }
        .rbc-time-slot {
          border-top: 1px solid #f9fafb;
        }
        .rbc-event {
          border-radius: 4px;
          font-size: 12px;
          padding: 2px 4px;
        }
        .rbc-toolbar {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px;
          margin-bottom: 0;
        }
        .rbc-toolbar button {
          background-color: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 6px 12px;
          margin: 0 2px;
          color: #374151;
          font-weight: 500;
        }
        .rbc-toolbar button:hover {
          background-color: #f3f4f6;
          border-color: #9ca3af;
        }
        .rbc-toolbar button.rbc-active {
          background-color: #059669;
          border-color: #059669;
          color: white;
        }
      `}</style>
      
      <Calendar
        localizer={localizer}
        events={businessHours}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        view={view}
        onView={setView}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event: any) => {
          if (!event.isBooked && moment(event.start).isAfter(moment())) {
            handleSelectSlot({ start: event.start, end: event.end })
          }
        }}
        selectable
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        min={new Date(2024, 0, 1, 8, 0)} // 8:00 AM
        max={new Date(2024, 0, 1, 18, 30)} // 6:30 PM
        step={30}
        timeslots={1}
        views={['week', 'day']}
        defaultView={Views.WEEK}
        messages={{
          next: 'Next',
          previous: 'Previous',
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
      />
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded border-2 border-green-700"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Business Hours: Monday-Friday 8:00-18:00, Saturday 8:00-12:00, Sunday Closed
        </p>
      </div>
    </div>
  )
}