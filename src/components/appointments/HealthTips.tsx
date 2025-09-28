// app/patients-dashboard/components/HealthTips.tsx
import { HealthTip } from "@/types/appoinments";

interface Props {
  tips: HealthTip[];
}

export default function HealthTips({ tips }: Props) {
  return (
    <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="font-bold text-xl text-purple-900 ml-3">Health Tips</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-xl p-5 border border-purple-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-purple-900 mb-2">{tip.title}</h4>
                <p className="text-purple-700 text-sm leading-relaxed">{tip.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
