
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Users, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProjectsProgress = () => {
  const { projects } = useApp();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const sortedProjects = [...projects]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  const getHoursUsed = (project: any) => {
    return project.hoursUsed || Math.floor(Math.random() * 80);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Card className="col-span-3 lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-medium">Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedProjects.map((project) => {
              const hoursUsed = getHoursUsed(project);
              const hoursRemaining = Math.max(0, 80 - hoursUsed);
              
              return (
                <div 
                  key={project.id} 
                  className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <Badge 
                        className={cn(
                          "text-xs",
                          project.status === "Active" ? "bg-green-500" : 
                          project.status === "Planning" ? "bg-blue-500" : 
                          project.status === "On Hold" ? "bg-amber-500" : 
                          "bg-rose-500"
                        )}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {hoursUsed}/80 hours
                      </div>
                      <div className="text-xs text-gray-500">
                        {hoursRemaining}h remaining
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hours Used</span>
                      <span className="font-medium">{Math.round((hoursUsed / 80) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          hoursUsed > 70 ? "bg-rose-500" : 
                          hoursUsed > 50 ? "bg-amber-500" : 
                          "bg-green-500"
                        )}
                        style={{ width: `${Math.min(100, (hoursUsed / 80) * 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{project.team.length} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                      </div>
                    </div>
                    <div className="text-xs font-medium" style={{ color: '#0066CC' }}>
                      View Details →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Project Status</h4>
                  <Badge className={cn(
                    selectedProject.status === "Active" ? "bg-green-500" : 
                    selectedProject.status === "Planning" ? "bg-blue-500" : 
                    selectedProject.status === "On Hold" ? "bg-amber-500" : 
                    "bg-rose-500"
                  )}>
                    {selectedProject.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Progress</h4>
                  <div className="text-2xl font-bold">{selectedProject.progress}%</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Hours Utilization</h4>
                <div className="flex justify-between text-sm">
                  <span>Used: {getHoursUsed(selectedProject)}/80 hours</span>
                  <span>Remaining: {Math.max(0, 80 - getHoursUsed(selectedProject))} hours</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (getHoursUsed(selectedProject) / 80) * 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Team Members</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Budget</h4>
                  <div className="text-lg font-semibold">${selectedProject.budget.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">
                    Spent: ${selectedProject.spent.toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Tasks</h4>
                  <div className="text-lg font-semibold">
                    {selectedProject.tasks.completed}/{selectedProject.tasks.total}
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round((selectedProject.tasks.completed / selectedProject.tasks.total) * 100)}% Complete
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsProgress;
