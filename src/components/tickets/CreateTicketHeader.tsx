
import React from 'react';
import { Button } from "@/components/ui/button";

interface CreateTicketHeaderProps {
  onCreateManualTicket: () => void;
}

const CreateTicketHeader = ({ onCreateManualTicket }: CreateTicketHeaderProps) => {
  return (
    <div className="flex justify-end mb-4">
      <Button 
        onClick={onCreateManualTicket}
        className="bg-green-600 hover:bg-green-700"
      >
        + Create
      </Button>
    </div>
  );
};

export default CreateTicketHeader;
