
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { toast } from "sonner";
import { TeamMember } from "@/context/types";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DialogDescription } from "@/components/ui/dialog";

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
    actualHours: 0,
    plannedHours: 0
  });
  const [customProject, setCustomProject] = useState("");
  const [showCustomProject, setShowCustomProject] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectSelect = (projectName: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.includes(projectName)
        ? prev.projects.filter(p => p !== projectName)
        : [...prev.projects, projectName]
    }));
  };

  const handleAddCustomProject = () => {
    if (customProject.trim() && !formData.projects.includes(customProject.trim())) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, customProject.trim()]
      }));
      setCustomProject("");
      setShowCustomProject(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newMember: TeamMember = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      attendance: 0,
      hoursLogged: 0,
      tasksCompleted: 0,
      tasks: 0
    };

    addTeamMember(newMember);
    toast.success("Team member added successfully");
    
    // Reset form
    setFormData({
      name: "",
      role: "",
      projects: [],
      performance: 0,
      actualHours: 0,
      plannedHours: 0
    });
    setCustomProject("");
    setShowCustomProject(false);
    onClose();
  };

  const removeProject = (projectName: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p !== projectName)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new team member to your organization.
          </DialogDescription>
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
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between flex-1">
                    Select Projects
                    <Check 
                      className={`ml-2 h-4 w-4 ${formData.projects.length === 0 ? 'opacity-0' : 'opacity-100'}`}
                    />
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
                      className="flex items-center justify-between"
                    >
                      {project.name}
                      {formData.projects.includes(project.name) && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowCustomProject(!showCustomProject)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {showCustomProject && (
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Custom project name"
                  value={customProject}
                  onChange={(e) => setCustomProject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomProject();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddCustomProject} size="sm">
                  Add
                </Button>
              </div>
            )}

            {formData.projects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.projects.map(project => (
                  <Badge key={project} variant="secondary" className="px-2 py-1">
                    {project}
                    <button
                      onClick={() => removeProject(project)}
                      className="ml-1 hover:text-destructive focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
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
