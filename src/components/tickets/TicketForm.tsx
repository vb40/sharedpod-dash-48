
import { TicketFormFields } from "./TicketFormFields";
import { TicketComments } from "./TicketComments";
import { useApp } from "@/context/AppContext";

interface FormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  project: string;
  timeSpent: number;
  timeEstimate: number;
}

interface FormErrors {
  title?: string;
  description?: string;
  assignee?: string;
  project?: string;
  timeEstimate?: string;
}

interface TicketFormProps {
  formData: FormData;
  errors: FormErrors;
  comments: { author: string; text: string; timestamp: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onAddComment: (text: string) => void;
}

export function TicketForm({
  formData,
  errors,
  comments,
  onChange,
  onSelectChange,
  onAddComment,
}: TicketFormProps) {
  const { teamMembers, projects } = useApp();
  // Use first team member as current user for simplicity
  const currentUser = teamMembers[0]?.name || "Anonymous";

  return (
    <div className="space-y-6">
      <TicketFormFields
        formData={formData}
        errors={errors}
        teamMembers={teamMembers}
        projects={projects}
        onChange={onChange}
        onSelectChange={onSelectChange}
      />

      <div className="border-t pt-4">
        <h3 className="font-medium mb-4">Comments</h3>
        <TicketComments
          comments={comments}
          onAddComment={onAddComment}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
