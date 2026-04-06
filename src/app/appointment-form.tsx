'use client';

import { UserCircleIcon, PhoneIcon, ClockIcon, Mail } from 'lucide-react';
import { Button } from '@/app/ui/button';
import { createAppointment, AppointmentState } from '@/app/lib/actions';
import { useActionState } from 'react';
import AppointmentDatePicker from '@/app/appointment-date-picker';
import AppointmentTimePicker from '@/app/appointment-time-picker';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

export default function Form() {
	const companyId = "e485f877-432e-48e1-97b3-b8bff81fafae";
	interface Day {day_of_week: number;}
	const initialState: AppointmentState = { errors: {}, message: null, };
	const [state, formAction] = useActionState(createAppointment, initialState);
	const safeState = state ?? initialState;
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [timeslotsDisplay, setTimeslotsDisplay] = useState<boolean>(false);
	const [timeslots, setTimeslots] = useState<string[]>([]);

	const [availabilities, setAvailabilities] = useState<number[]>([]);

	useEffect(() => {
		const fetchCompanyAvailabilities = async () => {
			const res = await fetch(`/api/appointments?id=${companyId}&availability=${true}`, {
				method: 'GET',
			});

			const data: Day[] = await res.json();
			const availableDays = data.map((day: Day) => day.day_of_week);
			console.log(availableDays);
			setAvailabilities(availableDays);
		}

		fetchCompanyAvailabilities()
	}, []);

	useEffect(() => {
		const fetchTimeslots = async () => {
			const res = await fetch('/api/timeslots', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ date: format(selectedDate, 'yyyy-MM-dd') }),
			});

			const data = await res.json();
			setTimeslots(data);
		};

		if (selectedDate) {
			fetchTimeslots();
		}

	}, [selectedDate]);

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* First Name */}
				<div className="mb-4">
				<label htmlFor="firstName" className="mb-2 block text-sm font-medium">
					Enter Your First Name
				</label>
				<div className="relative">
					<input
					id="firstName"
					name="firstName"
					type="text"
					placeholder="First Name"
					className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
					aria-describedby="firstname-error"
					defaultValue={safeState.values?.firstName ?? ''}
					/>
					<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
				<div id="firstname-error" aria-live="polite">
					{safeState.errors?.firstName?.map((error) => (
					<p key={error} className="text-sm text-red-500 mt-2">{error}</p>
					))}
				</div>
				</div>

				{/* Last Name */}
				<div className="mb-4">
				<label htmlFor="lastName" className="mb-2 block text-sm font-medium">
					Enter Your Last Name
				</label>
				<div className="relative">
					<input
					id="lastName"
					name="lastName"
					type="text"
					placeholder="Last Name"
					className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
					aria-describedby="lastname-error"
					defaultValue={safeState.values?.lastName ?? ''}
					/>
					<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
				<div id="lastname-error" aria-live="polite">
					{safeState.errors?.lastName?.map((error) => (
					<p key={error} className="text-sm text-red-500 mt-2">{error}</p>
					))}
				</div>
				</div>

				{/* Email */}
				<div className="mb-4">
				<label htmlFor="email" className="mb-2 block text-sm font-medium">
					Enter Your Email Address
				</label>
				<div className="relative">
					<input
					id="email"
					name="email"
					type="email"
					placeholder="Email"
					className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
					aria-describedby="email-error"
					defaultValue={safeState.values?.email ?? ''}
					/>
					<Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
				<div id="email-error" aria-live="polite">
					{safeState.errors?.email?.map((error) => (
					<p key={error} className="text-sm text-red-500 mt-2">{error}</p>
					))}
				</div>
				</div>

				{/* Phone */}
				<div className="mb-4">
				<label htmlFor="phone" className="mb-2 block text-sm font-medium">
					Enter Your Phone Number
				</label>
				<div className="relative">
					<input
					id="phone"
					name="phone"
					type="text"
					placeholder="Phone Number"
					className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
					aria-describedby="phone-error"
					defaultValue={safeState.values?.phone ?? ''}
					/>
					<PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
				<div id="phone-error" aria-live="polite">
					{safeState.errors?.phone?.map((error) => (
					<p key={error} className="text-sm text-red-500 mt-2">{error}</p>
					))}
				</div>
				</div>

				{/* Appointment Date */}
				<div className="mb-4">
				<label htmlFor="appointmentDate" className="mb-2 block text-sm font-medium">
					Appointment Date
				</label>
				<AppointmentDatePicker
					availabilities={availabilities}
					defaultValue={safeState.values?.appointmentDate}
					onChange={(date) =>{
						if (date != null) setSelectedDate(date);
						setTimeslotsDisplay(true);
					}}
				/>
				<div id="appointmentDate-error" aria-live="polite">
					{safeState.errors?.appointmentDate?.map((error) => (
					<p key={error} className="text-sm text-red-500 mt-2">{error}</p>
					))}
				</div>
				</div>

				{/* Appointment Time */}
				<div className={
					clsx(
							'relative mb-8 transition-opacity duration-700 delay-300 ease-in-out',
							timeslotsDisplay ? 'h-auto opacity-100 z-[1]]' : 'opacity-0 h-0 z-[-1]'
					)
				}>
				<label htmlFor="appointmentTime" className="mb-2 block text-sm font-medium">
					<ClockIcon className="inline-block pointer-events-none h-5 w-5 text-gray-500 peer-focus:text-gray-900" /> Select Appointment Time. If your desired time does not show, please try another date.
				</label>
				<div className="relative">
					<AppointmentTimePicker id={companyId} selectedDate={selectedDate} takenTimeslots={timeslots} />
				</div>
				<div id="appointmentTime-error" aria-live="polite">
					{safeState.errors?.appointmentTime?.map((error) => (
					<p key={error} className="text-sm text-red-500 mt-2">{error}</p>
					))}
				</div>
				</div>

				<div aria-live="polite" aria-atomic="true">
				{safeState.message && <p className="mt-2 text-sm text-red-500">{safeState.message}</p>}
				</div>

				<input type="hidden" name="companyId" value={companyId} />

				<div className="mt-6">
				<Button type="submit">Make Appointment</Button>
				</div>
			</div>
		</form>
	);
}