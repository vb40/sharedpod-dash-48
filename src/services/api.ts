
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
  async getTickets() {
    return this.request('/tickets');
  }

  async createTicket(ticket: any) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateTicket(id: string, ticket: any) {
    return this.request(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticket),
    });
  }

  async deleteTicket(id: string) {
    return this.request(`/tickets/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects API
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(project: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Team Members API
  async getTeamMembers() {
    return this.request('/team-members');
  }

  async createTeamMember(member: any) {
    return this.request('/team-members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateTeamMember(id: string, member: any) {
    return this.request(`/team-members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  }

  async deleteTeamMember(id: string) {
    return this.request(`/team-members/${id}`, {
      method: 'DELETE',
    });
  }

  // Certifications API
  async getCertifications() {
    return this.request('/certifications');
  }

  async createCertification(certification: any) {
    return this.request('/certifications', {
      method: 'POST',
      body: JSON.stringify(certification),
    });
  }

  async updateCertification(id: string, certification: any) {
    return this.request(`/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(certification),
    });
  }

  async deleteCertification(id: string) {
    return this.request(`/certifications/${id}`, {
      method: 'DELETE',
    });
  }

  // Holidays API
  async getHolidays() {
    return this.request('/holidays');
  }
}

export const apiService = new ApiService();
