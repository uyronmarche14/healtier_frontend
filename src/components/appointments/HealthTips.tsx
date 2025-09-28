// app/patients-dashboard/components/HealthTips.tsx
import { HealthTip } from "@/data/appointments";

interface Props {
  tips: HealthTip[];
}

export default function HealthTips({ tips }: Props) {
  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow">
      <h3 className="font-semibold text-lg mb-2">Health Tips</h3>
      <ul className="space-y-2">
        {tips.map((tip) => (
          <li key={tip.id}>
            <p className="font-medium">{tip.title}</p>
            <p className="text-sm text-gray-600">{tip.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
