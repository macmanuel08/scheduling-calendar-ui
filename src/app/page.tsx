import AppointmentForm from '@/app/appointment-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Make An Appointment',
};

export default async function AppointmentFormPage() {
    const name = 'Calendar UI';

  return (
    <main className="flex items-center justify-center md:min-h-screen">
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4">
        <div className="text-white rounded-lg bg-blue-500 p-6 mb-1">
          <h1 className={`text-2xl`}>{name} Appointment Form</h1>
          <p className="text-sm">Please fill out the form to schedule and appointment.</p>
        </div>
        <Suspense>
          <AppointmentForm />
        </Suspense>
      </div>
    </main>
    
  );
}
