
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketModal from "@/components/tickets/TicketModal";
import { TabContent } from "@/components/tickets/TabContent";

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
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">Manage and track team tickets.</p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-accent rounded-md">All Status</TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-accent rounded-md">Active</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-accent rounded-md">Completed</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <TabContent 
            tickets={filteredTickets}
            onSearch={setSearchQuery}
            onStatusChange={setStatusFilter}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No tickets found"
          />
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <TabContent 
            tickets={filteredTickets}
            onSearch={setSearchQuery}
            onStatusChange={setStatusFilter}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No active tickets found"
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <TabContent 
            tickets={filteredTickets}
            onSearch={setSearchQuery}
            onStatusChange={setStatusFilter}
            onCreateTicket={handleCreateTicket}
            onEditTicket={handleEditTicket}
            emptyMessage="No completed tickets found"
          />
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
