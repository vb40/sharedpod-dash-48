
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface CertificationSkillsProps {
  skills: string[];
  onSkillChange: (index: number, value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
}

const CertificationSkills = ({
  skills,
  onSkillChange,
  onAddSkill,
  onRemoveSkill,
}: CertificationSkillsProps) => {
  return (
    <div className="space-y-2">
      <Label>Skills</Label>
      {skills.map((skill, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <Input
            placeholder="e.g. Cloud Computing"
            value={skill}
            onChange={(e) => onSkillChange(index, e.target.value)}
          />
          {skills.length > 1 && (
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              onClick={() => onRemoveSkill(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAddSkill}
        className="w-full"
      >
        Add Skill
      </Button>
    </div>
  );
};

export default CertificationSkills;
