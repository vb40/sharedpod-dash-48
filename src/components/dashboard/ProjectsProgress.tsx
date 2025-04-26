
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ProjectsProgress = () => {
  const { projects } = useApp();
  
  const sortedProjects = [...projects]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  return (
    <Card className="col-span-3 lg:col-span-2">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedProjects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{project.name}</span>
                <Badge 
                  className={cn(
                    project.progress >= 80 ? "bg-emerald-500" : 
                    project.progress >= 50 ? "bg-amber-500" : 
                    "bg-rose-500"
                  )}
                >
                  {project.progress}%
                </Badge>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <Progress 
                  value={project.progress}
                  className={cn(
                    "h-full transition-all",
                    project.progress >= 80 ? "bg-emerald-500" : 
                    project.progress >= 50 ? "bg-amber-500" : 
                    "bg-rose-500"
                  )}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Team: {project.team.length} members</span>
                <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsProgress;
