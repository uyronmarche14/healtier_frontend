// app/patients-dashboard/components/OverviewCards.tsx
import { Appointment, Invoice } from "@/types/appoinments";
import { mockSubscription } from "@/data/appointments";

interface Props {
  appointment: Appointment;
  invoice: Invoice;
}

export default function OverviewCards({ appointment, invoice }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unpaid':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Next Appointment Card */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-blue-900 ml-4">Next Appointment</h3>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <p className="font-bold text-blue-900 text-lg mb-1">{formatDate(appointment.date)}</p>
            <p className="text-blue-700">Scheduled appointment</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <p className="font-bold text-blue-900">{appointment.doctor}</p>
            <p className="text-blue-600 text-sm">{appointment.specialty}</p>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-green-900 ml-4">Subscription</h3>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <p className="font-bold text-green-900 text-lg mb-2">{mockSubscription.name}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(mockSubscription.status)}`}>
              {mockSubscription.status}
            </span>
          </div>
        </div>
      </div>

      {/* Latest Invoice Card */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-orange-900 ml-4">Latest Invoice</h3>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border border-orange-200">
            <p className="font-bold text-orange-900 text-2xl mb-2">₱{invoice.amount.toLocaleString()}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
              {invoice.status}
            </span>
          </div>
          <div className="bg-white rounded-xl p-4 border border-orange-200">
            <p className="text-orange-700 text-sm">Due Date</p>
            <p className="font-bold text-orange-900">{formatDate(invoice.dueDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
