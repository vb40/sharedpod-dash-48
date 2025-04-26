
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any | undefined;
}

const TeamMemberModal = ({ isOpen, onClose, member }: TeamMemberModalProps) => {
  const { updateTeamMember } = useApp();
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    performance: member?.performance || 0,
    attendance: member?.attendance || 0,
    hoursLogged: member?.hoursLogged || 0,
    tasksCompleted: member?.tasksCompleted || 0,
    tasks: member?.tasks || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "name" || name === "role" ? value : Number(value)
    }));
  };

  const handleSubmit = () => {
    if (!member) return;
    
    updateTeamMember(member.id, formData);
    toast.success("Team member updated successfully");
    onClose();
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="performance">Performance (%)</Label>
            <Input 
              id="performance" 
              name="performance" 
              type="number" 
              min="0" 
              max="100" 
              value={formData.performance} 
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="attendance">Attendance (%)</Label>
              <Input 
                id="attendance" 
                name="attendance" 
                type="number" 
                min="0" 
                max="100" 
                value={formData.attendance} 
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="hoursLogged">Hours Logged</Label>
              <Input 
                id="hoursLogged" 
                name="hoursLogged" 
                type="number" 
                min="0" 
                value={formData.hoursLogged} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tasksCompleted">Tasks Completed</Label>
              <Input 
                id="tasksCompleted" 
                name="tasksCompleted" 
                type="number" 
                min="0" 
                value={formData.tasksCompleted} 
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tasks">Total Tasks</Label>
              <Input 
                id="tasks" 
                name="tasks" 
                type="number" 
                min="0" 
                value={formData.tasks} 
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;
