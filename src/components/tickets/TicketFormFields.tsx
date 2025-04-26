
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeamMember, Project } from "@/context/types";

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

interface TicketFormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  teamMembers: TeamMember[];
  projects: Project[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const statusOptions = [
  { value: "dev", label: "Development" },
  { value: "in-progress", label: "In Progress" },
  { value: "qa", label: "QA Testing" },
  { value: "uat", label: "UAT" },
  { value: "completed", label: "Completed" },
  { value: "done", label: "Done" },
  { value: "blocked", label: "Blocked" },
];

const priorityOptions = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function TicketFormFields({
  formData,
  errors,
  teamMembers,
  projects,
  onChange,
  onSelectChange,
}: TicketFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={3}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => onSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => onSelectChange("priority", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="assignee">Assignee</Label>
          <Select
            value={formData.assignee}
            onValueChange={(value) => onSelectChange("assignee", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.name}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.assignee && <p className="text-xs text-destructive">{errors.assignee}</p>}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="project">Project</Label>
          <Select
            value={formData.project}
            onValueChange={(value) => onSelectChange("project", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.name}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.project && <p className="text-xs text-destructive">{errors.project}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="timeSpent">Time Spent (hours)</Label>
          <Input
            id="timeSpent"
            name="timeSpent"
            type="number"
            min="0"
            step="0.5"
            value={formData.timeSpent}
            onChange={onChange}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="timeEstimate">Time Estimate (hours)</Label>
          <Input
            id="timeEstimate"
            name="timeEstimate"
            type="number"
            min="0.5"
            step="0.5"
            value={formData.timeEstimate}
            onChange={onChange}
          />
          {errors.timeEstimate && (
            <p className="text-xs text-destructive">{errors.timeEstimate}</p>
          )}
        </div>
      </div>
    </div>
  );
}
