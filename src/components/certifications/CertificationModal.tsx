import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/context/AppContext";
import { format, addYears } from "date-fns";
import { toast } from "sonner";
import ReactConfetti from 'react-confetti';
import { X } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  provider: string;
  dateObtained: string;
  expirationDate: string | null;
  skills: string[];
  level: string;
  isCompleted?: boolean;
}

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification?: Certification;
}

const CertificationModal = ({ isOpen, onClose, certification }: CertificationModalProps) => {
  const { teamMembers, addCertification, updateCertification } = useApp();
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    assignedTo: "",
    dateObtained: format(new Date(), "yyyy-MM-dd"),
    expirationDate: format(addYears(new Date(), 1), "yyyy-MM-dd"),
    progress: 0,
    status: "in-progress",
    level: "Beginner",
    skills: [""],
    isCompleted: false
  });
  
  useEffect(() => {
    if (certification) {
      setFormData({
        name: certification.name,
        provider: certification.provider,
        assignedTo: "",
        dateObtained: certification.dateObtained,
        expirationDate: certification.expirationDate || format(addYears(new Date(), 1), "yyyy-MM-dd"),
        progress: 0,
        status: "completed",
        level: certification.level,
        skills: certification.skills,
        isCompleted: certification.isCompleted || false
      });
    } else {
      setFormData({
        name: "",
        provider: "",
        assignedTo: "",
        dateObtained: format(new Date(), "yyyy-MM-dd"),
        expirationDate: format(addYears(new Date(), 1), "yyyy-MM-dd"),
        progress: 0,
        status: "in-progress",
        level: "Beginner",
        skills: [""],
        isCompleted: false
      });
    }
  }, [certification, isOpen]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Certification name is required";
    if (!formData.provider.trim()) newErrors.provider = "Provider name is required";
    if (!formData.assignedTo) newErrors.assignedTo = "Please select a team member";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index: number) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompletedChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isCompleted: checked,
      progress: checked ? 100 : prev.progress
    }));
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const newCertification = {
      id: certification?.id || Math.random().toString(36).substring(2, 9),
      name: formData.name,
      provider: formData.provider,
      dateObtained: formData.dateObtained,
      expirationDate: formData.isCompleted ? null : formData.expirationDate,
      skills: formData.skills.filter(skill => skill.trim() !== ""),
      level: formData.level,
      isCompleted: formData.isCompleted,
      assignedTo: formData.assignedTo,
      progress: formData.progress
    };

    if (formData.isCompleted) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (certification) {
          updateCertification(newCertification);
          toast.success("Certification updated successfully");
        } else {
          addCertification(newCertification);
          toast.success("Certification added successfully");
        }
        onClose();
      }, 3000);
    } else {
      if (certification) {
        updateCertification(newCertification);
        toast.success("Certification updated successfully");
      } else {
        addCertification(newCertification);
        toast.success("Certification added successfully");
      }
      onClose();
    }
  };
  
  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[450px] overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{certification ? "Edit Certification" : "Add New Certification"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Certification Name</Label>
              <Input 
                id="name"
                name="name"
                placeholder="e.g. AWS Solutions Architect"
                value={formData.name}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              {errors.provider && <p className="text-sm text-red-500">{errors.provider}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select 
                value={formData.assignedTo} 
                onValueChange={(value) => handleSelectChange("assignedTo", value)}
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
                onValueChange={(value) => handleSelectChange("level", value)}
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
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="isCompleted">Completed</Label>
                <Switch 
                  id="isCompleted" 
                  checked={formData.isCompleted}
                  onCheckedChange={handleCompletedChange}
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
                    onChange={handleInputChange}
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
                    onValueChange={(value) => {
                      setFormData(prev => ({
                        ...prev,
                        progress: value[0]
                      }));
                    }}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Skills</Label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="e.g. Cloud Computing"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, index)}
                  />
                  {formData.skills.length > 1 && (
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeSkill(index)}
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
                onClick={addSkill}
                className="w-full"
              >
                Add Skill
              </Button>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationModal;
