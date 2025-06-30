
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface TimeTrackingModalProps {
  showTimeTrackingModal: boolean;
  setShowTimeTrackingModal: (show: boolean) => void;
  handleSaveTimeTracking: (data: {
    timeSpent: number;
    timeEstimate: number;
    notes?: string;
  }) => void;
  selectedTicket: Ticket;
}

const TimeTrackingModal = ({
  showTimeTrackingModal,
  setShowTimeTrackingModal,
  handleSaveTimeTracking,
  selectedTicket,
}: TimeTrackingModalProps) => {
  const [timeSpent, setTimeSpent] = useState(selectedTicket.timeSpent.toString());
  const [timeEstimate, setTimeEstimate] = useState(selectedTicket.timeEstimate.toString());
  const [notes, setNotes] = useState('');

  if (!showTimeTrackingModal) return null;

  const handleSave = () => {
    handleSaveTimeTracking({
      timeSpent: parseFloat(timeSpent) || 0,
      timeEstimate: parseFloat(timeEstimate) || 0,
      notes,
    });
    setShowTimeTrackingModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white dark:bg-card rounded-xl shadow-xl p-6 w-full max-w-[600px] relative">
        {/* Close Button */}
        <button
          onClick={() => setShowTimeTrackingModal(false)}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Time Tracking</h2>
        <p className="text-sm text-gray-500 mb-6">
          Update time tracking for{' '}
          <span className="font-medium text-gray-700 dark:text-gray-300">{selectedTicket.title}</span>
        </p>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="timeSpent">Time Spent (hours)</Label>
            <Input
              id="timeSpent"
              type="number"
              min="0"
              step="0.5"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>

          <div>
            <Label htmlFor="timeEstimate">Time Estimate (hours)</Label>
            <Input
              id="timeEstimate"
              type="number"
              min="0"
              step="0.5"
              value={timeEstimate}
              onChange={(e) => setTimeEstimate(e.target.value)}
              placeholder="e.g., 8"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes about time tracking..."
            className="h-24"
          />
        </div>

        {/* Current Progress */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Progress</p>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Spent: {selectedTicket.timeSpent}h</span>
            <span>Estimated: {selectedTicket.timeEstimate}h</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{
                width: `${Math.min(100, (selectedTicket.timeSpent / (selectedTicket.timeEstimate || 1)) * 100)}%`
              }}
            ></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            onClick={() => setShowTimeTrackingModal(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingModal;
