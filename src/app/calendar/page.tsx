import { getAppointmentInfoById } from "@/app/lib/data";

export default async function Home() {
  const appointment = await getAppointmentInfoById('042aed13-e8b6-4d84-b5ab-8400171bbf74');
  console.log(appointment);
  return (
    <div className="bg-zinc-50 font-sans text-black">
      {appointment.patient_first_name}
    </div>
  );
}