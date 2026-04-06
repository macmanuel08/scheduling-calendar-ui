import { NextResponse } from "next/server";
import { getTakenTimeslots } from "@/app/lib/data";
import { fetchTimeslotsById } from "@/app/lib/data";

export async function POST(req: Request) {
    const { date } = await req.json();
    const parsedDate = new Date(date);

    const takenTimeslots = await getTakenTimeslots(parsedDate);
    return NextResponse.json(takenTimeslots);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log(id);

    if (id == null) {
        return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
        );
    }

    const timeslots = await fetchTimeslotsById(id);
    return NextResponse.json(timeslots);
}