import { getAppointmentsGroupByDate } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const year = parseInt(searchParams.get('year')!);
    const month = parseInt(searchParams.get('month')!);

    const appointments = await getAppointmentsGroupByDate(id, month, year);
    return NextResponse.json(appointments);
}