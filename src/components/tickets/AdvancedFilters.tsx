
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface AdvancedFiltersProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: string | null) => void;
  onProjectFilter: (project: string | null) => void;
  onPriorityFilter: (priority: string | null) => void;
  onAssigneeFilter: (assignee: string | null) => void;
  onResetFilters: () => void;
}

const AdvancedFilters = ({
  onSearch,
  onStatusFilter,
  onProjectFilter,
  onPriorityFilter,
  onAssigneeFilter,
  onResetFilters
}: AdvancedFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Filter Row */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select onValueChange={(value) => onStatusFilter(value === "all" ? null : value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="dev">Development</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="qa">QA Testing</SelectItem>
            <SelectItem value="uat">UAT</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onProjectFilter(value === "all" ? null : value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="USHG">USHG</SelectItem>
            <SelectItem value="P2P">P2P</SelectItem>
            <SelectItem value="PIMA">PIMA</SelectItem>
            <SelectItem value="Metiren">Metiren</SelectItem>
            <SelectItem value="DN">DN</SelectItem>
            <SelectItem value="Octapharma">Octapharma</SelectItem>
            <SelectItem value="FPL">FPL</SelectItem>
            <SelectItem value="ArdentMills">ArdentMills</SelectItem>
            <SelectItem value="Paramount">Paramount</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onPriorityFilter(value === "all" ? null : value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="lowest">Lowest</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onAssigneeFilter(value === "all" ? null : value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            <SelectItem value="Sathish K">Sathish K</SelectItem>
            <SelectItem value="Shoban MU">Shoban MU</SelectItem>
            <SelectItem value="Ajjai PR">Ajjai PR</SelectItem>
            <SelectItem value="Balaji Janardhanan">Balaji Janardhanan</SelectItem>
            <SelectItem value="Giridhar">Giridhar</SelectItem>
            <SelectItem value="Unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
