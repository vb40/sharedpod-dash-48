
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TeamHeaderProps {
  onAddMember: () => void;
}

const TeamHeader = ({ onAddMember }: TeamHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Members</h1>
        <p className="text-muted-foreground">Manage your team members and their performance.</p>
      </div>
      <Button onClick={onAddMember} className="flex items-center gap-2">
        <Plus className="mr-2 h-4 w-4" /> Add Team Member
      </Button>
    </div>
  );
};

export default TeamHeader;
