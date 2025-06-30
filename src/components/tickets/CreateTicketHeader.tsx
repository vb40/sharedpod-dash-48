
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateTicketHeaderProps {
  onCreateJiraTicket: (ticketId: string) => void;
  onCreateManualTicket: () => void;
  onFetchTickets: (projectName: string) => void;
}

const CreateTicketHeader = ({ onCreateJiraTicket, onCreateManualTicket, onFetchTickets }: CreateTicketHeaderProps) => {
  const [jiraTicketId, setJiraTicketId] = useState("");
  const [projectName, setProjectName] = useState("");

  const handleCreateJira = () => {
    if (jiraTicketId.trim()) {
      onCreateJiraTicket(jiraTicketId.trim());
      setJiraTicketId("");
    }
  };

  const handleFetchTickets = () => {
    if (projectName.trim()) {
      onFetchTickets(projectName.trim());
      setProjectName("");
    }
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Create Ticket Row */}
      <div className="flex flex-wrap gap-4 items-center justify-end">
        <Input
          placeholder="Enter Ticket No"
          className="w-64"
          value={jiraTicketId}
          onChange={(e) => setJiraTicketId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreateJira()}
        />
        <Button 
          onClick={handleCreateJira}
          disabled={!jiraTicketId.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Create (Jira)
        </Button>
        <Button 
          onClick={onCreateManualTicket}
          className="bg-green-600 hover:bg-green-700"
        >
          + Create (Manual)
        </Button>
      </div>

      {/* Fetch Tickets Row */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Enter project name or key"
          className="w-64"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleFetchTickets()}
        />
        <Button 
          onClick={handleFetchTickets}
          disabled={!projectName.trim()}
          variant="outline"
        >
          Fetch Tickets
        </Button>
      </div>
    </div>
  );
};

export default CreateTicketHeader;
