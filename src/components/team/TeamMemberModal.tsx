
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { Check, X, Plus } from "lucide-react";
import { TeamMember } from "@/context/types";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | undefined;
}

const TeamMemberModal = ({ isOpen, onClose, member }: TeamMemberModalProps) => {
  const { updateTeamMember, projects } = useApp();
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    performance: member?.performance || 0,
    actualHours: member?.actualHours || 0,
    plannedHours: member?.plannedHours || 0,
    projects: member?.projects || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "name" || name === "role" ? value : Number(value)
    }));
  };

  const handleProjectSelect = (projectName: string) => {
    if (formData.projects.includes(projectName)) {
      handleRemoveProject(projectName);
    } else {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, projectName]
      }));
    }
  };

  const handleRemoveProject = (project: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p !== project)
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
          <DialogTitle className="text-lg">Edit Team Member</DialogTitle>
          <DialogDescription className="text-sm">
            Update team member details and assignments.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="text-xs"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role" className="text-xs">Role</Label>
              <Input 
                id="role" 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="text-xs"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label className="text-xs">Projects</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.projects.map((project, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1 text-xs">
                  {project}
                  <button 
                    type="button"
                    onClick={() => handleRemoveProject(project)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between w-full text-xs">
                  Select Projects
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px] bg-popover shadow-md">
                {projects.map(project => (
                  <DropdownMenuItem
                    key={project.id}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleProjectSelect(project.name);
                    }}
                    className="flex items-center justify-between text-xs"
                  >
                    {project.name}
                    {formData.projects.includes(project.name) && (
                      <Check className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="performance" className="text-xs">Performance (%)</Label>
            <Input 
              id="performance" 
              name="performance" 
              type="number" 
              min="0" 
              max="100" 
              value={formData.performance} 
              onChange={handleChange}
              className="text-xs"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="actualHours" className="text-xs">Actual Hours</Label>
              <Input 
                id="actualHours" 
                name="actualHours" 
                type="number" 
                min="0" 
                value={formData.actualHours} 
                onChange={handleChange}
                className="text-xs"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="plannedHours" className="text-xs">Planned Hours (80h/month)</Label>
              <Input 
                id="plannedHours" 
                name="plannedHours" 
                type="number" 
                min="0" 
                max="80"
                value={formData.plannedHours} 
                onChange={handleChange}
                className="text-xs"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-sm">Cancel</Button>
          <Button onClick={handleSubmit} className="text-sm">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;
