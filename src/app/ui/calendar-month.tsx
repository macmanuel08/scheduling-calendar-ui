'use client';

import { useState } from "react";

import { AppointmentType2 } from "@/app/lib/types";
import CalendarDay from "@/app/ui/calendar-day";
import StatusModal from "@/app/appointmentStatusModal";
import { AppointmentType } from "@/app/lib/types";
import { RowList, Row } from "postgres";

export default function CalendarMonth({
    daysArray,
    monthAppointments,
    currentMonth,
    currentYear,
    updateAppointmentsStatus,
}: {
    daysArray: (number | null)[],
    monthAppointments: AppointmentType2[],
    currentMonth: boolean,
    currentYear: boolean,
    updateAppointmentsStatus: (data: {id: string, status: string}) => Promise<RowList<Row[]>>,
}) {

    const [showModal, setShowModal] = useState(false);
    const [showPatient, setShowPatient] = useState<AppointmentType>();
    // const [appointmentStatus, setAppointmentStatus]

    const toggleModal: React.MouseEventHandler<HTMLButtonElement| HTMLDivElement> = () => {
        setShowModal(prev => !prev);
    }

    function toggleShowPatient(patient: AppointmentType) {
        setShowPatient(patient);
    }

    const currentMonthYear = currentMonth && currentYear;

    return (
        <>
            { showModal && <StatusModal toggleModal={toggleModal} patient={showPatient!} updateAppointmentsStatus={updateAppointmentsStatus} />}
            <div className="calendar bg-slate-100 p-px">
                <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Sun</div>
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Mon</div>
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Tue</div>
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Wed</div>
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Thu</div>
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Fri</div>
                    <div className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Sat</div>
                </div>

                <div className="calendar-month grid grid-cols-7 gap-px bg-slate-200" id="calendarGrid">
                    {
                        daysArray!.map((day, index) => {
                            const matched = monthAppointments.find(appointment => {
                                const dateStr = appointment.appointment_date;
                                const dayStr = new Date(dateStr).getDate();
                                return dayStr === day;
                            });

                            if (matched) {
                                return (
                                    <CalendarDay
                                        key={index}
                                        appointments={matched.appointments}
                                        day={day!}
                                        currentMonthYear={currentMonthYear}
                                        toggleModal={toggleModal}
                                        togglePatient={toggleShowPatient}
                                    />
                                );
                            }

                        return (
                            <CalendarDay
                                key={index}
                                appointments={[]}
                                day={day!}
                                currentMonthYear={currentMonthYear}
                                toggleModal={toggleModal}
                                togglePatient={toggleShowPatient}
                            />
                        );
                    })
                    }
                    
                </div>
            
            </div>
        </>
    );
}