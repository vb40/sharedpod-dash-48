
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

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

interface TicketDetailModalProps {
  selectedTicket: Ticket;
  closeModal: () => void;
  setIsEditing: (editing: boolean) => void;
  setShowTimeTrackingModal: (show: boolean) => void;
  setEditingTicket: (ticket: Ticket) => void;
  handleDeleteTicket: (ticketId: string) => void;
}

const TicketDetailModal = ({
  selectedTicket,
  closeModal,
  setIsEditing,
  setShowTimeTrackingModal,
  setEditingTicket,
  handleDeleteTicket
}: TicketDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const parseTimeString = (timeValue: number) => {
    const hours = Math.floor(timeValue);
    const minutes = Math.round((timeValue - hours) * 60);
    return { hours, minutes, total: timeValue };
  };

  const actualTime = parseTimeString(selectedTicket.timeSpent);
  const estimatedTime = parseTimeString(selectedTicket.timeEstimate);

  const percentage = estimatedTime.total > 0
    ? Math.min(Math.round((actualTime.total / estimatedTime.total) * 100), 100)
    : 0;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
      case 'dev':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-card rounded-xl shadow-lg p-6 w-[900px] max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white dark:bg-card rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 border-b pb-6 relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedTicket.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-mono">{selectedTicket.id}</span>
              <Badge className={getStatusColor(selectedTicket.status)}>
                {selectedTicket.status}
              </Badge>
              <Badge className={getPriorityColor(selectedTicket.priority)}>
                {selectedTicket.priority}
              </Badge>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Description */}
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">Description</p>
              <div className="text-gray-800 dark:text-gray-200 max-h-48 overflow-y-auto pr-2 border rounded p-3 bg-gray-50 dark:bg-gray-800 whitespace-pre-line">
                {selectedTicket.description || 'No description provided'}
              </div>
            </div>

            {/* Time Tracking */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                  ⏱️ Time Tracking
                </span>
                <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
                  {actualTime.hours}h {actualTime.minutes}m / {estimatedTime.hours}h {estimatedTime.minutes}m
                </span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
                <div
                  className={`h-2 rounded ${
                    actualTime.total > estimatedTime.total
                      ? 'bg-red-500'
                      : percentage >= 80
                      ? 'bg-yellow-500'
                      : percentage >= 50
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>

              <div className="text-xs text-gray-500 mt-1 text-right">
                {percentage}% completed
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <Button
                onClick={() => {
                  setEditingTicket({ ...selectedTicket });
                  setIsEditing(true);
                }}
                variant="outline"
                size="sm"
              >
                ✏️ Edit Ticket
              </Button>

              <Button
                onClick={() => setShowTimeTrackingModal(true)}
                variant="outline"
                size="sm"
              >
                ⏱️ Time Tracking
              </Button>

              <Button
                onClick={() => {
                  const confirmed = window.confirm(`Delete ticket ${selectedTicket.id}?`);
                  if (confirmed) {
                    handleDeleteTicket(selectedTicket.id);
                    closeModal();
                  }
                }}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                🗑️ Delete
              </Button>
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-medium text-gray-500 mb-1">Project</p>
              <p className="text-gray-800 dark:text-gray-200">{selectedTicket.project}</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-500 mb-1">Assignee</p>
              <p className="text-gray-800 dark:text-gray-200">{selectedTicket.assignee || 'Unassigned'}</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-500 mb-1">Created</p>
              <p>{formatDistanceToNow(new Date(selectedTicket.createdAt), { addSuffix: true })}</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-500 mb-1">Updated</p>
              <p>{formatDistanceToNow(new Date(selectedTicket.updatedAt), { addSuffix: true })}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <p className="font-medium text-gray-500 mb-4">Comments ({selectedTicket.comments?.length || 0})</p>
          <div className="max-h-64 overflow-y-auto pr-1 space-y-4">
            {selectedTicket.comments && selectedTicket.comments.length > 0 ? (
              selectedTicket.comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      {comment.author}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
                    {comment.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;
