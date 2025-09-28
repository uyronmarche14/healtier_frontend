// app/patients-dashboard/components/Reminders.tsx
import { Reminder } from "@/data/appointments";

interface Props {
  reminders: Reminder[];
}

export default function Reminders({ reminders }: Props) {
  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow">
      <h3 className="font-semibold text-lg mb-2">Reminders</h3>
      <ul className="space-y-2">
        {reminders.map((r) => (
          <li key={r.id} className="text-sm">
            {r.message} – <span className="text-gray-500">{r.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
