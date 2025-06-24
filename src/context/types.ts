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
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
  filterTickets: (status: string) => Ticket[];
  searchTickets: (query: string) => Ticket[];
  addCertification: (certification: any) => void;
  updateCertification: (certification: any) => void;
  updateTeamMember: (memberId: string, updatedMember: Partial<TeamMember>) => void;
  updateProject: (projectId: string, updatedProject: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (memberId: string) => void;
}
