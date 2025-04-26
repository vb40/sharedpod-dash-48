
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

interface TicketFilterProps {
  onSearch: (query: string) => void;
  onStatusChange: (status: string | null) => void;
  onCreateTicket: () => void;
}

const statusOptions = [
  { value: null, label: "All Status" },
  { value: "dev", label: "Development" },
  { value: "in-progress", label: "In Progress" },
  { value: "qa", label: "QA Testing" },
  { value: "uat", label: "UAT" },
  { value: "completed", label: "Completed" },
  { value: "done", label: "Done" },
  { value: "blocked", label: "Blocked" },
];

const TicketFilter = ({ onSearch, onStatusChange, onCreateTicket }: TicketFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
      <form onSubmit={handleSearch} className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
      <div className="flex gap-4 w-full sm:w-auto">
        <Select
          onValueChange={(value) => onStatusChange(value === "null" ? null : value)}
          defaultValue="null"
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.label} value={option.value === null ? "null" : option.value as string}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button onClick={onCreateTicket} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </div>
    </div>
  );
};

export default TicketFilter;
