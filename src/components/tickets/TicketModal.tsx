
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: Ticket;
  mode: "create" | "edit";
}

const statusOptions = [
  { value: "dev", label: "Development" },
  { value: "in-progress", label: "In Progress" },
  { value: "qa", label: "QA Testing" },
  { value: "uat", label: "UAT" },
  { value: "completed", label: "Completed" },
  { value: "done", label: "Done" },
  { value: "blocked", label: "Blocked" },
];

const priorityOptions = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

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

  // Populate form when editing existing ticket
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
    } else {
      // Set defaults for new ticket
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

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    if (mode === "create") {
      addTicket(formData);
    } else if (ticket) {
      updateTicket({
        ...ticket,
        ...formData,
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New Ticket" : "Edit Ticket"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => handleSelectChange("assignee", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignee && <p className="text-xs text-destructive">{errors.assignee}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={formData.project}
                onValueChange={(value) => handleSelectChange("project", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project && <p className="text-xs text-destructive">{errors.project}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="timeSpent">Time Spent (hours)</Label>
              <Input
                id="timeSpent"
                name="timeSpent"
                type="number"
                min="0"
                step="0.5"
                value={formData.timeSpent}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="timeEstimate">Time Estimate (hours)</Label>
              <Input
                id="timeEstimate"
                name="timeEstimate"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.timeEstimate}
                onChange={handleChange}
              />
              {errors.timeEstimate && <p className="text-xs text-destructive">{errors.timeEstimate}</p>}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create" : "Update"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
