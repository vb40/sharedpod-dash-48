
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import TeamMemberModal from "@/components/team/TeamMemberModal";
import AddTeamMemberModal from "@/components/team/AddTeamMemberModal";
import TeamHeader from "@/components/team/TeamHeader";
import TeamMemberGrid from "@/components/team/TeamMemberGrid";
import { TeamMember } from "@/context/types";

const Team = () => {
  const { teamMembers, deleteTeamMember } = useApp();
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: TeamMember, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (memberId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteTeamMember(memberId);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(undefined);
  };

  return (
    <div className="space-y-6">
      <TeamHeader onAddMember={() => setIsAddModalOpen(true)} />
      
      <TeamMemberGrid
        teamMembers={teamMembers}
        onMemberClick={handleMemberClick}
        onEditMember={handleEditMember}
        onDeleteMember={handleDeleteMember}
      />
      
      <TeamMemberModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        member={selectedMember} 
      />

      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Team;
