
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
              <div className="relative flex justify-center items-center">
                <svg 
                  className="w-16 h-16" 
                  viewBox="0 0 100 55" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M10,50 A40,40 0 1,1 90,50" 
                    stroke="#e5e7eb" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path 
                    d="M10,50 A40,40 0 1,1 90,50" 
                    stroke={
                      project.progress >= 80 ? "#10b981" : 
                      project.progress >= 50 ? "#f59e0b" : 
                      "#ef4444"
                    }
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="151"
                    strokeDashoffset={151 - (project.progress / 100 * 151)}
                    fill="none"
                  />
                  <line 
                    x1="50" 
                    y1="50" 
                    x2={50 - 30 * Math.cos((project.progress / 100 * Math.PI))} 
                    y2={50 - 30 * Math.sin((project.progress / 100 * Math.PI))}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                </svg>
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 flex items-center text-xs">
                  <Gauge className="h-3 w-3 mr-1" />
                  <span>{project.progress}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Team: {project.team.length} members</span>
                <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 w-full overflow-hidden rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
                  style={{ width: `${Math.min(100, (project.hoursLogged / 124) * 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.hoursLogged}h used</span>
                <span>80h per month</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsProgress;
