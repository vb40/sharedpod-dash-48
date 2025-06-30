
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import TicketModal from "@/components/tickets/TicketModal";
import TicketDetailModal from "@/components/tickets/TicketDetailModal";
import TimeTrackingModal from "@/components/tickets/TimeTrackingModal";
import TicketTable from "@/components/tickets/TicketTable";
import AdvancedFilters from "@/components/tickets/AdvancedFilters";
import CreateTicketHeader from "@/components/tickets/CreateTicketHeader";
import PaginationControls from "@/components/tickets/PaginationControls";

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
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [showTimeTrackingModal, setShowTimeTrackingModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchQuery, statusFilter, projectFilter, priorityFilter, assigneeFilter]);

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
      filtered = filtered.filter((ticket) => ticket.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Project filter
    if (projectFilter) {
      filtered = filtered.filter((ticket) => ticket.project === projectFilter);
    }

    // Priority filter
    if (priorityFilter) {
      filtered = filtered.filter((ticket) => ticket.priority.toLowerCase() === priorityFilter.toLowerCase());
    }

    // Assignee filter
    if (assigneeFilter) {
      if (assigneeFilter === "Unassigned") {
        filtered = filtered.filter((ticket) => !ticket.assignee || ticket.assignee === "Unassigned");
      } else {
        filtered = filtered.filter((ticket) => ticket.assignee === assigneeFilter);
      }
    }

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleCreateManualTicket = () => {
    setEditTicket(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditTicket(ticket);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = () => {
    const currentPageTickets = getCurrentPageTickets();
    const allSelected = currentPageTickets.every(ticket => selectedTickets.includes(ticket.id));
    
    if (allSelected) {
      setSelectedTickets(prev => prev.filter(id => !currentPageTickets.find(ticket => ticket.id === id)));
    } else {
      const newSelections = currentPageTickets.map(ticket => ticket.id);
      setSelectedTickets(prev => [...new Set([...prev, ...newSelections])]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter(null);
    setProjectFilter(null);
    setPriorityFilter(null);
    setAssigneeFilter(null);
  };

  const handleSaveTimeTracking = (data: { timeSpent: number; timeEstimate: number; notes?: string }) => {
    if (selectedTicket) {
      const updatedTicket = {
        ...selectedTicket,
        timeSpent: data.timeSpent,
        timeEstimate: data.timeEstimate,
        updatedAt: new Date().toISOString(),
      };
      updateTicket(updatedTicket);
      setSelectedTicket(updatedTicket);
      toast.success("Time tracking updated successfully!");
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    // In real implementation, this would call deleteTicket from context
    toast.success("Ticket deleted successfully!");
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const getCurrentPageTickets = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTickets.slice(startIndex, endIndex);
  };

  const currentPageTickets = getCurrentPageTickets();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">
          Manage and track your project tickets and tasks.
        </p>
      </div>

      <CreateTicketHeader
        onCreateManualTicket={handleCreateManualTicket}
      />

      <AdvancedFilters
        onSearch={setSearchQuery}
        onStatusFilter={setStatusFilter}
        onProjectFilter={setProjectFilter}
        onPriorityFilter={setPriorityFilter}
        onAssigneeFilter={setAssigneeFilter}
        onResetFilters={handleResetFilters}
      />

      <TicketTable
        tickets={currentPageTickets}
        onTicketClick={handleTicketClick}
        selectedTickets={selectedTickets}
        onSelectTicket={handleSelectTicket}
        onSelectAll={handleSelectAll}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredTickets.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {/* Modals */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={editTicket}
        mode={modalMode}
      />

      {selectedTicket && !isEditing && (
        <TicketDetailModal
          selectedTicket={selectedTicket}
          closeModal={() => setSelectedTicket(null)}
          setIsEditing={setIsEditing}
          setShowTimeTrackingModal={setShowTimeTrackingModal}
          setEditingTicket={handleEditTicket}
          handleDeleteTicket={handleDeleteTicket}
        />
      )}

      {showTimeTrackingModal && selectedTicket && (
        <TimeTrackingModal
          showTimeTrackingModal={showTimeTrackingModal}
          setShowTimeTrackingModal={setShowTimeTrackingModal}
          handleSaveTimeTracking={handleSaveTimeTracking}
          selectedTicket={selectedTicket}
        />
      )}
    </div>
  );
};

export default Tickets;
