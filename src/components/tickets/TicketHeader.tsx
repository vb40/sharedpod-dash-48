
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ticket } from "lucide-react";

interface TicketHeaderProps {
  mode: "create" | "edit";
}

export function TicketHeader({ mode }: TicketHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Ticket className="h-5 w-5" />
        {mode === "create" ? "Create New Ticket" : "Edit Ticket"}
      </DialogTitle>
    </DialogHeader>
  );
}
