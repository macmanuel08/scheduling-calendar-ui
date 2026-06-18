import Calendar from "@/app/ui/calendar";
import { updateAppointmentsStatus } from "@/app/lib/actions";

export default async function Home() {
  return (
    <div className="bg-zinc-50 font-sans text-black">
      <Calendar updateAppointmentsStatus={updateAppointmentsStatus} />


      
    </div>
  );
}