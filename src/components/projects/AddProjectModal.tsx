
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { Project } from "@/context/types";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal = ({ isOpen, onClose }: AddProjectModalProps) => {
  const { projects, updateProject } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    status: "In Progress",
    progress: 0,
    endDate: "",
    team: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "name" ? value : Number(value)
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, endDate: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: formData.name,
      status: formData.status,
      progress: formData.progress,
      budget: 0,
      spent: 0,
      hoursLogged: 0,
      endDate: formData.endDate,
      team: [],
      tasks: {
        completed: 0,
        total: 0,
      },
    };

    // Add to projects list (using updateProject with new ID)
    updateProject(newProject.id, newProject);
    
    toast.success("Project created successfully");
    setFormData({
      name: "",
      status: "In Progress",
      progress: 0,
      endDate: "",
      team: [],
    });
    onClose();
  };

  const statusOptions = ["In Progress", "OnHold", "Completed"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="Enter project name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input 
                id="progress" 
                name="progress" 
                type="number" 
                min="0" 
                max="100" 
                value={formData.progress} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="endDate">End Date *</Label>
            <Input 
              id="endDate" 
              name="endDate" 
              type="date" 
              value={formData.endDate} 
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
