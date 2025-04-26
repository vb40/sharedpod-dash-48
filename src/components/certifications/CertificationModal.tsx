
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { format } from "date-fns";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal = ({ isOpen, onClose }: CertificationModalProps) => {
  const { teamMembers, addCertification } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    assignedTo: "",
    expiryDate: format(new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"), // Default to 12 months from now
    progress: 0,
    status: "in-progress"
  });
  
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
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // Add the certification
    if (addCertification) {
      addCertification({
        id: Math.floor(Math.random() * 1000),
        ...formData
      });
      
      toast.success("Certification added successfully");
      onClose();
    } else {
      console.error("addCertification function is not available");
      toast.error("Failed to add certification");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Certification</DialogTitle>
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
            <Label htmlFor="expiryDate">Target Completion Date</Label>
            <Input 
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="progress">Current Progress (%)</Label>
            <Input 
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress.toString()}
              onChange={(e) => handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)).toString()
                }
              })}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationModal;
