
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import CertificationModal from "@/components/certifications/CertificationModal";
import CertificationsList from "@/components/certifications/CertificationsList";

interface Certification {
  id: string;
  name: string;
  provider: string;
  dateObtained: string;
  expirationDate: string | null;
  skills: string[];
  level: string;
}

const Certifications = () => {
  const { certifications } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | undefined>(undefined);
  
  const handleOpenModal = () => {
    setSelectedCertification(undefined);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleEditCertification = (cert: Certification) => {
    setSelectedCertification(cert);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">
            Manage and track your team's professional certifications
          </p>
        </div>
        <Button onClick={handleOpenModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
        </Button>
      </div>
      
      {certifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
          <h3 className="text-lg font-medium mb-2">No Certifications Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start tracking certifications by adding new ones.
          </p>
          <Button onClick={handleOpenModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Certification
          </Button>
        </div>
      ) : (
        <CertificationsList
          certifications={certifications}
          onEditCertification={handleEditCertification}
        />
      )}
      
      <CertificationModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certification={selectedCertification}
      />
    </div>
  );
};

export default Certifications;
