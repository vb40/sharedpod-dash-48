
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";
import { TicketHeader } from "./TicketHeader";
import { TicketForm } from "./TicketForm";
import { TicketFooter } from "./TicketFooter";
import { useTicketState } from "@/hooks/useTicketState";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  timeSpent: number;
  timeEstimate: number;
  comments: { author: string; text: string; timestamp: string }[];
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: Ticket;
  mode: "create" | "edit";
}

// Function to generate project code
const generateProjectCode = (projectName: string) => {
  const projectCodes: { [key: string]: string } = {
    "USHG": "USP",
    "P2P": "PSP",
    "PIMA": "PIM",
    "Metiren": "MET",
    "DN": "DNS",
    "Octapharma": "ODP",
    "FPL": "FPL",
    "ArdentMills": "ARM",
    "Paramount": "PAR",
    "SharedPod Dashboard": "SPD",
  };
  
  // Return project code or use first 3 characters of project name
  return projectCodes[projectName] || projectName.substring(0, 3).toUpperCase();
};

const TicketModal = ({ isOpen, onClose, ticket, mode }: TicketModalProps) => {
  const { addTicket, updateTicket } = useApp();
  const { formData, errors, comments, handleChange, handleSelectChange, handleAddComment, validateForm, resetForm } = useTicketState(ticket, mode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      resetForm(ticket, mode);
      setIsSubmitted(false);
    }
  }, [isOpen, ticket, mode, resetForm]);

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const projectCode = generateProjectCode(formData.project);
    const ticketId = mode === "create" 
      ? `${projectCode}-${Math.floor(Math.random() * 1000)}`
      : ticket?.id;
    
    const updatedTicket = {
      id: ticketId!,
      ...formData,
      createdAt: mode === "create" ? new Date().toISOString() : ticket!.createdAt,
      updatedAt: new Date().toISOString(),
      comments,
    };
    
    if (mode === "create") {
      addTicket(updatedTicket);
      toast.success("Ticket created successfully!");
    } else {
      updateTicket(updatedTicket);
      toast.success("Ticket updated successfully!");
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <TicketHeader mode={mode} />
        
        <TicketForm
          formData={formData}
          errors={errors}
          comments={comments}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onAddComment={handleAddComment}
        />
        
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : mode === "create" ? "Create Ticket" : "Update Ticket"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TicketModal;
