import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, AlertTriangle, Phone, User, MapPin, Calendar, FileText, Edit, Printer, Share2  } from 'lucide-react'
import { EmergencyMedicalInfo } from '@/types/health.types'
import { format } from 'date-fns'

interface EmergencyMedicalCardProps {
  emergencyInfo: EmergencyMedicalInfo
  className?: string
  onEdit?: () => void
  onPrint?: () => void
  onShare?: () => void
}

export function EmergencyMedicalCard({ 
  emergencyInfo, 
  className, 
  onEdit, 
  onPrint, 
  onShare 
}: EmergencyMedicalCardProps) {
  const getBloodTypeColor = (bloodType?: string) => {
    if (!bloodType) return 'bg-gray-100 text-gray-800';
    const colors: Record<string, string> = {
      'A+': 'bg-red-100 text-red-800',
      'A-': 'bg-red-100 text-red-800',
      'B+': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-100 text-blue-800',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-100 text-purple-800',
      'O+': 'bg-green-100 text-green-800',
      'O-': 'bg-green-100 text-green-800'
    }
    return colors[bloodType] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle>Emergency Medical Information</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
        <CardDescription>
          Critical medical information for emergency situations.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Emergency Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <Badge className={getBloodTypeColor(emergencyInfo.bloodType)}>
                  {emergencyInfo.bloodType}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <p className="font-medium">
                  {emergencyInfo.allergies.length > 0 
                    ? `${emergencyInfo.allergies.length} known allergies` 
                    : 'No known allergies'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Medical Conditions</p>
                <p className="font-medium">
                  {emergencyInfo.medicalConditions.length > 0 
                    ? `${emergencyInfo.medicalConditions.length} conditions` 
                    : 'No major conditions'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Insurance Provider</p>
                <p className="font-medium">
                  {emergencyInfo.insuranceInfo?.provider || 'Not specified'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Primary Emergency Contact</p>
                <p className="font-medium">
                  {emergencyInfo.emergencyContacts[0]?.name || 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Policy Number</p>
                <p className="font-medium">
                  {emergencyInfo.insuranceInfo?.policyNumber || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Allergies */}
        {emergencyInfo.allergies.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Allergies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {emergencyInfo.allergies.map((allergy, index) => (
                <div key={index} className="p-3 border-l-4 border-red-500 bg-red-50">
                  <p className="font-medium text-red-800">{allergy}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Conditions */}
        {emergencyInfo.medicalConditions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-blue-600 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Medical Conditions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {emergencyInfo.medicalConditions.map((condition, index) => (
                <div key={index} className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <p className="font-medium text-blue-800">{condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Medications */}
        {emergencyInfo.currentMedications && emergencyInfo.currentMedications.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-purple-600" />
              <h4 className="font-medium text-purple-900">Current Medications</h4>
            </div>
            <div className="space-y-2">
              {emergencyInfo.currentMedications.map((medication, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{medication}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4 text-blue-600" />
            <h4 className="font-medium text-blue-900">Emergency Contacts</h4>
          </div>
          <div className="space-y-2">
            {emergencyInfo.emergencyContacts.map((contact, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{contact.name} ({contact.relationship})</p>
                <p className="text-blue-600">{contact.phone}</p>
                {contact.isPrimary && <Badge variant="secondary" className="mt-1">Primary</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Primary Physician */}
        {emergencyInfo.primaryPhysician && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-green-900">Primary Physician</h4>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{emergencyInfo.primaryPhysician.name}</p>
              <p className="text-sm text-green-600">{emergencyInfo.primaryPhysician.phone}</p>
              <p className="text-sm">{emergencyInfo.primaryPhysician.hospital}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={onEdit} size="sm" variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Edit Information
          </Button>
          <Button onClick={onPrint} size="sm" variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Print Card
          </Button>
          <Button onClick={onShare} size="sm" variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Insurance Information */}
        {emergencyInfo.insuranceInfo && (
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Insurance Information</p>
            <p className="font-medium">{emergencyInfo.insuranceInfo.provider}</p>
            <p className="text-sm text-muted-foreground">Policy: {emergencyInfo.insuranceInfo.policyNumber}</p>
            {emergencyInfo.insuranceInfo.groupNumber && (
              <p className="text-sm text-muted-foreground">Group: {emergencyInfo.insuranceInfo.groupNumber}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}