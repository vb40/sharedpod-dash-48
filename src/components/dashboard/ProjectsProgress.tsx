
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ProjectsProgress = () => {
  const { projects } = useApp();
  
  // Sort projects by progress for better visualization
  const sortedProjects = [...projects]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5); // Show top 5 projects

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
              <Progress 
                value={project.progress}
                className="h-2"
                indicatorClassName={cn(
                  project.progress >= 80 ? "bg-emerald-500" : 
                  project.progress >= 50 ? "bg-amber-500" : 
                  "bg-rose-500"
                )}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Budget: ${project.budget.toLocaleString()}</span>
                <span>Spent: ${project.spent.toLocaleString()} ({Math.round((project.spent/project.budget)*100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsProgress;
