import { NextResponse } from 'next/server';
import { getAppointments } from '@/app/lib/data';
import { fetchCompanyAvailability } from '@/app/lib/data';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const getAvailability = searchParams.get('availability');

    if (getAvailability && id != null) {
        const availabilities = await fetchCompanyAvailability(id);
        return NextResponse.json(availabilities);
    }

    const appointments = await getAppointments(id);
    return NextResponse.json(appointments);
}