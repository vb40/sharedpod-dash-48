import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import data from "@/data/data.json";

// Mock certifications data
const initialCertifications = [
  {
    id: "cert1",
    name: "AWS Solutions Architect",
    provider: "Amazon Web Services",
    dateObtained: "2024-01-15",
    expirationDate: "2026-01-15", 
    skills: ["Cloud Computing", "AWS", "Architecture"],
    level: "Professional",
    isCompleted: true
  },
  {
    id: "cert2",
    name: "Azure Administrator",
    provider: "Microsoft",
    dateObtained: "2024-02-10",
    expirationDate: "2026-02-10",
    skills: ["Cloud", "Azure", "Administration"],
    level: "Associate",
    isCompleted: true
  },
  {
    id: "cert3",
    name: "Certified Scrum Master",
    provider: "Scrum Alliance",
    dateObtained: "2023-11-05",
    expirationDate: "2025-11-05",
    skills: ["Agile", "Scrum", "Project Management"],
    level: "Intermediate",
    isCompleted: true
  },
  {
    id: "cert4",
    name: "Google Professional Cloud Architect",
    provider: "Google Cloud",
    dateObtained: "2023-09-20",
    expirationDate: null,
    skills: ["Cloud", "GCP", "Architecture"],
    level: "Professional",
    isCompleted: false
  }
];

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  teamMembers: any[];
  projects: any[];
  tickets: any[];
  certifications: any[];
  holidays: any[];
  addTicket: (ticket: any) => void;
  updateTicket: (ticket: any) => void;
  deleteTicket: (id: string) => void;
  filterTickets: (status: string) => any[];
  searchTickets: (query: string) => any[];
  addCertification: (certification: any) => void;
  updateCertification: (certification: any) => void;
  updateTeamMember: (memberId: number, updatedMember: any) => void;
  updateProject: (projectId: string, updatedProject: any) => void;
}

export const AppContext = createContext<AppContextType>({
  theme: "light",
  toggleTheme: () => {},
  teamMembers: [],
  projects: [],
  tickets: [],
  certifications: [],
  holidays: [],
  addTicket: () => {},
  updateTicket: () => {},
  deleteTicket: () => {},
  filterTickets: () => [],
  searchTickets: () => [],
  addCertification: () => {},
  updateCertification: () => {},
  updateTeamMember: () => {},
  updateProject: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [tickets, setTickets] = useState(data.tickets || []);
  const [teamMembers, setTeamMembers] = useState(data.teamMembers || []);
  const [projects, setProjects] = useState(data.projects || []);
  const [certifications, setCertifications] = useState(initialCertifications);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme || "light");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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

  const updateCertification = (updatedCertification: any) => {
    setCertifications(
      certifications.map((cert) => 
        cert.id === updatedCertification.id ? updatedCertification : cert
      )
    );
  };

  const updateTeamMember = (memberId: number, updatedMember: any) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, ...updatedMember } : member
    ));
  };

  const updateProject = (projectId: string, updatedProject: any) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, ...updatedProject } : project
    ));
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
