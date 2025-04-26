
import React, { createContext, useContext, useState, useCallback } from "react";
import data from "@/data/data.json";
import { initialCertifications } from "./initialData";
import { ThemeProvider, useTheme } from "./ThemeContext";
import type { AppContextType, Ticket, TeamMember, Project } from "./types";

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const [tickets, setTickets] = useState(data.tickets || []);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(data.teamMembers || []);
  const [projects, setProjects] = useState<Project[]>(data.projects || []);
  const [certifications, setCertifications] = useState(initialCertifications);

  const addTicket = (ticket: Ticket) => {
    setTickets([...tickets, ticket]);
  };

  const updateTicket = (updatedTicket: Ticket) => {
    setTickets(
      tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
    );
  };

  const deleteTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
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

  const addCertification = (certification: any) => {
    setCertifications([...certifications, certification]);
  };

  const updateCertification = (updatedCertification: any) => {
    setCertifications(
      certifications.map((cert) => 
        cert.id === updatedCertification.id ? updatedCertification : cert
      )
    );
  };

  const updateTeamMember = (memberId: string, updatedMember: Partial<TeamMember>) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, ...updatedMember } : member
    ));
  };

  const updateProject = (projectId: string, updatedProject: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, ...updatedProject } : project
    ));
  };

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const holidays = data.holidays || [
    {
      date: "2025-05-01",
      name: "Labor Day",
      type: "public"
    },
    {
      date: "2025-05-26",
      name: "Memorial Day",
      type: "public"
    },
    {
      date: "2025-06-19",
      name: "Juneteenth",
      type: "public"
    },
    {
      date: "2025-07-04",
      name: "Independence Day",
      type: "public"
    }
  ];

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
        addTicket,
        updateTicket,
        deleteTicket,
        filterTickets,
        searchTickets,
        addCertification,
        updateCertification,
        updateTeamMember,
        updateProject,
        addTeamMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

// Wrap the AppProvider with ThemeProvider
export const AppContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <AppProvider>{children}</AppProvider>
  </ThemeProvider>
);
