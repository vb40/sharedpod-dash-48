
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, BarChart2, Trash2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ProjectCardProps {
  project: any;
  onProjectClick: (project: any) => void;
  onDeleteProject: (projectId: string, projectName: string) => void;
}

const ProjectCard = ({ project, onProjectClick, onDeleteProject }: ProjectCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getHoursUsed = (project: any) => {
    return project.hoursUsed || Math.floor(Math.random() * 80);
  };

  const hoursUsed = getHoursUsed(project);
  const hoursRemaining = Math.max(0, 80 - hoursUsed);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer border-transparent shadow-md relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80"></div>
      
      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-destructive hover:text-destructive-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{project.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteProject(project.id, project.name)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div onClick={() => onProjectClick(project)}>
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base md:text-lg truncate">{project.name}</CardTitle>
            </div>
            <Badge
              className={cn(
                "transition-all group-hover:scale-110 text-xs shrink-0",
                project.status === "In Progress" ? "bg-blue-500" : 
                project.status === "OnHold" ? "bg-amber-500" : 
                "bg-green-500"
              )}
            >
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 md:space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <BarChart2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
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
            <div className="flex justify-between items-center text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <BarChart2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                <span className="font-medium hidden sm:inline">Hours (80h/month)</span>
                <span className="font-medium sm:hidden">Hours</span>
              </div>
              <span className="font-medium">{hoursUsed}/80h</span>
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
              <span>{hoursRemaining}h left</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-background p-2 md:p-3">
              <div className="rounded-full bg-primary/10 p-1 md:p-1.5">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="text-xs md:text-sm font-medium truncate">
                  {project.startDate ? format(new Date(project.startDate), "MMM dd") : "Not set"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 rounded-lg bg-background p-2 md:p-3">
              <div className="rounded-full bg-secondary/10 p-1 md:p-1.5">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">End Date</p>
                <p className="text-xs md:text-sm font-medium truncate">{format(new Date(project.endDate), "MMM dd")}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs md:text-sm font-medium">Team Members</div>
            <div className="flex -space-x-1 md:-space-x-2">
              {project.team.map((member, i) => (
                <HoverCard key={i}>
                  <HoverCardTrigger>
                    <Avatar className="border-2 border-background h-6 w-6 md:h-8 md:w-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                        {getInitials(member)}
                      </AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    {member}
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectCard;
