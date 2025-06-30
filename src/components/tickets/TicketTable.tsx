
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
      return 'bg-red-500 text-white border-red-500';
    case 'medium':
      return 'bg-purple-500 text-white border-purple-500';
    case 'low':
    case 'lowest':
      return 'bg-blue-500 text-white border-blue-500';
    default:
      return 'bg-gray-500 text-white border-gray-500';
  }
};

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const TicketTable = ({ tickets, onTicketClick, selectedTickets, onSelectTicket, onSelectAll }: TicketTableProps) => {
  const calculateProgress = (timeSpent: number, timeEstimate: number) => {
    if (timeEstimate === 0) return 0;
    return Math.min(Math.round((timeSpent / timeEstimate) * 100), 100);
  };

  const allTicketsSelected = tickets.length > 0 && selectedTickets.length === tickets.length;
  const someTicketsSelected = selectedTickets.length > 0 && selectedTickets.length < tickets.length;

  const handleSelectAll = () => {
    if (allTicketsSelected) {
      // Deselect all current page tickets
      const currentTicketIds = tickets.map(ticket => ticket.id);
      onSelectTicket(''); // This will trigger the parent to handle deselection
      // Call onSelectAll to handle the bulk operation
      onSelectAll();
    } else {
      // Select all current page tickets
      onSelectAll();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead className="w-12">
              <Checkbox
                checked={allTicketsSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someTicketsSelected && !allTicketsSelected;
                }}
                onCheckedChange={handleSelectAll}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
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
            const isSelected = selectedTickets.includes(ticket.id);
            
            return (
              <TableRow 
                key={ticket.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => onTicketClick(ticket)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelectTicket(ticket.id)}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                </TableCell>
                <TableCell className="font-medium text-[#FF6B35]">
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
                    {capitalizeFirst(ticket.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {capitalizeFirst(ticket.priority)}
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
