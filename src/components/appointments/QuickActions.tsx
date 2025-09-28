// app/patients-dashboard/components/QuickActions.tsx
export default function QuickActions() {
    return (
      <div className="mt-6 p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Book Appointment</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Order Medicines</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">Chat with Doctor</button>
        </div>
      </div>
    );
  }
  