import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PrescriptionStats } from '@/types/prescription-doctor';
import { FileText, Clock, CheckCircle, XCircle, AlertTriangle, Zap } from 'lucide-react';

interface PrescriptionStatsCardsProps {
  stats: PrescriptionStats;
}

export function PrescriptionStatsCards({ stats }: PrescriptionStatsCardsProps) {
  const statCards = [
    {
      title: 'Total Prescriptions',
      value: stats.total,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Filled',
      value: stats.filled,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Expired',
      value: stats.expired,
      icon: AlertTriangle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Urgent',
      value: stats.urgent,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <CardDescription className="text-xs">
                {card.title === 'Total Prescriptions' 
                  ? `${((card.value / Math.max(stats.total, 1)) * 100).toFixed(0)}% of total`
                  : `${((card.value / Math.max(stats.total, 1)) * 100).toFixed(0)}% of total`
                }
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}