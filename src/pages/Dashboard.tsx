
import StatCard from "@/components/dashboard/StatCard";
import TeamPerformanceChart from "@/components/dashboard/TeamPerformanceChart";
import ProjectsProgress from "@/components/dashboard/ProjectsProgress";
import ProjectAnalyticsChart from "@/components/dashboard/ProjectAnalyticsChart";
import AttendanceTracker from "@/components/dashboard/AttendanceTracker";
import HolidaysCard from "@/components/dashboard/HolidaysCard";
import { useApp } from "@/context/AppContext";
import { Clock, Briefcase, Users, BarChart2 } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const { tickets, projects, teamMembers } = useApp();

  // Calculate stats for statcards
  const completedTickets = tickets.filter(ticket => 
    ticket.status === "completed" || ticket.status === "done"
  ).length;
  
  const totalTickets = tickets.length;
  const completionRate = totalTickets > 0 
    ? Math.round((completedTickets / totalTickets) * 100) 
    : 0;

  const activeProjects = projects.filter(project => 
    project.status === "Active"
  ).length;
  
  const totalTeamMembers = teamMembers.length;

  // Calculate average team performance
  const avgPerformance = teamMembers.length > 0
    ? Math.round(teamMembers.reduce((acc, member) => acc + member.performance, 0) / teamMembers.length)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to your project management dashboard
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Ticket Completion"
          value={`${completionRate}%`}
          description={`${completedTickets} / ${totalTickets} tickets`}
          icon={<Clock className="h-5 w-5" />}
          trend={completionRate > 50 ? "up" : "down"}
          trendValue="+5.2%"
        />
        <StatCard 
          title="Active Projects"
          value={activeProjects}
          description={`Out of ${projects.length} total projects`}
          icon={<Briefcase className="h-5 w-5" />}
          trend="up"
          trendValue="+2"
        />
        <StatCard 
          title="Team Members"
          value={totalTeamMembers}
          description="Active team members"
          icon={<Users className="h-5 w-5" />}
          trend="none"
          trendValue="0"
        />
        <StatCard 
          title="Team Performance"
          value={`${avgPerformance}%`}
          description="Average performance score"
          icon={<BarChart2 className="h-5 w-5" />}
          trend={avgPerformance > 75 ? "up" : "down"}
          trendValue={avgPerformance > 75 ? "+3.1%" : "-2.4%"}
        />
      </div>
      
      <div className="grid gap-6 grid-cols-3">
        <ProjectsProgress />
        <HolidaysCard />
      </div>
      
      <div className="grid gap-6 grid-cols-3">
        <ProjectAnalyticsChart />
      </div>
      
      <div className="grid gap-6 grid-cols-3">
        <TeamPerformanceChart />
        <AttendanceTracker />
      </div>
    </div>
  );
};

export default Dashboard;
