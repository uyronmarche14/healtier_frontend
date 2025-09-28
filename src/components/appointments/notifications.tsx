// app/patients-dashboard/components/Notifications.tsx
import { Notification } from "@/data/appointments";

interface Props {
  notifications: Notification[];
}

export default function Notifications({ notifications }: Props) {
  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow">
      <h3 className="font-semibold text-lg mb-2">Notifications</h3>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li key={n.id} className="text-sm">
            <span className="font-medium">{n.type.toUpperCase()}</span>: {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
