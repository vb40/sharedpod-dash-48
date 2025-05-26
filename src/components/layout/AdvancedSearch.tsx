
import React, { useState, useEffect } from "react";
import { Search, X, Clock, User, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

type AdvancedSearchProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AdvancedSearch = ({ isOpen, onClose }: AdvancedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const { teamMembers, projects, tickets } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults = [];
    
    // Search team members
    teamMembers.forEach(member => {
      if (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'person',
          title: member.name,
          subtitle: member.role,
          icon: User,
          action: () => navigate('/team')
        });
      }
    });

    // Search projects
    projects.forEach(project => {
      if (project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'project',
          title: project.name,
          subtitle: `${project.status} - ${project.progress}% complete`,
          icon: FileText,
          action: () => navigate('/projects')
        });
      }
    });

    // Search tickets
    tickets.forEach(ticket => {
      if (ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'ticket',
          title: ticket.title,
          subtitle: `${ticket.status} - ${ticket.assignee}`,
          icon: MessageSquare,
          action: () => navigate('/tickets')
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [searchQuery, teamMembers, projects, tickets, navigate]);

  const handleResultClick = (result: any) => {
    result.action();
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 bg-white border-b shadow-lg">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              autoFocus
              placeholder="Search for people, files, conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 text-lg bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {results.length > 0 && (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <result.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{result.title}</div>
                    <div className="text-sm text-gray-500">{result.subtitle}</div>
                  </div>
                  <div className="text-xs text-gray-400 capitalize">{result.type}</div>
                </div>
              ))}
            </div>
          )}
          
          {searchQuery && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
