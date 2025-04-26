import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { Calendar, Clock, CheckCircle, AlertCircle, BarChart2 } from "lucide-react";
import ProjectModal from "@/components/projects/ProjectModal";

const Projects = () => {
  const { projects, teamMembers } = useApp();
  const [selectedProject, setSelectedProject] = useState<any | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getDaysRemaining = (endDate: string) => {
    const remaining = differenceInDays(new Date(endDate), new Date());
    return remaining > 0 ? remaining : 0;
  };

  const getProjectStatusIndicator = (progress: number, daysRemaining: number) => {
    const onSchedule = (progress >= 30 && daysRemaining > 15) || 
                      (progress >= 60 && daysRemaining > 5) || 
                      progress >= 90;
                      
    return onSchedule ? (
      <div className="flex items-center text-green-500 gap-1 text-sm">
        <CheckCircle className="h-4 w-4" />
        <span>On Schedule</span>
      </div>
    ) : (
      <div className="flex items-center text-amber-500 gap-1 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>Attention Needed</span>
      </div>
    );
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(undefined);
  };

  const getHoursUsed = (project: any) => {
    return project.hoursUsed || Math.floor(Math.random() * 80);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Track and manage all projects.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const daysRemaining = getDaysRemaining(project.endDate);
          const hoursUsed = getHoursUsed(project);
          const hoursRemaining = Math.max(0, 80 - hoursUsed);
          
          return (
            <Card 
              key={project.id} 
              className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer border-transparent shadow-md"
              onClick={() => handleProjectClick(project)}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80"></div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                  </div>
                  <Badge
                    className={cn(
                      "transition-all group-hover:scale-110",
                      project.status === "Active" ? "bg-green-500" : 
                      project.status === "Planning" ? "bg-blue-500" : 
                      project.status === "On Hold" ? "bg-amber-500" : 
                      "bg-rose-500"
                    )}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {getProjectStatusIndicator(project.progress, daysRemaining)}
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Progress</span>
                    </div>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-primary to-secondary transition-all duration-500 relative"
                      style={{ width: `${project.progress}%` }}
                    >
                      <span 
                        className="animate-pulse absolute inset-0 bg-white opacity-30"
                        style={{ 
                          animationDuration: "2s",
                          animationTimingFunction: "ease-in-out"
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Hours (80h/month)</span>
                    </div>
                    <span className="font-medium">{hoursUsed}h used</span>
                  </div>
                  
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500 relative",
                        hoursUsed > 70 ? "bg-rose-500" : 
                        hoursUsed > 50 ? "bg-amber-500" : 
                        "bg-emerald-500"
                      )}
                      style={{ width: `${Math.min(100, (hoursUsed / 80) * 100)}%` }}
                    >
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{hoursUsed}h used</span>
                    <span>{hoursRemaining}h remaining</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm font-medium">{format(new Date(project.endDate), "MMM dd")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                    <div className="rounded-full bg-secondary/10 p-1.5">
                      <Clock className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Days Left</p>
                      <p className="text-sm font-medium">{daysRemaining}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Team Members</div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <Avatar key={i} className="border-2 border-background h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                          {getInitials(member)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm pt-2 border-t">
                  <div>
                    <span className="text-muted-foreground mr-1">Budget:</span>
                    <span className="font-medium">${project.budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground mr-1">Spent:</span>
                    <span className="font-medium">${project.spent.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};

export default Projects;
