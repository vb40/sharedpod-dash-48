
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
        <CardTitle className="font-medium">Project Progress</CardTitle>
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
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
                <Progress 
                  value={project.progress}
                  className={cn(
                    "h-full transition-all relative",
                    project.progress >= 80 ? "bg-emerald-500" : 
                    project.progress >= 50 ? "bg-amber-500" : 
                    "bg-rose-500"
                  )}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-0.5 bg-white/30 animate-pulse" style={{ width: `${project.progress}%` }} />
                  </span>
                </Progress>
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
