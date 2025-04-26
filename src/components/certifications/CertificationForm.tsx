
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/context/AppContext";
import CertificationSkills from './CertificationSkills';
import { CertificationFormData } from './types';

interface CertificationFormProps {
  formData: CertificationFormData;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCompletedChange: (checked: boolean) => void;
  onSkillChange: (index: number, value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
}

const CertificationForm = ({
  formData,
  errors,
  onInputChange,
  onSelectChange,
  onCompletedChange,
  onSkillChange,
  onAddSkill,
  onRemoveSkill,
}: CertificationFormProps) => {
  const { teamMembers } = useApp();

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Certification Name</Label>
        <Input 
          id="name"
          name="name"
          placeholder="e.g. AWS Solutions Architect"
          value={formData.name}
          onChange={onInputChange}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="provider">Provider</Label>
        <Input 
          id="provider"
          name="provider"
          placeholder="e.g. Amazon Web Services"
          value={formData.provider}
          onChange={onInputChange}
        />
        {errors.provider && <p className="text-sm text-red-500">{errors.provider}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="assignedTo">Assign To</Label>
        <Select 
          value={formData.assignedTo} 
          onValueChange={(value) => onSelectChange("assignedTo", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            {teamMembers.map(member => (
              <SelectItem key={member.id} value={member.name}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.assignedTo && <p className="text-sm text-red-500">{errors.assignedTo}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Level</Label>
        <Select 
          value={formData.level} 
          onValueChange={(value) => onSelectChange("level", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dateObtained">Date Obtained</Label>
        <Input 
          id="dateObtained"
          name="dateObtained"
          type="date"
          value={formData.dateObtained}
          onChange={onInputChange}
        />
      </div>
      
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="isCompleted">Completed</Label>
          <Switch 
            id="isCompleted" 
            checked={formData.isCompleted}
            onCheckedChange={onCompletedChange}
          />
        </div>
      </div>

      {!formData.isCompleted && (
        <>
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Target Completion Date</Label>
            <Input 
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={onInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="progress">Current Progress</Label>
              <span className="text-sm font-medium">{formData.progress}%</span>
            </div>
            <Slider 
              id="progress" 
              value={[formData.progress]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(value) => onSelectChange("progress", value[0].toString())}
            />
          </div>
        </>
      )}

      <CertificationSkills
        skills={formData.skills}
        onSkillChange={onSkillChange}
        onAddSkill={onAddSkill}
        onRemoveSkill={onRemoveSkill}
      />
    </div>
  );
};

export default CertificationForm;
