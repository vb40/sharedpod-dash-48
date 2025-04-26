
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";

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
              
              <div className="relative flex justify-center items-center h-16">
                <svg 
                  className="w-16 h-16 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      project.progress >= 80 ? "#10b981" : 
                      project.progress >= 50 ? "#f59e0b" : 
                      "#ef4444"
                    }
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - project.progress / 100)}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xl font-semibold">{project.progress}%</div>
                </div>
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
