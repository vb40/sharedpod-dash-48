import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import TicketCard from "@/components/tickets/TicketCard";
import TicketModal from "@/components/tickets/TicketModal";
import TicketFilter from "@/components/tickets/TicketFilter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

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
  const { tickets, filterTickets, searchTickets } = useApp();
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  useEffect(() => {
    let results = tickets;
    
    if (statusFilter) {
      results = filterTickets(statusFilter);
    }
    
    if (searchQuery) {
      results = searchTickets(searchQuery);
    }
    
    if (currentTab === "active") {
      results = results.filter(ticket => !["completed", "done"].includes(ticket.status));
    } else if (currentTab === "completed") {
      results = results.filter(ticket => ["completed", "done"].includes(ticket.status));
    }
    
    setFilteredTickets(results);
  }, [tickets, statusFilter, searchQuery, currentTab, filterTickets, searchTickets]);

  const handleCreateTicket = () => {
    setModalMode("create");
    setSelectedTicket(undefined);
    setIsModalOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setModalMode("edit");
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalMode === "create" || modalMode === "edit") {
      toast.success(modalMode === "create" ? "Ticket created successfully" : "Ticket updated successfully");
    }
  };

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">Manage and track team tickets.</p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <TicketFilter 
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
          />
          
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No tickets found</p>
              <Button onClick={handleCreateTicket}>Create your first ticket</Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onEdit={handleEditTicket} 
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <TicketFilter 
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
          />
          
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No active tickets found</p>
              <Button onClick={handleCreateTicket}>Create a new ticket</Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onEdit={handleEditTicket} 
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <TicketFilter 
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onCreateTicket={handleCreateTicket}
          />
          
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed tickets found</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onEdit={handleEditTicket} 
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <TicketModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticket={selectedTicket}
        mode={modalMode}
      />
    </div>
  );
};

export default Tickets;
