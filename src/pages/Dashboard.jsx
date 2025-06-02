
import React from "react";
import { useApp } from "@/context/AppContext";
import StatCard from "@/components/dashboard/StatCard";
import ProjectsProgress from "@/components/dashboard/ProjectsProgress";
import TeamPerformanceChart from "@/components/dashboard/TeamPerformanceChart";
import UtilizationBarChart from "@/components/dashboard/UtilizationBarChart";
import ProjectAnalyticsChart from "@/components/dashboard/ProjectAnalyticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const { projects, teamMembers } = useApp();

  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const totalTeamMembers = teamMembers.length;
  const activeTeamMembers = teamMembers.filter(m => m.status === 'Active').length;

  // Calculate utilization
  const totalUtilization = teamMembers.reduce((sum, member) => sum + member.currentUtilization, 0);
  const averageUtilization = teamMembers.length > 0 ? Math.round(totalUtilization / teamMembers.length) : 0;

  // Calculate planned utilization
  const totalPlannedUtilization = teamMembers.reduce((sum, member) => sum + member.plannedUtilization, 0);
  const averagePlannedUtilization = teamMembers.length > 0 ? Math.round(totalPlannedUtilization / teamMembers.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome back to your project management dashboard</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Members" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            {teamMembers.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={activeProjects}
          subtitle={`+2% Out of ${projects.length} total projects`}
          icon="📊"
        />
        <StatCard
          title="Team Members"
          value={totalTeamMembers}
          subtitle={`+0% Active team members`}
          icon="👥"
        />
        <StatCard
          title="Actual Utilisation"
          value={`${averageUtilization}%`}
          subtitle="+3.2% Current resource utilization"
          icon="📈"
        />
        <StatCard
          title="Planned Utilisation"
          value={`${averagePlannedUtilization}%`}
          subtitle="+1.5% Target resource utilization"
          icon="🎯"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamPerformanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilization Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <UtilizationBarChart />
          </CardContent>
        </Card>
      </div>

      {/* Projects Progress Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Progress</h2>
        <ProjectsProgress />
      </div>

      {/* Project Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Project Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectAnalyticsChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
