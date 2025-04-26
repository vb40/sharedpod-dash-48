
import React, { createContext, useContext, useEffect, useState } from "react";
import data from "../data/data.json";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  projects: string[];
  performance: number;
  hoursLogged: number;
  avatar: string;
  tasks: number;
  tasksCompleted: number;
  attendance: number;
}

interface Project {
  id: string;
  name: string;
  progress: number;
  status: string;
  team: string[];
  hoursLogged: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    blocked: number;
  };
}

interface Comment {
  author: string;
  text: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  timeSpent: number;
  timeEstimate: number;
  comments: Comment[];
}

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface AppContextType {
  teamMembers: TeamMember[];
  projects: Project[];
  tickets: Ticket[];
  holidays: Holiday[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "comments">) => void;
  updateTicket: (ticket: Ticket) => void;
  filterTickets: (status: string | null) => Ticket[];
  searchTickets: (query: string) => Ticket[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(data.teamMembers);
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [tickets, setTickets] = useState<Ticket[]>(data.tickets);
  const [holidays, setHolidays] = useState<Holiday[]>(data.holidays);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Add a new ticket
  const addTicket = (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "comments">) => {
    const newTicket: Ticket = {
      ...ticket,
      id: `TICK-${String(tickets.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    
    setTickets([...tickets, newTicket]);
  };

  // Update an existing ticket
  const updateTicket = (updatedTicket: Ticket) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === updatedTicket.id 
        ? { ...updatedTicket, updatedAt: new Date().toISOString() } 
        : ticket
    );
    
    setTickets(updatedTickets);
  };

  // Filter tickets by status
  const filterTickets = (status: string | null) => {
    if (!status) return tickets;
    return tickets.filter(ticket => ticket.status === status);
  };

  // Search tickets
  const searchTickets = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return tickets.filter(
      ticket => 
        ticket.title.toLowerCase().includes(lowercaseQuery) ||
        ticket.description.toLowerCase().includes(lowercaseQuery) ||
        ticket.assignee.toLowerCase().includes(lowercaseQuery) ||
        ticket.project.toLowerCase().includes(lowercaseQuery) ||
        ticket.id.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    teamMembers,
    projects,
    tickets,
    holidays,
    theme,
    toggleTheme,
    addTicket,
    updateTicket,
    filterTickets,
    searchTickets
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
