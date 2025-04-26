
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { format, addYears } from "date-fns";
import { toast } from "sonner";
import ReactConfetti from 'react-confetti';
import CertificationForm from "./CertificationForm";
import { CertificationModalProps, CertificationFormData } from "./types";

const CertificationModal = ({ isOpen, onClose, certification }: CertificationModalProps) => {
  const { addCertification, updateCertification } = useApp();
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState<CertificationFormData>({
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
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (certification) {
      setFormData({
        name: certification.name,
        provider: certification.provider,
        assignedTo: certification.assignedTo || "",
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

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
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
          
          <CertificationForm
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCompletedChange={handleCompletedChange}
            onSkillChange={handleSkillChange}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
          />
          
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
