// app/patients-dashboard/components/Reminders.tsx
import { Reminder } from "@/types/appoinments";

interface Props {
  reminders: Reminder[];
}

export default function Reminders({ reminders }: Props) {
  const getTimeColor = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (hour < 18) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-purple-100 text-purple-800 border-purple-200';
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-indigo-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-bold text-xl text-indigo-900 ml-3">Reminders</h3>
        <span className="ml-auto bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
          {reminders.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {reminders.map((r) => (
          <div key={r.id} className="bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <p className="font-medium text-indigo-900">{r.message}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTimeColor(r.time)}`}>
                {r.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {reminders.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-indigo-600">No reminders set</p>
        </div>
      )}
    </div>
  );
}
