
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";

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

interface FormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  project: string;
  timeSpent: number;
  timeEstimate: number;
}

interface FormErrors {
  title?: string;
  description?: string;
  assignee?: string;
  project?: string;
  timeEstimate?: string;
}

export function useTicketState(ticket?: Ticket, mode: "create" | "edit" = "create") {
  const { teamMembers } = useApp();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "dev",
    priority: "medium",
    assignee: "",
    project: "",
    timeSpent: 0,
    timeEstimate: 0,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [comments, setComments] = useState<{ author: string; text: string; timestamp: string }[]>([]);

  const resetForm = (ticket?: Ticket, mode: "create" | "edit" = "create") => {
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
    setErrors({});
  };

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
    setComments(prev => [...prev, newComment]);
  };

  return {
    formData,
    errors,
    comments,
    handleChange,
    handleSelectChange,
    handleAddComment,
    validateForm,
    resetForm,
  };
}
