
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Clock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import TeamMemberModal from "@/components/team/TeamMemberModal";
import AddTeamMemberModal from "@/components/team/AddTeamMemberModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Team = () => {
  const { teamMembers, deleteTeamMember } = useApp();
  const [selectedMember, setSelectedMember] = useState<any | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-emerald-500";
    if (performance >= 80) return "text-green-500";
    if (performance >= 70) return "text-amber-500";
    if (performance >= 60) return "text-orange-500";
    return "text-rose-500";
  };

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (memberId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteTeamMember(memberId);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage your team members and their performance.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card 
            key={member.id} 
            className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-400 group bg-white dark:bg-[#242023]"
            onClick={() => handleMemberClick(member)}
          >
            <div className="relative p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover shadow-md">
                  <DropdownMenuItem onClick={(e) => handleEditMember(member, e)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleDeleteMember(member.id, e)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-background shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-lg">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span 
                    className={cn(
                      "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background",
                      member.performance >= 85 ? "bg-green-500" : 
                      member.performance >= 70 ? "bg-amber-500" : 
                      "bg-rose-500"
                    )} 
                  ></span>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-semibold">{member.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-background p-3 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Performance</p>
                    <p className={cn("font-semibold text-xs md:text-sm", getPerformanceColor(member.performance))}>
                      {member.performance}%
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
                
                <div className="flex flex-wrap gap-2">
                  {member.projects.length === 0 && (
                    <span className="text-xs text-muted-foreground">No projects assigned</span>
                  )}
                  {member.projects.map((project, i) => (
                    <Badge key={i} variant="outline" className="bg-background shadow-sm text-xs">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <TeamMemberModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        member={selectedMember} 
      />

      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Team;
