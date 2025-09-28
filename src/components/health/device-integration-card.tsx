import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Smartphone, Watch, Heart, Activity, Wifi, WifiOff, Battery, AlertTriangle } from 'lucide-react'
import { ConnectedDevice } from '@/types/health.types'
import { format } from 'date-fns'

interface DeviceIntegrationCardProps {
  devices: ConnectedDevice[]
  className?: string
  onSyncDevice?: (device: ConnectedDevice) => void
  onDisconnectDevice?: (device: ConnectedDevice) => void
}

export function DeviceIntegrationCard({ 
  devices, 
  className, 
  onSyncDevice, 
  onDisconnectDevice 
}: DeviceIntegrationCardProps) {
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'fitness_tracker':
        return <Watch className="h-5 w-5" />
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />
      case 'smart_watch':
        return <Watch className="h-5 w-5" />
      case 'blood_pressure_monitor':
        return <Heart className="h-5 w-5" />
      case 'glucose_meter':
        return <Activity className="h-5 w-5" />
      default:
        return <Smartphone className="h-5 w-5" />
    }
  }

  const getConnectionStatus = (isConnected: boolean, lastSync?: string) => {
    if (!isConnected) {
      return {
        status: 'Disconnected',
        color: 'text-red-500',
        icon: <WifiOff className="h-4 w-4" />
      }
    }
    
    if (lastSync) {
      const lastSyncTime = new Date(lastSync)
      const now = new Date()
      const hoursDiff = (now.getTime() - lastSyncTime.getTime()) / (1000 * 60 * 60)
      
      if (hoursDiff > 24) {
        return {
          status: 'Sync Required',
          color: 'text-yellow-500',
          icon: <AlertTriangle className="h-4 w-4" />
        }
      }
    }
    
    return {
      status: 'Connected',
      color: 'text-green-500',
      icon: <Wifi className="h-4 w-4" />
    }
  }

  const getBatteryColor = (batteryLevel: number) => {
    if (batteryLevel > 50) return 'text-green-500'
    if (batteryLevel > 20) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Connected Devices</CardTitle>
          <CardDescription>Health devices and fitness trackers</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          Add Device
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {devices.length === 0 ? (
          <div className="text-center py-8">
            <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No connected devices</p>
            <Button className="mt-3" size="sm">
              Connect First Device
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {devices.map((device) => {
              const connection = getConnectionStatus(device.isConnected, device.lastSyncAt?.toString())
              
              return (
                <div key={device.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {getDeviceIcon(device.deviceType)}
                      </div>
                      <div>
                        <h4 className="font-medium">{device.deviceName}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {device.deviceType.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 ${connection.color}`}>
                        {connection.icon}
                        <span className="text-xs">{connection.status}</span>
                      </div>
                      <Badge variant="outline">
                        <Battery className="h-3 w-3 mr-1" />
                        <span className={getBatteryColor(device.batteryLevel || 0)}>
                          {device.batteryLevel || 0}%
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Device Data */}
                  {device.supportedMetrics && device.supportedMetrics.length > 0 && (
                    <div className="mb-3 p-3 bg-muted rounded-lg">
                      <h5 className="text-sm font-medium mb-2">Supported Metrics</h5>
                      <div className="flex flex-wrap gap-2">
                        {device.supportedMetrics.slice(0, 6).map((metric: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {metric.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Device Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {device.lastSyncAt && (
                        <span>
                          Last sync: {format(new Date(device.lastSyncAt), 'PPp')}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {device.isConnected && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onSyncDevice?.(device)}
                        >
                          <Activity className="h-4 w-4 mr-2" />
                          Sync Now
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => onDisconnectDevice?.(device)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Device Categories */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">Supported Devices</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { type: 'fitness_tracker', name: 'Fitness Trackers' },
              { type: 'smart_watch', name: 'Smart Watches' },
              { type: 'blood_pressure_monitor', name: 'BP Monitors' },
              { type: 'glucose_meter', name: 'Glucose Meters' }
            ].map((category) => (
              <div key={category.type} className="p-3 border rounded-lg text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="mx-auto mb-2">
                  {getDeviceIcon(category.type)}
                </div>
                <p className="text-xs font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sync Status */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Data Sync Status</h4>
              <p className="text-xs text-muted-foreground">
                {devices.filter(d => d.isConnected).length} devices connected
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}