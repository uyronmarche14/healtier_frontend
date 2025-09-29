import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChartDataPoint } from '@/types/doctor-dashboard.types';

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  title: string;
  height?: number;
  showGrid?: boolean;
  color?: string;
  className?: string;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  title,
  height = 200,
  showGrid = true,
  color = '#3B82F6',
  className,
}) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.patients, d.appointments, d.messages)));
  const chartHeight = height - 40; // Account for labels

  const getBarHeight = (value: number) => {
    return (value / maxValue) * chartHeight;
  };

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 relative">
          {/* Chart Grid */}
          {showGrid && (
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border-t border-gray-100"
                  style={{ top: `${i * 25}%` }}
                />
              ))}
            </div>
          )}

          {/* Chart Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                {/* Patient Bar */}
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{
                    height: `${getBarHeight(item.patients)}px`,
                    opacity: 0.8,
                  }}
                  title={`Patients: ${item.patients}`}
                />
                {/* Appointment Bar */}
                <div
                  className="w-full bg-green-500 rounded-t mt-1"
                  style={{
                    height: `${getBarHeight(item.appointments)}px`,
                    opacity: 0.8,
                  }}
                  title={`Appointments: ${item.appointments}`}
                />
                {/* Message Bar */}
                <div
                  className="w-full bg-purple-500 rounded-t mt-1"
                  style={{
                    height: `${getBarHeight(item.messages)}px`,
                    opacity: 0.8,
                  }}
                  title={`Messages: ${item.messages}`}
                />
              </div>
            ))}
          </div>

          {/* X-axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
            {data.map((item, index) => (
              <span key={index} className="text-xs text-muted-foreground text-center flex-1">
                {item.date}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-xs text-muted-foreground">Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-xs text-muted-foreground">Appointments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded" />
            <span className="text-xs text-muted-foreground">Messages</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-lg font-semibold">
              {data.reduce((sum, item) => sum + item.patients, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Patients</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">
              {data.reduce((sum, item) => sum + item.appointments, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Appointments</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">
              {data.reduce((sum, item) => sum + item.messages, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Messages</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;