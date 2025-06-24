
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  memberFilter: string;
  setMemberFilter: (filter: string) => void;
}

const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  memberFilter,
  setMemberFilter
}: ProjectFiltersProps) => {
  const { teamMembers } = useApp();
  const navigate = useNavigate();

  const handleViewAllProjects = () => {
    navigate("/projects");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-48 focus:ring-[#ff9e16] focus:border-[#ff9e16] focus-visible:ring-[#ff9e16] focus-visible:border-[#ff9e16] border-input"
        />
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 focus:ring-[#ff9e16] focus:border-[#ff9e16]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="data-[state=checked]:bg-[#ff9e16] data-[state=checked]:text-white">All Status</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="OnHold">OnHold</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={memberFilter} onValueChange={setMemberFilter}>
          <SelectTrigger className="w-32 focus:ring-[#ff9e16] focus:border-[#ff9e16]">
            <SelectValue placeholder="Member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="data-[state=checked]:bg-[#ff9e16] data-[state=checked]:text-white">All Members</SelectItem>
            {teamMembers.map(member => (
              <SelectItem key={member.id} value={member.name}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleViewAllProjects}
        variant="outline"
      >
        View All
      </Button>
    </div>
  );
};

export default ProjectFilters;
