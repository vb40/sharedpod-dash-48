
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

const TicketModal = ({ isOpen, onClose, ticket, mode }: TicketModalProps) => {
  const { addTicket, updateTicket } = useApp();
  const { formData, errors, comments, handleChange, handleSelectChange, handleAddComment, validateForm, resetForm } = useTicketState(ticket, mode);

  useEffect(() => {
    if (isOpen) {
      resetForm(ticket, mode);
    }
  }, [isOpen, ticket, mode]);

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const prefix = formData.project.substring(0, 3).toUpperCase();
    const ticketId = mode === "create" 
      ? `${prefix}-${Math.floor(Math.random() * 1000)}`
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
};

export default TicketModal;
