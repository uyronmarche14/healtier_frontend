import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Send, Pill } from 'lucide-react';
import { CreatePrescriptionData, PrescriptionMedication } from '@/types/prescription-doctor';

interface PrescriptionFormProps {
  patientId: string;
  patientName: string;
  appointmentId?: string;
  onSubmit: (data: CreatePrescriptionData) => void;
  onCancel: () => void;
}

interface MedicationFormData extends Omit<PrescriptionMedication, 'id'> {
  id?: string;
}

export function PrescriptionForm({ 
  patientId, 
  patientName, 
  appointmentId, 
  onSubmit, 
  onCancel 
}: PrescriptionFormProps) {
  const [medications, setMedications] = useState<MedicationFormData[]>([]);
  const [notes, setNotes] = useState('');
  const [instructions, setInstructions] = useState('');
  const [priority, setPriority] = useState<'routine' | 'urgent' | 'stat'>('routine');
  const [validUntil, setValidUntil] = useState('');

  const addMedication = () => {
    const newMed: MedicationFormData = {
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      quantity: 0,
      unit: 'tablets',
      route: 'oral'
    };
    setMedications([...medications, newMed]);
  };

  const updateMedication = (index: number, field: keyof MedicationFormData, value: any) => {
    const updated = [...medications];
    updated[index] = { ...updated[index], [field]: value };
    setMedications(updated);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prescriptionData: CreatePrescriptionData = {
      patientId,
      appointmentId,
      medications: medications.map(({ id, ...med }) => med),
      notes,
      instructions,
      priority,
      validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
    
    onSubmit(prescriptionData);
  };

  const isValid = medications.length > 0 && medications.every(med => 
    med.name && med.dosage && med.frequency && med.duration && med.quantity > 0
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Prescription for {patientName}</CardTitle>
          <CardDescription>Create a new prescription for your patient</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="stat">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              placeholder="Add any relevant medical notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>General Instructions</Label>
            <Textarea
              placeholder="General instructions for the patient..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Medications</h3>
          <Button type="button" variant="outline" size="sm" onClick={addMedication}>
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>

        {medications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Pill className="h-12 w-12 mb-4" />
              <p>No medications added yet</p>
              <p className="text-sm">Click "Add Medication" to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {medications.map((medication, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Medication {index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedication(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Medication Name *</Label>
                      <Input
                        placeholder="e.g., Amoxicillin"
                        value={medication.name}
                        onChange={(e) => updateMedication(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dosage *</Label>
                      <Input
                        placeholder="e.g., 500mg"
                        value={medication.dosage}
                        onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Frequency *</Label>
                      <Input
                        placeholder="e.g., 3 times daily"
                        value={medication.frequency}
                        onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Duration *</Label>
                      <Input
                        placeholder="e.g., 7 days"
                        value={medication.duration}
                        onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        min="1"
                        placeholder="21"
                        value={medication.quantity || ''}
                        onChange={(e) => updateMedication(index, 'quantity', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Select
                        value={medication.unit}
                        onValueChange={(value) => updateMedication(index, 'unit', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tablets">Tablets</SelectItem>
                          <SelectItem value="capsules">Capsules</SelectItem>
                          <SelectItem value="ml">mL</SelectItem>
                          <SelectItem value="inhaler">Inhaler</SelectItem>
                          <SelectItem value="tube">Tube</SelectItem>
                          <SelectItem value="bottle">Bottle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Route</Label>
                      <Select
                        value={medication.route}
                        onValueChange={(value) => updateMedication(index, 'route', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oral">Oral</SelectItem>
                          <SelectItem value="topical">Topical</SelectItem>
                          <SelectItem value="inhalation">Inhalation</SelectItem>
                          <SelectItem value="injection">Injection</SelectItem>
                          <SelectItem value="intramuscular">Intramuscular</SelectItem>
                          <SelectItem value="intravenous">Intravenous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Special Instructions</Label>
                    <Textarea
                      placeholder="Any special instructions for this medication..."
                      value={medication.instructions}
                      onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid}>
          <Save className="h-4 w-4 mr-2" />
          Save Prescription
        </Button>
      </div>
    </form>
  );
}