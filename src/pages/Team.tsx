
import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Calendar, Briefcase, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Team = () => {
  const { teamMembers } = useApp();

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">Manage your team members and their performance.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden border-none shadow-lg bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"></div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-background">
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
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-background p-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Performance</p>
                    <p className={cn("font-semibold", getPerformanceColor(member.performance))}>
                      {member.performance}%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-xl bg-background p-3">
                  <div className="rounded-full bg-secondary/10 p-2">
                    <Clock className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="font-semibold">{member.hoursLogged}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-xl bg-background p-3">
                  <div className="rounded-full bg-accent/10 p-2">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="font-semibold">{member.tasksCompleted}/{member.tasks}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-xl bg-background p-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className="font-semibold">{member.attendance}%</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Projects</p>
                  <p className="text-xs text-muted-foreground">{member.projects.length}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {member.projects.length === 0 && (
                    <span className="text-sm text-muted-foreground">No projects assigned</span>
                  )}
                  {member.projects.map((project, i) => (
                    <Badge key={i} variant="outline" className="bg-background">
                      <Briefcase className="h-3 w-3 mr-1" /> {project}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={cn(
                      "h-4 w-4", 
                      i < Math.round(member.performance / 20) 
                        ? "text-amber-400 fill-amber-400" 
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
