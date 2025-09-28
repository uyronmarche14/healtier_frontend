'use client';

import { useState, useMemo } from 'react';
import { DataTable } from '@/components/ui/dataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PrescriptionStatusBadge,
  PrescriptionPriorityBadge,
  PrescriptionPatientInfo,
  PrescriptionMedicationList,
  PrescriptionTimeDisplay,
  PrescriptionRowActions,
  PrescriptionStatsCards,
  PrescriptionForm
} from '@/components/prescription-doctor';
import { DoctorPrescription, CreatePrescriptionData } from '@/types/prescription-doctor';
import { mockPrescriptions, mockPrescriptionStats } from '@/data/mock-prescription-doctor';
import { Search, Plus, FileText, Filter } from 'lucide-react';

export default function DoctorPrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState<DoctorPrescription[]>(mockPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPatientForPrescription, setSelectedPatientForPrescription] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Filter prescriptions based on search term
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(prescription =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medications.some(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [prescriptions, searchTerm]);

  // Group prescriptions by status for tabs
  const prescriptionsByStatus = useMemo(() => {
    return {
      all: filteredPrescriptions,
      pending: filteredPrescriptions.filter(p => p.status.name === 'pending'),
      filled: filteredPrescriptions.filter(p => p.status.name === 'filled'),
      drafts: filteredPrescriptions.filter(p => p.status.name === 'draft'),
      other: filteredPrescriptions.filter(p => 
        !['pending', 'filled', 'draft'].includes(p.status.name)
      )
    };
  }, [filteredPrescriptions]);

  // Action handlers
  const handleViewDetails = (prescription: DoctorPrescription) => {
    console.log('View details:', prescription.id);
  };

  const handleEdit = (prescription: DoctorPrescription) => {
    console.log('Edit prescription:', prescription.id);
  };

  const handlePrint = (prescription: DoctorPrescription) => {
    console.log('Print prescription:', prescription.id);
  };

  const handleSendToPharmacy = (prescription: DoctorPrescription) => {
    console.log('Send to pharmacy:', prescription.id);
  };

  const handleSendMessage = (prescription: DoctorPrescription) => {
    console.log('Send message:', prescription.id);
  };

  const handleMarkAsFilled = (prescription: DoctorPrescription) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === prescription.id 
        ? { 
            ...p, 
            status: { 
              id: '3', 
              name: 'filled', 
              color: 'bg-green-100 text-green-800', 
              label: 'Filled' 
            },
            filledAt: new Date(),
            filledBy: 'Pharmacy Central'
          }
        : p
    ));
  };

  const handleCancel = (prescription: DoctorPrescription) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === prescription.id 
        ? { 
            ...p, 
            status: { 
              id: '5', 
              name: 'cancelled', 
              color: 'bg-red-100 text-red-800', 
              label: 'Cancelled' 
            }
          }
        : p
    ));
  };

  const handleDelete = (prescription: DoctorPrescription) => {
    setPrescriptions(prev => prev.filter(p => p.id !== prescription.id));
  };

  const handleCreatePrescription = (data: CreatePrescriptionData) => {
    const newPrescription: DoctorPrescription = {
      id: `pres-${Date.now()}`,
      patientId: data.patientId,
      patientName: selectedPatientForPrescription?.name || 'Unknown Patient',
      patientEmail: 'patient@email.com',
      doctorId: 'doctor-1',
      doctorName: 'Dr. Sarah Johnson',
      appointmentId: data.appointmentId,
      medications: data.medications.map((med, index) => ({
        id: `med-${Date.now()}-${index}`,
        ...med
      })),
      status: { 
        id: '2', 
        name: 'pending', 
        color: 'bg-yellow-100 text-yellow-800', 
        label: 'Pending' 
      },
      notes: data.notes,
      instructions: data.instructions,
      validUntil: data.validUntil,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalItems: data.medications.length,
      priority: data.priority
    };

    setPrescriptions(prev => [newPrescription, ...prev]);
    setShowCreateForm(false);
    setSelectedPatientForPrescription(null);
  };

  const handleQuickCreate = () => {
    // For demo purposes, use a mock patient
    setSelectedPatientForPrescription({
      id: 'patient-new',
      name: 'New Patient'
    });
    setShowCreateForm(true);
  };

  // Define columns for the data table
  const columns: ColumnDef<DoctorPrescription>[] = [
    {
      accessorKey: 'patientName',
      header: 'Patient',
      cell: ({ row }) => (
        <PrescriptionPatientInfo 
          patient={{
            name: row.original.patientName,
            email: row.original.patientEmail,
            phone: row.original.patientPhone
          }}
          showAvatar={true}
          showDetails={false}
        />
      ),
    },
    {
      accessorKey: 'medications',
      header: 'Medications',
      cell: ({ row }) => (
        <PrescriptionMedicationList 
          medications={row.original.medications} 
          compact={true} 
        />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <PrescriptionStatusBadge status={row.original.status} />
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <PrescriptionPriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <PrescriptionTimeDisplay
          createdAt={row.original.createdAt}
          validUntil={row.original.validUntil}
          filledAt={row.original.filledAt}
          showIcons={false}
        />
      ),
    },
    {
      accessorKey: 'totalItems',
      header: 'Items',
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs">
          {row.original.totalItems}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <PrescriptionRowActions
          prescription={row.original}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onPrint={handlePrint}
          onSendToPharmacy={handleSendToPharmacy}
          onSendMessage={handleSendMessage}
          onMarkAsFilled={handleMarkAsFilled}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  if (showCreateForm && selectedPatientForPrescription) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <PrescriptionForm
          patientId={selectedPatientForPrescription.id}
          patientName={selectedPatientForPrescription.name}
          onSubmit={handleCreatePrescription}
          onCancel={() => {
            setShowCreateForm(false);
            setSelectedPatientForPrescription(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
          <p className="text-muted-foreground">Manage patient prescriptions</p>
        </div>
        <Button onClick={handleQuickCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Stats Cards */}
      <PrescriptionStatsCards stats={mockPrescriptionStats} />

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All ({prescriptionsByStatus.all.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({prescriptionsByStatus.pending.length})</TabsTrigger>
            <TabsTrigger value="filled">Filled ({prescriptionsByStatus.filled.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({prescriptionsByStatus.drafts.length})</TabsTrigger>
            <TabsTrigger value="other">Other ({prescriptionsByStatus.other.length})</TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <DataTable 
            columns={columns} 
            data={prescriptionsByStatus.all}
            pagination
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <DataTable 
            columns={columns} 
            data={prescriptionsByStatus.pending}
            pagination
          />
        </TabsContent>

        <TabsContent value="filled" className="space-y-4">
          <DataTable 
            columns={columns} 
            data={prescriptionsByStatus.filled}
            pagination
          />
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <DataTable 
            columns={columns} 
            data={prescriptionsByStatus.drafts}
            pagination
          />
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <DataTable 
            columns={columns} 
            data={prescriptionsByStatus.other}
            pagination
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}