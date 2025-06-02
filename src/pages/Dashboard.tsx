
import StatCard from "@/components/dashboard/StatCard";
import ProjectsProgress from "@/components/dashboard/ProjectsProgress";
import UtilizationBarChart from "@/components/dashboard/UtilizationBarChart";
import { useApp } from "@/context/AppContext";
import { Briefcase, Users, TrendingUp, Target, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { projects, teamMembers } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);

  // Calculate stats for statcards
  const activeProjects = projects.filter(project => 
    project.status === "Active" || project.status === "In Progress"
  ).length;
  
  const totalTeamMembers = teamMembers.length;

  // Mock utilization data - in a real app this would come from backend
  const actualUtilization = 78; // percentage
  const plannedUtilization = 85; // percentage

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Welcome back to your project management dashboard
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={memberFilter} onValueChange={setMemberFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {teamMembers.map(member => (
                <SelectItem key={member.id} value={member.name}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Projects"
          value={activeProjects}
          description={`Out of ${projects.length} total projects`}
          icon={<Briefcase className="h-4 w-4 md:h-5 md:w-5" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard 
          title="Team Members"
          value={totalTeamMembers}
          description="Active team members"
          icon={<Users className="h-4 w-4 md:h-5 md:w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard 
          title="Actual Utilisation"
          value={`${actualUtilization}%`}
          description="Current resource utilization"
          icon={<TrendingUp className="h-4 w-4 md:h-5 md:w-5" />}
          trend={{ value: 3.2, isPositive: actualUtilization > 75 }}
        />
        <StatCard 
          title="Planned Utilisation"
          value={`${plannedUtilization}%`}
          description="Target resource utilization"
          icon={<Target className="h-4 w-4 md:h-5 md:w-5" />}
          trend={{ value: 1.5, isPositive: true }}
        />
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div className="w-full">
          <ProjectsProgress 
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            memberFilter={memberFilter}
          />
        </div>
        <div className="w-full">
          <UtilizationBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
