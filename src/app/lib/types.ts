export type AppointmentType = {
    id: string;
    appointment_date: string;
    appointment_time: string;
    time: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status: 'pending' | 'confirmed' | 'completed' | 'canceled';
};

export type AppointmentType2 = {
    appointment_date: string;
    appointments: AppointmentType[];
}