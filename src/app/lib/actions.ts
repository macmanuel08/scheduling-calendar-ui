'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type AppointmentState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        phone?: string[];
        appointmentDate?: string[];
        appointmentTime?: string[];
        companyId?: string[];
    };
    values?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        appointmentDate?: string;
        appointmentTime?: string;
        companyId?: string;
    };
    message?: string | null;
};

const AppointmentSchema = z.object({
    firstName: z.string()
        .min(1, { message: 'Please provide your first name.' }),

    lastName: z.string()
        .min(1, { message: 'Please provide your last name.' }),

    email: z.string()
        .trim()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please provide your email in the right format (e.g. example@digitizebox.com).' }),

    phone: z.string()
        .min(1, { message: 'Please provide your phone number.' }),

    appointmentDate: z.string()
        .min(1, { message: 'Please select date.' }),

    appointmentTime: z.string()
        .min(1, { message: 'Please select time' }),

    companyId: z.string(),
});

export async function createAppointment(
    prevState: AppointmentState | undefined,
    formData: FormData
): Promise<AppointmentState | undefined> {
    const values = {
        firstName: formData.get('firstName')?.toString() || '',
        lastName: formData.get('lastName')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        phone: formData.get('phone')?.toString() || '',
        appointmentDate: formData.get('appointmentDate')?.toString() || '',
        appointmentTime: formData.get('appointmentTime')?.toString() || '',
        companyId: formData.get('companyId')?.toString(),
    };

    const validatedFields = AppointmentSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        values,
        message: 'Missing Fields. Failed to make an appointment.',
        };
    }

    const { firstName, lastName, email, phone, appointmentDate, appointmentTime, companyId } = validatedFields.data;

    try {
        await sql`
        INSERT INTO appointments (first_name, last_name, email, phone, appointment_date, appointment_time, company_id)
        VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${appointmentDate}, ${appointmentTime}, ${companyId})`
        ;
    } catch(error) {
        return {message: `Failed to insert appointment: ${error}`};
    }

    revalidatePath(`/calendar`);
    redirect(`/calendar`);
}