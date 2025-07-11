
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

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

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "dev":
      return "bg-blue-500";
    case "in-progress":
      return "bg-amber-500";
    case "qa":
      return "bg-violet-500";
    case "uat":
      return "bg-cyan-500";
    case "completed":
      return "bg-emerald-500";
    case "done":
      return "bg-green-500";
    case "blocked":
      return "bg-rose-500";
    default:
      return "bg-gray-500";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-600 text-white";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-yellow-500 text-black";
    case "low":
      return "bg-blue-400 text-white";
    default:
      return "bg-gray-500";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "dev":
      return "Development";
    case "in-progress":
      return "In Progress";
    case "qa":
      return "QA Testing";
    case "uat":
      return "UAT";
    case "completed":
      return "Completed";
    case "done":
      return "Done";
    case "blocked":
      return "Blocked";
    default:
      return status;
  }
};

const calculateProgressPercentage = (timeSpent: number, timeEstimate: number) => {
  if (timeEstimate === 0) return 100;
  return Math.min(Math.round((timeSpent / timeEstimate) * 100), 100);
};

const TicketCard = ({ ticket, onEdit }: TicketCardProps) => {
  const progressPercentage = calculateProgressPercentage(ticket.timeSpent, ticket.timeEstimate);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 flex flex-row justify-between items-start space-y-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono">
              {ticket.id.replace('TICK-', ticket.project + '-')}
            </Badge>
            <Badge className={cn(getStatusColor(ticket.status))}>
              {getStatusLabel(ticket.status)}
            </Badge>
            <Badge className={cn(getPriorityColor(ticket.priority))}>
              {ticket.priority}
            </Badge>
          </div>
          <CardTitle className="text-base line-clamp-1">{ticket.title}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onEdit(ticket)}>
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </CardHeader>
      <CardContent className="pb-4 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{ticket.timeSpent} / {ticket.timeEstimate} hours</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(ticket.updatedAt), 'MMM d, yy')}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span>Time Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "absolute h-full left-0 top-0 rounded-full transition-all",
                  progressPercentage >= 100 ? "bg-green-500" : 
                  progressPercentage >= 66 ? "bg-amber-500" : "bg-primary"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium">Project:</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {ticket.project}
            </Badge>
          </div>
          <div>
            <span className="text-xs font-medium">Assigned to:</span>
            <span className="ml-1 text-xs font-medium">{ticket.assignee}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
