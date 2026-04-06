'use server';

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type AppointmentType = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
};

export async function getAppointmentInfoById(id: string) {
  const info = await sql`
    SELECT a.first_name as patient_first_name, a.last_name as patient_last_name, a.email as patient_email, a.appointment_date, a.appointment_time, c.name as business_name, u.phone, u.email as admin_email, u.phone as admin_phone
    FROM appointments a
    INNER JOIN companies c
    ON a.company_id = c.id
    INNER JOIN users u
    ON c.id = u.company_id
    WHERE a.id = ${id}
  `;

  return info[0];
}

export async function getAppointments(companyId: string | null): Promise<AppointmentType[]> {
  const result = await sql<AppointmentType[]>`
    SELECT id, appointment_date, appointment_time, first_name, last_name, email, phone, status
    FROM appointments
    WHERE company_id = ${companyId}
  `;
  return result;
}

export async function fetchTimeslotsById(id: string) {
  try {
    const timeSlots = await sql`
      SELECT day_of_week, start_time, end_time
      FROM companies_availability_blocks
      WHERE company_id = ${id}
    `;
    return timeSlots;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch timeslots.');
  }
}

export async function fetchCompanyAvailability(id: string) {
  try {
    const availabilities = await sql`
      SELECT day_of_week
      FROM companies_availability_blocks
      WHERE company_id = ${id}
    `;

    return availabilities;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch company availability days.');
  }
}

export async function getTakenTimeslots(date: Date): Promise<string[] | null> {
  try {
    const results = await sql`
      SELECT appointment_time FROM appointments WHERE appointment_date = ${date};
    `;

    const availableTimeslots = results.map(result => result.appointment_time);
    return availableTimeslots;
  } catch(error) {
    console.log(`reading time failed: ${error}`)
    return null
  }
}