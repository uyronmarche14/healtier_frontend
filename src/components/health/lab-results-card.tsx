import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { LabResult, HealthReport } from '@/types/health.types'
import { format } from 'date-fns'

interface LabResultsCardProps {
  labResults: LabResult[]
  healthReports: HealthReport[]
  className?: string
  onViewResult?: (result: LabResult) => void
  onDownloadReport?: (report: HealthReport) => void
}

export function LabResultsCard({ 
  labResults, 
  healthReports, 
  className, 
  onViewResult, 
  onDownloadReport 
}: LabResultsCardProps) {
  const getStatusColor = (isNormal: boolean) => {
    return isNormal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getStatusIcon = (isNormal: boolean) => {
    return isNormal ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />
  }

  const getStatusText = (isNormal: boolean) => {
    return isNormal ? 'Normal' : 'Abnormal'
  }

  const formatValue = (value: number, unit: string, referenceRange: { min: number; max: number }) => {
    const isNormal = value >= referenceRange.min && value <= referenceRange.max
    return {
      value: `${value} ${unit}`,
      isNormal,
      range: `${referenceRange.min}-${referenceRange.max} ${unit}`
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Lab Results & Reports</CardTitle>
          <CardDescription>Recent test results and health reports</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Lab Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Recent Lab Results</h4>
            <Badge variant="secondary">{labResults.length} results</Badge>
          </div>
          
          <div className="space-y-3">
            {labResults.slice(0, 3).map((result) => (
              <div key={result.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium">{result.testName}</h5>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(result.createdAt), 'PPP')}
                    </p>
                  </div>
                  <Badge className={getStatusColor(result.isNormal)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(result.isNormal)}
                      <span className="capitalize">{getStatusText(result.isNormal)}</span>
                    </div>
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Result</span>
                      <span className={`text-sm font-medium ${result.isNormal ? 'text-green-600' : 'text-red-600'}`}>
                        {result.result} {result.unit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Normal Range: {result.normalRange}
                    </p>
                  </div>
                </div>
                
                {result.notes && (
                  <div className="mt-3 p-2 bg-muted rounded text-sm">
                    <strong>Notes:</strong> {result.notes}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-muted-foreground">
                    Tested at: {format(new Date(result.testedAt), 'PPP')}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onViewResult?.(result)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Reports Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Health Reports</h4>
            <Badge variant="secondary">{healthReports?.length || 0} reports</Badge>
          </div>
          
          <div className="space-y-3">
            {healthReports?.slice(0, 2).map((report) => (
              <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium">{report.reportType}</h5>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(report.createdAt), 'PPP')}
                    </p>
                  </div>
                  <Badge variant="outline">{report.reportType}</Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  {report.summary && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Summary:</strong> Health report generated on {format(new Date(report.generatedAt), 'PPP')}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Generated on: {format(new Date(report.generatedAt), 'PPP')}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDownloadReport?.(report)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button size="sm" variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Request Lab Test
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}