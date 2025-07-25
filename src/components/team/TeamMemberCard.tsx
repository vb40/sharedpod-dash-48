
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TeamMember } from "@/context/types";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

interface TeamMemberCardProps {
  member: TeamMember;
  onMemberClick: (member: TeamMember) => void;
  onEditMember: (member: TeamMember, e: React.MouseEvent) => void;
  onDeleteMember: (memberId: string, e: React.MouseEvent) => void;
}

const TeamMemberCard = ({ member, onMemberClick, onEditMember, onDeleteMember }: TeamMemberCardProps) => {
  const { projects } = useApp();
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-emerald-500";
    if (utilization >= 80) return "text-green-500";
    if (utilization >= 70) return "text-amber-500";
    if (utilization >= 60) return "text-orange-500";
    return "text-rose-500";
  };

  const handleProjectClick = (projectName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects.find(p => p.name === projectName);
    if (project) {
      navigate('/projects');
      // Small delay to ensure navigation completes before triggering project modal
      setTimeout(() => {
        const projectCard = document.querySelector(`[data-project-id="${project.id}"]`);
        if (projectCard) {
          (projectCard as HTMLElement).click();
        }
      }, 100);
    }
  };

  // Calculate utilization percentage based on planned hours (80h max)
  const utilizationPercentage = Math.round(((member.plannedHours || 0) / 80) * 100);

  return (
    <Card 
      id="member-card"
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-400 group bg-white dark:bg-[#242023]"
      onClick={() => onMemberClick(member)}
    >
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative">
              <Avatar className="h-16 w-16 border-4 border-background shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-lg">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <span 
                className={cn(
                  "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background",
                  utilizationPercentage >= 85 ? "bg-green-500" : 
                  utilizationPercentage >= 70 ? "bg-amber-500" : 
                  "bg-rose-500"
                )} 
              ></span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold truncate">{member.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover shadow-md">
              <DropdownMenuItem onClick={(e) => onEditMember(member, e)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => onDeleteMember(member.id, e)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-background p-3 shadow-sm">
            <div className="rounded-full bg-primary/10 p-2">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Utilisation</p>
              <p className={cn("font-semibold text-xs md:text-sm", getUtilizationColor(utilizationPercentage))}>
                {utilizationPercentage}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-xl bg-background p-3 shadow-sm">
            <div className="rounded-full bg-secondary/10 p-2">
              <Clock className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Actual Hours</p>
              <p className="font-semibold text-xs md:text-sm">{member.actualHours || 0}h</p>
            </div>
          </div>
          
          <div className="col-span-2 flex items-center gap-2 rounded-xl bg-background p-3 shadow-sm">
            <div className="rounded-full bg-accent/10 p-2">
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Planned Hours (80h/month)</p>
              <p className="font-semibold text-xs md:text-sm">{member.plannedHours || 0}/80h</p>
              <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    (member.plannedHours || 0) > 70 ? "bg-rose-500" : 
                    (member.plannedHours || 0) > 50 ? "bg-amber-500" : 
                    "bg-emerald-500"
                  )}
                  style={{ width: `${Math.min(100, ((member.plannedHours || 0) / 80) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm font-medium">Projects</p>
            <p className="text-xs text-muted-foreground">{member.projects.length}</p>
          </div>
          
          <div className="flex flex-wrap gap-2" id="member-projects">
            {member.projects.length === 0 && (
              <span className="text-xs text-muted-foreground">No projects assigned</span>
            )}
            {member.projects.map((project, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="bg-background shadow-sm text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => handleProjectClick(project, e)}
              >
                {project}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamMemberCard;
