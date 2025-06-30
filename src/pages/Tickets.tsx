
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import TicketModal from "@/components/tickets/TicketModal";
import { TabContent } from "@/components/tickets/TabContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  comments: { author: string; text: string; timestamp: string }[];
}

const Tickets = () => {
  const { tickets, addTicket, updateTicket } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTicket, setEditTicket] = useState<Ticket | undefined>(undefined);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchQuery, statusFilter]);

  const filterTickets = () => {
    let filtered = [...tickets];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    setFilteredTickets(filtered);
  };

  const handleCreateTicket = () => {
    setEditTicket(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditTicket(ticket);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const getTicketsByStatus = (status: string) => {
    return filteredTickets.filter((ticket) => ticket.status === status);
  };

  const getAllTickets = () => filteredTickets;

  const getInProgressTickets = () => {
    return filteredTickets.filter((ticket) => 
      ticket.status === "in-progress" || ticket.status === "dev"
    );
  };

  const getCompletedTickets = () => {
    return filteredTickets.filter((ticket) => 
      ticket.status === "completed" || ticket.status === "done"
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">
          Manage and track your project tickets and tasks.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({getAllTickets().length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({getInProgressTickets().length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({getCompletedTickets().length})
          </TabsTrigger>
          <TabsTrigger value="blocked">
            Blocked ({getTicketsByStatus("blocked").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <TabContent
            tickets={getAllTickets()}
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No tickets found. Create your first ticket to get started."
          />
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <TabContent
            tickets={getInProgressTickets()}
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No tickets in progress. Move some tickets to in-progress status."
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <TabContent
            tickets={getCompletedTickets()}
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No completed tickets yet. Complete some tickets to see them here."
          />
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          <TabContent
            tickets={getTicketsByStatus("blocked")}
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No blocked tickets. This is good news!"
          />
        </TabsContent>
      </Tabs>

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={editTicket}
        mode={modalMode}
      />
    </div>
  );
};

export default Tickets;
