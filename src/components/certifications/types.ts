
export interface Certification {
  id: string;
  name: string;
  provider: string;
  dateObtained: string;
  expirationDate: string | null;
  skills: string[];
  level: string;
  isCompleted?: boolean;
  assignedTo?: string;
  progress?: number;
}

export interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification?: Certification;
}

export interface CertificationFormData {
  name: string;
  provider: string;
  assignedTo: string;
  dateObtained: string;
  expirationDate: string;
  progress: number;
  status: string;
  level: string;
  skills: string[];
  isCompleted: boolean;
}
