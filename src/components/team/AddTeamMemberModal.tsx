
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { toast } from "sonner";
import { TeamMember } from "@/context/types";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeamMemberModal = ({ isOpen, onClose }: TeamMemberModalProps) => {
  const { projects, addTeamMember } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    projects: [] as string[],
    performance: 0,
    attendance: 0,
    hoursLogged: 0,
    tasksCompleted: 0,
    tasks: 0
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newMember: TeamMember = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData
    };

    // Add the new member to context
    addTeamMember(newMember);
    toast.success("Team member added successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Position</Label>
            <Input 
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Projects</Label>
            <Select 
              value={formData.projects[0] || ""}
              onValueChange={(value) => 
                setFormData(prev => ({
                  ...prev,
                  projects: [value]
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.name}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberModal;
