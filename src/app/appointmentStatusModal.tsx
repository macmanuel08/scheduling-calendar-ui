'use client';

import { 
    CalendarClock,
    X,
    Phone,
    Mail,
    ChevronDown,
    Clock,
    UserCircle2,
} from "lucide-react";

import { AppointmentType } from "@/app/lib/types";
import { to12HourTime } from "@/app/lib/helpers";
import { RowList, Row } from "postgres";
import { MouseEvent } from "react";
import { useState, SetStateAction } from "react";

export default function StatusModal({
    toggleModal,
    patient,
    updateAppointmentsStatus,
}: {
    toggleModal: React.MouseEventHandler<HTMLButtonElement>,
    patient: AppointmentType,
    updateAppointmentsStatus: (data: {id: string, status: string}) => Promise<RowList<Row[]>>,
}) {

    const [currentStatus, setCurrentStatus] = useState(patient.status);

    function toggleStatus(e: MouseEvent<HTMLButtonElement>) {
        updateAppointmentsStatus({id: patient.id, status: currentStatus});
        toggleModal(e);
        setCurrentStatus(currentStatus);
    }

    function onChangeStatus(newStatus: SetStateAction<"pending" | "confirmed" | "completed" | "canceled">) {
        setCurrentStatus(newStatus);
    }

    return (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            id="appointmentModal"
        >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform transition-all">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <CalendarClock className="w-5 h-5 text-blue-600" />
                        Update Status
                    </h3>
                    <button className="text-slate-400 hover:text-slate-600 transition focus:outline-none cursor-pointer" onClick={toggleModal}>
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    
                    {/* Patient Info Card */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                <UserCircle2 className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Name</p>
                                <p className="font-semibold text-slate-800 text-sm leading-none">{patient.first_name} {patient.last_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Phone</p>
                                <p className="font-semibold text-slate-800 text-sm leading-none">{patient.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Email</p>
                                <p className="font-semibold text-slate-800 text-sm leading-none">{patient.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Time</p>
                                <p className="font-semibold text-slate-800 text-sm leading-none">{to12HourTime(patient.time)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Selector */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">Appointment Status</label>
                        <div className="relative">
                            <select
                                id="status"
                                className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm font-medium"
                                defaultValue={currentStatus}
                                onChange={(e) =>
                                    onChangeStatus(
                                        e.target.value as "pending" | "confirmed" | "completed" | "canceled"
                                    )
                                }
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button type="button" className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer" onClick={toggleModal}>
                        Cancel
                    </button>
                    <button type="button" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer" onClick={(e) => toggleStatus(e)}>
                        Save Changes
                    </button>
                </div>
                
            </div>
        </div>
    );
}