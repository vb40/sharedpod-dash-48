import { Button } from "@/components/ui/button";

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

interface TicketListProps {
  tickets: Ticket[];
  onCreateTicket: () => void;
  onEditTicket: (ticket: Ticket) => void;
  emptyMessage: string;
  showCreateButton?: boolean;
}

export const TicketList = ({
  tickets,
  onCreateTicket,
  onEditTicket,
  emptyMessage,
  showCreateButton = true,
}: TicketListProps) => {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">{emptyMessage}</p>
        {showCreateButton && (
          <Button onClick={onCreateTicket}>Create your first ticket</Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div 
          key={ticket.id} 
          className="border rounded-lg p-4 animate-fade-in hover:shadow-md transition-all bg-white dark:bg-card cursor-pointer"
          onClick={() => onEditTicket(ticket)}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 dark:bg-gray-800 text-xs font-medium px-2.5 py-0.5 rounded font-mono">
                  {ticket.id.replace('TICK-', ticket.project + '-')}
                </span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  ticket.status === "dev" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : 
                  ticket.status === "in-progress" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                  ticket.status === "completed" || ticket.status === "done" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                }`}>
                  {ticket.status}
                </span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  ticket.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : 
                  ticket.priority === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }`}>
                  {ticket.priority}
                </span>
              </div>
              <h3 className="text-lg font-medium mb-1">{ticket.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{ticket.description}</p>
            </div>
            
            <div className="flex flex-col justify-between space-y-4 md:w-64">
              <div>
                <div className="text-sm font-medium mb-1">Time Progress</div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      ticket.timeSpent >= ticket.timeEstimate ? "bg-green-500" : 
                      ticket.timeSpent >= (ticket.timeEstimate * 0.7) ? "bg-amber-500" : 
                      "bg-primary"
                    }`}
                    style={{ width: `${Math.min(100, (ticket.timeSpent / (ticket.timeEstimate || 1)) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{ticket.timeSpent}h spent</span>
                  <span>{ticket.timeEstimate}h estimated</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="text-sm">
                  <div className="font-medium">Assignee</div>
                  <div className="text-muted-foreground">{ticket.assignee}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
