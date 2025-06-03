
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getHoursUsed } from "./utils/projectUtils";

interface ProjectModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Project Status</h4>
              <Badge className={cn(
                project.status === "In Progress" ? "bg-blue-500" : 
                project.status === "OnHold" ? "bg-amber-500" : 
                "bg-green-500"
              )}>
                {project.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Hours Utilization</h4>
              <div className="flex justify-between text-sm">
                <span>Used: {getHoursUsed(project)}/80 hours</span>
                <span>Remaining: {Math.max(0, 80 - getHoursUsed(project))} hours</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (getHoursUsed(project) / 80) * 100)}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Team Members</h4>
            <div className="flex flex-wrap gap-2">
              {project.team.map((member: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
