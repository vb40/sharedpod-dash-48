
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

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

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  selectedTickets: string[];
  onSelectTicket: (ticketId: string) => void;
  onSelectAll: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'done':
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'in progress':
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'blocked':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'medium':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'low':
    case 'lowest':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const TicketTable = ({ tickets, onTicketClick, selectedTickets, onSelectTicket, onSelectAll }: TicketTableProps) => {
  const calculateProgress = (timeSpent: number, timeEstimate: number) => {
    if (timeEstimate === 0) return 0;
    return Math.min(Math.round((timeSpent / timeEstimate) * 100), 100);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTickets.length === tickets.length && tickets.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="font-semibold">TICKET NO</TableHead>
            <TableHead className="font-semibold">PROJECT</TableHead>
            <TableHead className="font-semibold">TITLE</TableHead>
            <TableHead className="font-semibold">STATUS</TableHead>
            <TableHead className="font-semibold">PRIORITY</TableHead>
            <TableHead className="font-semibold">ASSIGNEE</TableHead>
            <TableHead className="font-semibold">TIME TRACKED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => {
            const progress = calculateProgress(ticket.timeSpent, ticket.timeEstimate);
            return (
              <TableRow 
                key={ticket.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => onTicketClick(ticket)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={() => onSelectTicket(ticket.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-blue-600">
                  {ticket.id}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{ticket.project}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs truncate" title={ticket.title}>
                    {ticket.title}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {ticket.assignee || 'Unassigned'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">
                        {ticket.timeSpent}h {ticket.timeSpent > 0 ? '0m' : ''} / {ticket.timeEstimate}h {ticket.timeEstimate > 0 ? '0m' : ''}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            progress >= 100 ? 'bg-green-500' : 
                            progress >= 75 ? 'bg-yellow-500' : 
                            'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {progress}%
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
