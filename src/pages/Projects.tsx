import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";

const Projects = () => {
  const { projects, teamMembers } = useApp();

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Track and manage all projects.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>{project.name}</CardTitle>
                <Badge
                  className={cn(
                    project.progress >= 80 ? "bg-emerald-500" : 
                    project.progress >= 50 ? "bg-amber-500" : 
                    "bg-rose-500"
                  )}
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress}
                  className={cn(
                    "h-2",
                    project.progress >= 80 ? "bg-emerald-500" : 
                    project.progress >= 50 ? "bg-amber-500" : 
                    "bg-rose-500"
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium">${project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Spent</p>
                  <p className="font-medium">${project.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="font-medium">{format(new Date(project.startDate), "MMM dd, yyyy")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="font-medium">{format(new Date(project.endDate), "MMM dd, yyyy")}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-2">Team</p>
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => {
                    const memberData = teamMembers.find((m) => m.name === member);
                    return (
                      <Avatar key={i} className="border-2 border-background h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(member)}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted rounded-md p-2">
                  <p className="text-xs text-muted-foreground">Tasks</p>
                  <p className="font-medium">{project.tasks.total}</p>
                </div>
                <div className="bg-muted rounded-md p-2">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="font-medium">{project.tasks.completed}</p>
                </div>
                <div className="bg-muted rounded-md p-2">
                  <p className="text-xs text-muted-foreground">Days Left</p>
                  <p className="font-medium">{getDaysRemaining(project.endDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
