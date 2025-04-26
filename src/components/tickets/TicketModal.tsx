
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";
import { TicketHeader } from "./TicketHeader";
import { TicketForm } from "./TicketForm";
import { TicketFooter } from "./TicketFooter";

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
  const { teamMembers, projects, addTicket, updateTicket } = useApp();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "dev",
    priority: "medium",
    assignee: "",
    project: "",
    timeSpent: 0,
    timeEstimate: 0,
  });
  
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    assignee: "",
    project: "",
    timeEstimate: "",
  });

  const [comments, setComments] = useState<{ author: string; text: string; timestamp: string }[]>([]);

  useEffect(() => {
    if (ticket && mode === "edit") {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        assignee: ticket.assignee,
        project: ticket.project,
        timeSpent: ticket.timeSpent,
        timeEstimate: ticket.timeEstimate,
      });
      setComments(ticket.comments);
    } else {
      setFormData({
        title: "",
        description: "",
        status: "dev",
        priority: "medium",
        assignee: "",
        project: "",
        timeSpent: 0,
        timeEstimate: 0,
      });
      setComments([]);
    }
  }, [ticket, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {
      title: !formData.title.trim() ? "Title is required" : "",
      description: !formData.description.trim() ? "Description is required" : "",
      assignee: !formData.assignee ? "Assignee is required" : "",
      project: !formData.project ? "Project is required" : "",
      timeEstimate: formData.timeEstimate <= 0 ? "Time estimate must be greater than 0" : "",
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "timeSpent" || name === "timeEstimate" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddComment = (text: string) => {
    const newComment = {
      author: teamMembers[0].name,
      text,
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

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
          teamMembers={teamMembers}
          projects={projects}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onAddComment={handleAddComment}
          currentUser={teamMembers[0].name}
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
