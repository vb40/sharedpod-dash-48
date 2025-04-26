
import { useApp } from "@/context/AppContext";
import { ActivitySquare, Clock, Users, CalendarDays } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ProjectAnalyticsChart from "@/components/dashboard/ProjectAnalyticsChart";
import TeamPerformanceChart from "@/components/dashboard/TeamPerformanceChart";
import ProjectsProgress from "@/components/dashboard/ProjectsProgress";
import AttendanceTracker from "@/components/dashboard/AttendanceTracker";
import HolidaysCard from "@/components/dashboard/HolidaysCard";

const Dashboard = () => {
  const { teamMembers, projects, tickets } = useApp();
  
  // Calculate some stats for the dashboard
  const totalProjects = projects.length;
  const totalTeamMembers = teamMembers.length;
  
  // Total logged hours across all team members
  const totalHoursLogged = teamMembers.reduce(
    (sum, member) => sum + member.hoursLogged,
    0
  );
  
  // Average team performance
  const avgPerformance = Math.round(
    teamMembers.reduce((sum, member) => sum + member.performance, 0) / teamMembers.length
  );
  
  // Count active tickets
  const activeTickets = tickets.filter(
    ticket => !["completed", "done"].includes(ticket.status)
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the SharedPod dashboard.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Projects"
          value={totalProjects}
          icon={<ActivitySquare className="h-4 w-4" />}
          description="Across multiple domains"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Hours Logged"
          value={totalHoursLogged.toLocaleString()}
          icon={<Clock className="h-4 w-4" />}
          description="This month"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Team Members"
          value={totalTeamMembers}
          icon={<Users className="h-4 w-4" />}
          description="Across all departments"
          trend={{ value: 4, isPositive: true }}
        />
        <StatCard 
          title="Active Tickets"
          value={activeTickets}
          icon={<CalendarDays className="h-4 w-4" />}
          description="Requiring attention"
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectAnalyticsChart />
        <TeamPerformanceChart />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectsProgress />
        <AttendanceTracker />
        <HolidaysCard />
      </div>
    </div>
  );
};

export default Dashboard;
