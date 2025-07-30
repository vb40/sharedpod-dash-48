
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { apiService } from "@/services/api";
import { toast } from "sonner";
import type { AppContextType, Ticket, TeamMember, Project, Holiday } from "./types";

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [
          ticketsData,
          teamMembersData,
          projectsData
        ] = await Promise.all([
          apiService.getTickets(),
          apiService.getTeamMembers(),
          apiService.getProjects()
        ]);

        setTickets(ticketsData || []);
        setTeamMembers(teamMembersData || []);
        setProjects(projectsData || []);
        setCertifications([]);
        setHolidays([]);
      } catch (error) {
        console.error('Failed to load data:', error);
        toast.error('Failed to load data from server');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addTicket = async (ticket: Omit<Ticket, 'id'>) => {
    try {
      const newTicket = await apiService.createTicket(ticket);
      setTickets(prev => [...prev, newTicket]);
      toast.success('Ticket created successfully');
    } catch (error) {
      console.error('Failed to create ticket:', error);
      toast.error('Failed to create ticket');
      throw error;
    }
  };

  const updateTicket = async (updatedTicket: Ticket) => {
    try {
      const updated = await apiService.updateTicket(updatedTicket.id, updatedTicket);
      setTickets(prev => 
        prev.map(ticket => ticket.id === updatedTicket.id ? updated : ticket)
      );
      toast.success('Ticket updated successfully');
    } catch (error) {
      console.error('Failed to update ticket:', error);
      toast.error('Failed to update ticket');
      throw error;
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      await apiService.deleteTicket(id);
      setTickets(prev => prev.filter(ticket => ticket.id !== id));
      toast.success('Ticket deleted successfully');
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      toast.error('Failed to delete ticket');
      throw error;
    }
  };

  const filterTickets = useCallback(
    (status: string) => {
      return tickets.filter((ticket) => ticket.status === status);
    },
    [tickets]
  );

  const searchTickets = useCallback(
    (query: string) => {
      const searchTerm = query.toLowerCase();
      return tickets.filter((ticket) => {
        return (
          ticket.title.toLowerCase().includes(searchTerm) ||
          ticket.description.toLowerCase().includes(searchTerm) ||
          ticket.assignee.toLowerCase().includes(searchTerm) ||
          ticket.project.toLowerCase().includes(searchTerm) ||
          ticket.status.toLowerCase().includes(searchTerm) ||
          ticket.priority.toLowerCase().includes(searchTerm)
        );
      });
    },
    [tickets]
  );

  const addCertification = async (certification: any) => {
    try {
      const newCertification = await apiService.createCertification(certification);
      setCertifications(prev => [...prev, newCertification]);
      toast.success('Certification added successfully');
    } catch (error) {
      console.error('Failed to add certification:', error);
      toast.error('Failed to add certification');
      throw error;
    }
  };

  const updateCertification = async (updatedCertification: any) => {
    try {
      const updated = await apiService.updateCertification(updatedCertification.id, updatedCertification);
      setCertifications(prev =>
        prev.map(cert => cert.id === updatedCertification.id ? updated : cert)
      );
      toast.success('Certification updated successfully');
    } catch (error) {
      console.error('Failed to update certification:', error);
      toast.error('Failed to update certification');
      throw error;
    }
  };

  const updateTeamMember = async (memberId: string, updatedMember: Partial<TeamMember>) => {
    try {
      const updated = await apiService.updateTeamMember(memberId, updatedMember);
      setTeamMembers(prev => 
        prev.map(member => member.id === memberId ? { ...member, ...updated } : member)
      );
      toast.success('Team member updated successfully');
    } catch (error) {
      console.error('Failed to update team member:', error);
      toast.error('Failed to update team member');
      throw error;
    }
  };

  const updateProject = async (projectId: string, updatedProject: Partial<Project>) => {
    try {
      const updated = await apiService.updateProject(projectId, updatedProject);
      setProjects(prev => {
        const existingProject = prev.find(p => p.id === projectId);
        if (existingProject) {
          return prev.map(project => 
            project.id === projectId ? { ...project, ...updated } : project
          );
        } else {
          return [...prev, updated as Project];
        }
      });
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await apiService.deleteProject(projectId);
      setProjects(prev => prev.filter(project => project.id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
      throw error;
    }
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    try {
      const newMember = await apiService.createTeamMember(member);
      setTeamMembers(prev => [...prev, newMember]);
      toast.success('Team member added successfully');
    } catch (error) {
      console.error('Failed to add team member:', error);
      toast.error('Failed to add team member');
      throw error;
    }
  };

  const deleteTeamMember = async (memberId: string) => {
    try {
      await apiService.deleteTeamMember(memberId);
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success('Team member deleted successfully');
    } catch (error) {
      console.error('Failed to delete team member:', error);
      toast.error('Failed to delete team member');
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        teamMembers,
        projects,
        tickets,
        certifications,
        holidays,
        loading,
        addTicket,
        updateTicket,
        deleteTicket,
        filterTickets,
        searchTickets,
        addCertification,
        updateCertification,
        updateTeamMember,
        updateProject,
        deleteProject,
        addTeamMember,
        deleteTeamMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <AppProvider>{children}</AppProvider>
  </ThemeProvider>
);
