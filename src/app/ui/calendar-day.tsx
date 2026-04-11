import { AppointmentType } from "@/app/lib/types";
import { to12HourTime } from "@/app/lib/helpers";

export default function CalendarDay({appointments, day}: {appointments: AppointmentType[], day: number}) {
    return (
        <div className="day min-h-[120px] bg-white p-2 relative group hover:bg-slate-50 transition duration-150 flex flex-col">
            <div className="text-sm font-semibold flex items-center justify-center w-7 h-7 rounded-full ml-auto text-slate-700">{day}</div>
            <div className="day-events mt-1 flex-1 overflow-y-auto space-y-1">
                {
                    appointments.length !== 0 &&
                    appointments.map((appointment, index) => {
                        return (
                            <div
                                key={index}
                                className="group/event text-xs p-1.5 rounded-md bg-amber-50 text-amber-900 border-l-4 border-amber-500 hover:bg-amber-100 cursor-pointer transition border-y border-r border-amber-100 shadow-sm flex flex-col gap-0.5"
                            >
                                <span className="font-bold text-[10px] text-amber-700 uppercase tracking-wide leading-none">
                                    {to12HourTime(appointment.time)}
                                </span>
                                <span className="font-medium truncate leading-tight">
                                    {appointment.first_name} {appointment.last_name}
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}