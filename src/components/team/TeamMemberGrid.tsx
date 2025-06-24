
import { TeamMember } from "@/context/types";
import TeamMemberCard from "./TeamMemberCard";

interface TeamMemberGridProps {
  teamMembers: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
  onEditMember: (member: TeamMember, e: React.MouseEvent) => void;
  onDeleteMember: (memberId: string, e: React.MouseEvent) => void;
}

const TeamMemberGrid = ({ teamMembers, onMemberClick, onEditMember, onDeleteMember }: TeamMemberGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          onMemberClick={onMemberClick}
          onEditMember={onEditMember}
          onDeleteMember={onDeleteMember}
        />
      ))}
    </div>
  );
};

export default TeamMemberGrid;
