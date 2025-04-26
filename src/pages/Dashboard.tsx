
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useLocation } from "react-router-dom";
import { ActivitySquare, Clock, Users, CalendarDays, Search } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ProjectAnalyticsChart from "@/components/dashboard/ProjectAnalyticsChart";
import TeamPerformanceChart from "@/components/dashboard/TeamPerformanceChart";
import ProjectsProgress from "@/components/dashboard/ProjectsProgress";
import AttendanceTracker from "@/components/dashboard/AttendanceTracker";
import HolidaysCard from "@/components/dashboard/HolidaysCard";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const location = useLocation();
  const { teamMembers, projects, tickets, searchTickets } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  
  // Initialize search query from location state if available
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      setFilteredTickets(searchTickets(location.state.searchQuery));
    }
  }, [location.state, searchTickets]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setFilteredTickets(searchTickets(query));
    } else {
      setFilteredTickets(tickets);
    }
  };
  
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

      {/* Local Search for Dashboard */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="max-w-md pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        {searchQuery && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Search Results ({filteredTickets.length})</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="p-4 border rounded-lg bg-card animate-fade-in">
                  <div className="flex justify-between">
                    <span className="font-medium">{ticket.id}</span>
                    <span className="text-sm px-2 py-1 bg-primary/10 rounded-full">{ticket.status}</span>
                  </div>
                  <h4 className="mt-2 font-medium">{ticket.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
