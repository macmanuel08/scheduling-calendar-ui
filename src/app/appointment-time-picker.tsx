import { useState ,useEffect } from "react";
import clsx from "clsx";

type AppointmentTimePickerProps = {
	takenTimeslots: string[];
	id: string;
	selectedDate: Date;
}

interface OfficeHour {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

function generateTimeSlots(startTime: string, endTime: string, interval = 30) {
  const toMinutes = (t: string) => {
    const [h, m, s] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  const slots = [];
  for (let m = start; m < end; m += interval) {
    const hours = Math.floor(m / 60).toString().padStart(2, "0");
    const minutes = (m % 60).toString().padStart(2, "0");
    slots.push(`${hours}:${minutes}:00`);
  }

  return slots;
}

export default function AppointmentTimePicker({ takenTimeslots, id, selectedDate }: AppointmentTimePickerProps) {
	const [officeHours, setOfficeHours] = useState<OfficeHour[]>([]);
	const [selectedTime, setSelectedTime] = useState<string>();

	const dayIndex = selectedDate.getDay();

	useEffect(() => {
		const input = document.getElementById('appointmentTime') as HTMLInputElement;
		if (input && selectedTime) {
		  input.value = selectedTime;
		}
	}, [selectedTime]);

	useEffect(() => {
		const fetchTimeslots = async () => {
			const res = await fetch(`/api/timeslots?id=${id}`, {
				method: 'GET',
			});

			const data = await res.json();
			setOfficeHours(data);
		};

		fetchTimeslots();

	}, [selectedTime]);

	const selectedDayInfo = officeHours.find(item => item.day_of_week === dayIndex);

	let timeslots: string[] = [];

	if (selectedDayInfo != undefined) {
		const startTime: string = selectedDayInfo.start_time;
		const endTime = selectedDayInfo?.end_time;
		timeslots = generateTimeSlots(startTime, endTime);
	}

	return (
		<div className="relative">
			<div className="flex gap-4 flex-wrap max-w-[575px]">
				{timeslots.map((slot) => {
					if (!takenTimeslots.includes(slot)) {
						const splitTimestamp = slot.split(":");
						const hour: number = Number(splitTimestamp[0]);
						const minutes = splitTimestamp[1];
						return (
								<div
									key={slot}
									className={clsx(
										'flex h-8 items-center rounded-md px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
										selectedTime == slot ? 'bg-green-500' : 'bg-blue-400'
									)}
									onClick={() => {
										setSelectedTime(slot);
									}}
								>
									{hour > 12 ? `${hour - 12}:${minutes} PM`: `${hour}:${minutes} AM` }
								</div>
						);
					}
				})}
			</div>
			<input type="hidden" name="appointmentTime" id="appointmentTime" />
		</div>
	);
}