'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from 'lucide-react';
import { parseISO, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentDatePicker({
    defaultValue,
    onChange,
    availabilities,
}: {
    defaultValue?: string;
    onChange?: (date: Date | null) => void;
    availabilities: number[],
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    defaultValue ? parseISO(defaultValue) : null
  );

  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    return availabilities.includes(dayOfWeek);
  };


  useEffect(() => {
    const input = document.getElementById('appointmentDate') as HTMLInputElement;
    if (input && selectedDate) {
      input.value = format(selectedDate, 'yyyy-MM-dd');
    }
  }, [selectedDate]);

  return (
    <div className="relative">
        <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
                setSelectedDate(date);
                if (onChange) onChange(date);
            }}
            filterDate={isDateAvailable}
            minDate={new Date()}
            placeholderText="Select a date"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            dateFormat="yyyy-MM-dd"
        />
        <input type="hidden" name="appointmentDate" id="appointmentDate" />
        <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}