// app/patients-dashboard/components/OverviewCards.tsx
import { Appointment, Subscription, Invoice } from "@/data/appointments";

interface Props {
  appointment: Appointment;
  subscription: Subscription;
  invoice: Invoice;
}

export default function OverviewCards({ appointment, subscription, invoice }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold text-lg">Next Appointment</h3>
        <p>{appointment.date.split("T")[0]}</p>
        <p>{appointment.doctor} ({appointment.specialty})</p>
      </div>

      <div className="p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold text-lg">Subscription</h3>
        <p>{subscription.name}</p>
        <p className="capitalize">Status: {subscription.status}</p>
      </div>

      <div className="p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold text-lg">Latest Invoice</h3>
        <p>₱{invoice.amount}</p>
        <p className="capitalize">Status: {invoice.status}</p>
      </div>
    </div>
  );
}
