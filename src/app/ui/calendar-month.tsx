import { AppointmentType2 } from "@/app/lib/types";
import CalendarDay from "@/app/ui/calendar-day";

export default function CalendarMonth({daysArray, monthAppointments}: {daysArray: (number | null)[], monthAppointments: AppointmentType2[]}) {
    return (
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
                                />
                            );
                        }

                    return (
                        <CalendarDay
                            key={index}
                            appointments={[]}
                            day={day!}
                        />
                    );
                })
                }
                
            </div>
            
        </div>
    );
}