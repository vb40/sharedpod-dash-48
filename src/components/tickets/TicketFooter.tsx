
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TicketFooterProps {
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: () => void;
}

export function TicketFooter({ mode, onClose, onSubmit }: TicketFooterProps) {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onSubmit}>
        {mode === "create" ? "Create" : "Update"}
      </Button>
    </DialogFooter>
  );
}
