
import { ReactNode } from 'react';
import { Certification } from './types';
import CertificationCard from './CertificationCard';
import { CertificationStatus } from './utils/certificationStatus';

interface CertificationGroupProps {
  title: string;
  icon: ReactNode;
  certifications: Certification[];
  status: CertificationStatus;
  onEditCertification: (cert: Certification) => void;
}

const CertificationGroup = ({ 
  title, 
  icon, 
  certifications, 
  status, 
  onEditCertification 
}: CertificationGroupProps) => {
  if (certifications.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-medium mb-3 flex items-center">
        <span className="mr-2">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <CertificationCard 
            key={cert.id} 
            certification={cert} 
            onEdit={onEditCertification}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificationGroup;
