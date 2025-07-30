
import type { Ticket, TeamMember, Project, Holiday } from "@/context/types";
import type { Certification } from "@/components/certifications/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Tickets API
  async getTickets(): Promise<Ticket[]> {
    return this.request<Ticket[]>('/tickets');
  }

  async createTicket(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    return this.request<Ticket>('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateTicket(id: string, ticket: Partial<Ticket>): Promise<Ticket> {
    return this.request<Ticket>(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticket),
    });
  }

  async deleteTicket(id: string): Promise<void> {
    return this.request<void>(`/tickets/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects API
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Team Members API
  async getTeamMembers(): Promise<TeamMember[]> {
    return this.request<TeamMember[]>('/members');
  }

  async createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    return this.request<TeamMember>('/members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
    return this.request<TeamMember>(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  }

  async deleteTeamMember(id: string): Promise<void> {
    return this.request<void>(`/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Certifications API
  async getCertifications(): Promise<Certification[]> {
    return this.request<Certification[]>('/certifications');
  }

  async createCertification(certification: Omit<Certification, 'id'>): Promise<Certification> {
    return this.request<Certification>('/certifications', {
      method: 'POST',
      body: JSON.stringify(certification),
    });
  }

  async updateCertification(id: string, certification: Partial<Certification>): Promise<Certification> {
    return this.request<Certification>(`/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(certification),
    });
  }

  async deleteCertification(id: string): Promise<void> {
    return this.request<void>(`/certifications/${id}`, {
      method: 'DELETE',
    });
  }

  // Holidays API
  async getHolidays(): Promise<Holiday[]> {
    return this.request<Holiday[]>('/holidays');
  }
}

export const apiService = new ApiService();
