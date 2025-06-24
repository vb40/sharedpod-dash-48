
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any | undefined;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const { updateProject, teamMembers } = useApp();
  const [formData, setFormData] = useState({
    name: project?.name || "",
    status: project?.status || "Active",
    progress: project?.progress || 0,
    hoursUsed: project?.hoursUsed || 0,
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

  const handleSubmit = () => {
    if (!project) return;
    
    updateProject(project.id, formData);
    toast.success("Project updated successfully");
    onClose();
  };

  if (!project) return null;

  const statusOptions = ["Active", "Planning", "On Hold", "Completed"];
  
  // Calculate remaining hours out of 80 hours/month
  const totalHours = 80;
  const hoursRemaining = Math.max(0, totalHours - (formData.hoursUsed || 0));
  const hoursPercentage = Math.min(100, ((formData.hoursUsed || 0) / totalHours) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
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
            <Label htmlFor="hoursUsed">Hours Used (80h/month available)</Label>
            <Input 
              id="hoursUsed" 
              name="hoursUsed" 
              type="number" 
              min="0" 
              max="80"
              value={formData.hoursUsed} 
              onChange={handleChange}
            />
            <div className="mt-1">
              <div className="flex justify-between text-xs mb-1">
                <span>{formData.hoursUsed} hours used</span>
                <span>{hoursRemaining} hours remaining</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${hoursPercentage > 90 ? 'bg-rose-500' : hoursPercentage > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${hoursPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            style={{ backgroundColor: '#0081bc', color: 'white' }}
            className="hover:opacity-90"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
