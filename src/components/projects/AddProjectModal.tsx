
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
    status: "Active",
    hoursPerMonth: 80,
    startDate: "",
    endDate: "",
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

  const handleDateChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: formData.name,
      status: formData.status,
      progress: 0,
      budget: 0,
      spent: 0,
      hoursLogged: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      team: [],
      tasks: {
        completed: 0,
        total: 0,
      },
    };

    updateProject(newProject.id, newProject);
    
    toast.success("Project created successfully");
    setFormData({
      name: "",
      status: "Active",
      hoursPerMonth: 80,
      startDate: "",
      endDate: "",
    });
    onClose();
  };

  const statusOptions = ["Active", "Pipeline", "On Hold", "Completed"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]" id="add-project-modal">
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
              <Label htmlFor="hoursPerMonth">Hours per Month</Label>
              <Input 
                id="hoursPerMonth" 
                name="hoursPerMonth" 
                type="number" 
                min="1" 
                max="200" 
                value={formData.hoursPerMonth} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={formData.startDate} 
                onChange={handleDateChange("startDate")}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input 
                id="endDate" 
                name="endDate" 
                type="date" 
                value={formData.endDate} 
                onChange={handleDateChange("endDate")}
              />
            </div>
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
