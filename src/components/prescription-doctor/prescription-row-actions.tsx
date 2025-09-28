import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DoctorPrescription } from '@/types/prescription-doctor';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Printer,
  Send,
  Trash2,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface PrescriptionRowActionsProps {
  prescription: DoctorPrescription;
  onViewDetails: (prescription: DoctorPrescription) => void;
  onEdit: (prescription: DoctorPrescription) => void;
  onPrint: (prescription: DoctorPrescription) => void;
  onSendToPharmacy: (prescription: DoctorPrescription) => void;
  onSendMessage: (prescription: DoctorPrescription) => void;
  onMarkAsFilled: (prescription: DoctorPrescription) => void;
  onCancel: (prescription: DoctorPrescription) => void;
  onDelete: (prescription: DoctorPrescription) => void;
}

export function PrescriptionRowActions({
  prescription,
  onViewDetails,
  onEdit,
  onPrint,
  onSendToPharmacy,
  onSendMessage,
  onMarkAsFilled,
  onCancel,
  onDelete
}: PrescriptionRowActionsProps) {
  const canEdit = prescription.status.name === 'draft' || prescription.status.name === 'pending';
  const canFill = prescription.status.name === 'pending';
  const canCancel = prescription.status.name === 'pending' || prescription.status.name === 'draft';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={() => onViewDetails(prescription)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        
        {canEdit && (
          <DropdownMenuItem onClick={() => onEdit(prescription)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Prescription
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => onPrint(prescription)}>
          <Printer className="mr-2 h-4 w-4" />
          Print Prescription
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSendToPharmacy(prescription)}>
          <Send className="mr-2 h-4 w-4" />
          Send to Pharmacy
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSendMessage(prescription)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Message
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {canFill && (
          <DropdownMenuItem onClick={() => onMarkAsFilled(prescription)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Filled
          </DropdownMenuItem>
        )}
        
        {canCancel && (
          <DropdownMenuItem 
            onClick={() => onCancel(prescription)}
            className="text-orange-600"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Prescription
          </DropdownMenuItem>
        )}
        
        {prescription.status.name === 'draft' && (
          <DropdownMenuItem 
            onClick={() => onDelete(prescription)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Draft
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}