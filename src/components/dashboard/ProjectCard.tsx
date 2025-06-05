
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Calendar, BarChart2 } from "lucide-react";
import { format, isValid } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getHoursUsed, getInitials } from "./utils/projectUtils";

interface ProjectCardProps {
  project: any;
  onClick: (project: any) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const hoursUsed = getHoursUsed(project);
  const hoursRemaining = Math.max(0, 80 - hoursUsed);

  // Helper function to safely format dates
  const formatDate = (dateValue: any, fallback: string = "Not set") => {
    if (!dateValue) return fallback;
    
    const date = new Date(dateValue);
    if (!isValid(date)) return fallback;
    
    return format(date, "MMM dd");
  };

  return (
    <Card 
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-400 shadow-md w-full h-full bg-white dark:bg-[#242023]"
      onClick={() => onClick(project)}
    >
      
      {/* <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80"></div> */}
      
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
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-primary to-secondary transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
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
                "h-full rounded-full transition-all duration-500",
                hoursUsed > 70 ? "bg-rose-500" : 
                hoursUsed > 50 ? "bg-amber-500" : 
                "bg-emerald-500"
              )}
              style={{ width: `${Math.min(100, (hoursUsed / 80) * 100)}%` }}
            />
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
              <p className="text-xs md:text-sm font-medium truncate">{formatDate(project.startDate)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-lg bg-background p-2 md:p-3">
            <div className="rounded-full bg-secondary/10 p-1 md:p-1.5">
              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="text-xs md:text-sm font-medium truncate">{formatDate(project.endDate)}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs md:text-sm font-medium">Team Members</div>
          <div className="flex -space-x-1 md:-space-x-2">
            {project.team.map((member: string, index: number) => (
              <HoverCard key={index}>
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
    </Card>
  );
};

export default ProjectCard;
