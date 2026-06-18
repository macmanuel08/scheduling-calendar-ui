import { AppointmentType } from "@/app/lib/types";
import { to12HourTime } from "@/app/lib/helpers";
import clsx from "clsx";

export default function CalendarDay({
    appointments,
    day,
    toggleModal,
    togglePatient,
    currentMonthYear
}: {
    appointments: AppointmentType[],
    day: number,
    toggleModal: React.MouseEventHandler<HTMLDivElement>,
    togglePatient: (patient: AppointmentType) => void,
    currentMonthYear: boolean,
}) {

    return (
        <div className="day min-h-[120px] bg-white p-2 relative group hover:bg-slate-50 transition duration-150 flex flex-col">
            <div
            className={clsx(
                "text-sm font-semibold flex items-center justify-center w-7 h-7 rounded-full ml-auto text-slate-700",
                {
                "bg-blue-600 text-white shadow-md":
                    currentMonthYear && day === new Date().getDate(),
                }
            )}
            >
            {day}
            </div>
            <div className="day-events mt-1 flex-1 overflow-y-auto space-y-1">
                {
                    appointments.length !== 0 &&
                    appointments.map(appointment => {
                        const status = appointment.status;

                        return (
                            <div
                                key={appointment.id}
                                className={
                                    clsx(
                                        "group/event text-xs p-1.5 rounded-md border-l-4 cursor-pointer transition border-y border-r shadow-sm flex flex-col gap-0.5",
                                        {
                                            "bg-amber-50 text-amber-900 border-amber-500 hover:bg-amber-100": status == 'pending',
                                            "bg-green-50 text-green-900 border-green-500 hover:bg-green-100": status == 'confirmed',
                                            "bg-slate-50 text-slate-900 border-slate-500 hover:bg-slate-100": status == 'completed',
                                            "bg-rose-50 text-rose-900 border-rose-500 hover:bg-rose-100": status == 'canceled',
                                        }                                   
                                    )
                                }
                                
                                onClick={(e) => {
                                    toggleModal(e);
                                    togglePatient(appointment);
                                }}
                            >
                                <span className={
                                    clsx(
                                        "font-bold text-[10px] uppercase tracking-wide leading-none",
                                        {
                                            "text-amber-700": status == 'pending',
                                            "text-green-700": status == 'confirmed',
                                            "text-slate-700": status == 'completed',
                                            "text-rose-700": status == 'canceled',
                                        }
                                    )
                                }>
                                    {to12HourTime(appointment.time)}
                                </span>
                                <span className={
                                    clsx(
                                        "font-medium truncate leading-tight appointment",
                                        {
                                            "line-through": status == 'completed' || status == 'canceled'
                                        }
                                    )
                                }>
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