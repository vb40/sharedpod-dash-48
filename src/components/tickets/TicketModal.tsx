
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";
import { TicketHeader } from "./TicketHeader";
import { TicketForm } from "./TicketForm";
import { TicketFooter } from "./TicketFooter";
import { useTicketState } from "@/hooks/useTicketState";

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
    "User Experience Portal": "USP",
    "Payment Processing System": "PSP",
    "Octapharma Dashboard": "ODP",
    "Customer Feedback System": "CFS",
    "Employee Portal": "EMP",
    "Learning Management System": "LMS",
    "Inventory System": "INV",
  };
  
  // Return project code or use first 3 characters of project name
  return projectCodes[projectName] || projectName.substring(0, 3).toUpperCase();
};

const TicketModal = ({ isOpen, onClose, ticket, mode }: TicketModalProps) => {
  const { addTicket, updateTicket } = useApp();
  const { formData, errors, comments, handleChange, handleSelectChange, handleAddComment, validateForm, resetForm } = useTicketState(ticket, mode);
  
  useEffect(() => {
    if (isOpen) {
      resetForm(ticket, mode);
    }
  }, [isOpen, ticket, mode, resetForm]);

  const handleSubmit = () => {
    if (!validateForm()) return;
    
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
    } else {
      updateTicket(updatedTicket);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <TicketHeader mode={mode} />
        
        <TicketForm
          formData={formData}
          errors={errors}
          comments={comments}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onAddComment={handleAddComment}
        />
        
        <TicketFooter 
          mode={mode}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default TicketModal;
