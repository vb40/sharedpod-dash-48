import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import data from "@/data/data.json";

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  teamMembers: any[];
  projects: any[];
  tickets: any[];
  certifications: any[];
  addTicket: (ticket: any) => void;
  updateTicket: (ticket: any) => void;
  deleteTicket: (id: string) => void;
  filterTickets: (status: string) => any[];
  searchTickets: (query: string) => any[];
  addCertification?: (certification: any) => void;
}

export const AppContext = createContext<AppContextType>({
  theme: "light",
  toggleTheme: () => {},
  teamMembers: [],
  projects: [],
  tickets: [],
  certifications: [],
  addTicket: () => {},
  updateTicket: () => {},
  deleteTicket: () => {},
  filterTickets: () => [],
  searchTickets: () => [],
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [tickets, setTickets] = useState(data.tickets || []);
  const [certifications, setCertifications] = useState(data.certifications || []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme || "light");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const addTicket = (ticket: any) => {
    setTickets([...tickets, ticket]);
  };

  const updateTicket = (updatedTicket: any) => {
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

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        teamMembers: data.teamMembers,
        projects: data.projects,
        tickets,
        certifications,
        addTicket,
        updateTicket,
        deleteTicket,
        filterTickets,
        searchTickets,
        addCertification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
