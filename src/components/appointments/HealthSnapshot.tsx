// app/patients-dashboard/components/HealthSnapshot.tsx
import { Vitals, Prescription } from "@/types/appoinments";

interface Props {
  vitals: Vitals;
  prescriptions: Prescription[];
}

export default function HealthSnapshot({ vitals, prescriptions }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Vitals Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-blue-900 ml-3">Recent Vitals</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-blue-200 last:border-b-0">
            <span className="text-blue-700 font-medium">Blood Pressure</span>
            <span className="font-bold text-blue-900 text-lg">{vitals.bloodPressure}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-blue-200 last:border-b-0">
            <span className="text-blue-700 font-medium">Heart Rate</span>
            <span className="font-bold text-blue-900 text-lg">{vitals.heartRate} <span className="text-sm font-normal">bpm</span></span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-blue-700 font-medium">Weight</span>
            <span className="font-bold text-blue-900 text-lg">{vitals.weight} <span className="text-sm font-normal">kg</span></span>
          </div>
        </div>
      </div>

      {/* Prescriptions Card */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border border-green-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-green-900 ml-3">Prescriptions</h3>
        </div>
        
        <div className="space-y-3">
          {prescriptions.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-4 border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-green-900">{p.name}</p>
                  <p className="text-green-600 text-sm">{p.dosage}</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
