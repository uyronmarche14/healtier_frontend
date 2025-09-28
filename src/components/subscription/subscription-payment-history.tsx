import { PaymentRecord } from '@/types/subscription.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, DollarSign, CreditCard, Download } from 'lucide-react'

interface SubscriptionPaymentHistoryProps {
  payments: PaymentRecord[]
  className?: string
  onDownloadInvoice?: (paymentId: string) => void
}

export function SubscriptionPaymentHistory({
  payments,
  className,
  onDownloadInvoice
}: SubscriptionPaymentHistoryProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case 'refunded':
        return <Badge className="bg-blue-100 text-blue-800">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Payment History</span>
          <span className="text-sm font-normal text-muted-foreground">
            {payments.length} payments
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No payment history available</p>
            </div>
          ) : (
            payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium truncate">
                        Subscription Payment
                      </p>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(payment.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-3 w-3" />
                        <span>****{payment.method === 'card' ? '1234' : '0000'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {formatCurrency(payment.amount)}
                    </div>
                    {payment.amount > 50 && (
                      <div className="text-xs text-green-600">
                        Saved 10%
                      </div>
                    )}
                  </div>
                  
                  {payment.invoiceUrl && onDownloadInvoice && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownloadInvoice(payment.id)}
                      className="p-2"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        {payments.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="font-semibold">
                {formatCurrency(payments.reduce((sum, payment) => sum + payment.amount, 0))}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Total Savings</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(payments.reduce((sum, payment) => sum + (payment.amount * 0.1), 0))}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Alternative compact version for dashboard
export function SubscriptionPaymentHistoryCompact({
  payments,
  className,
  onDownloadInvoice
}: SubscriptionPaymentHistoryProps) {
  const recentPayments = payments.slice(0, 3)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 text-xs">Failed</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Recent Payments</span>
          <span className="text-xs font-normal text-muted-foreground">
            {recentPayments.length} of {payments.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentPayments.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No recent payments
            </div>
          ) : (
            recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium truncate">
                    Subscription Payment
                  </p>
                    {getStatusBadge(payment.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {formatCurrency(payment.amount)}
                  </div>
                  {payment.amount > 50 && (
                    <div className="text-xs text-green-600">
                      Saved 10%
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}