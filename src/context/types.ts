export interface TeamMember {
  id: string;
  name: string;
  role: string;
  projects: string[];
  performance: number;
  attendance: number;
  hoursLogged: number;
  tasksCompleted: number;
  tasks: number;
  actualHours: number;
  plannedHours: number;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  budget: number;
  spent: number;
  hoursLogged: number;
  endDate: string;
  team: string[];
  tasks: {
    completed: number;
    total: number;
    inProgress?: number;
    blocked?: number;
  };
  startDate?: string;
}

export interface Ticket {
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
  comments: { author: string; text: string; timestamp: string }[];
}

export interface Holiday {
  date: string;
  name: string;
  type: string;
}

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  teamMembers: TeamMember[];
  projects: Project[];
  tickets: Ticket[];
  certifications: any[];
  holidays: Holiday[];
  loading?: boolean;
  addTicket: (ticket: Omit<Ticket, 'id'>) => Promise<void>;
  updateTicket: (ticket: Ticket) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  filterTickets: (status: string) => Ticket[];
  searchTickets: (query: string) => Ticket[];
  addCertification: (certification: any) => Promise<void>;
  updateCertification: (certification: any) => Promise<void>;
  updateTeamMember: (memberId: string, updatedMember: Partial<TeamMember>) => Promise<void>;
  updateProject: (projectId: string, updatedProject: Partial<Project>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  deleteTeamMember: (memberId: string) => Promise<void>;
}
