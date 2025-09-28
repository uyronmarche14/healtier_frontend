// app/patients-dashboard/components/HealthSnapshot.tsx
import { Vitals, Prescription } from "@/data/appointments";

interface Props {
  vitals: Vitals;
  prescriptions: Prescription[];
}

export default function HealthSnapshot({ vitals, prescriptions }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold text-lg">Recent Vitals</h3>
        <ul className="mt-2 space-y-1">
          <li>Blood Pressure: {vitals.bloodPressure}</li>
          <li>Heart Rate: {vitals.heartRate} bpm</li>
          <li>Weight: {vitals.weight} kg</li>
        </ul>
      </div>

      <div className="p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold text-lg">Prescriptions</h3>
        <ul className="mt-2 space-y-1">
          {prescriptions.map((p) => (
            <li key={p.id}>{p.name} – {p.dosage}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
