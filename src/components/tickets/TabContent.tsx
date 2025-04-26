
import { TicketList } from "./TicketList";
import TicketFilter from "./TicketFilter";

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

interface TabContentProps {
  tickets: Ticket[];
  onSearch: (query: string) => void;
  onStatusChange: (status: string | null) => void;
  onCreateTicket: () => void;
  onEditTicket: (ticket: Ticket) => void;
  emptyMessage: string;
}

export const TabContent = ({
  tickets,
  onSearch,
  onStatusChange,
  onCreateTicket,
  onEditTicket,
  emptyMessage,
}: TabContentProps) => {
  return (
    <>
      <TicketFilter 
        onSearch={onSearch}
        onStatusChange={onStatusChange}
        onCreateTicket={onCreateTicket}
      />
      
      <TicketList 
        tickets={tickets}
        onCreateTicket={onCreateTicket}
        onEditTicket={onEditTicket}
        emptyMessage={emptyMessage}
      />
    </>
  );
};
