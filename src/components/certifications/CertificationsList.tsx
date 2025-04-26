
import { PlayCircle, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Certification } from "./types";
import CertificationGroup from "./CertificationGroup";
import { groupCertifications } from "./utils/certificationStatus";

interface CertificationsListProps {
  certifications: Certification[];
  onEditCertification: (cert: Certification) => void;
}

const CertificationsList = ({ certifications, onEditCertification }: CertificationsListProps) => {
  const groupedCertifications = groupCertifications(certifications);

  return (
    <div className="space-y-8">
      <CertificationGroup
        title="In Progress"
        icon={<PlayCircle className="h-5 w-5 text-blue-500" />}
        certifications={groupedCertifications.inProgress}
        status="in-progress"
        onEditCertification={onEditCertification}
      />
      
      <CertificationGroup
        title="Completed Certifications"
        icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
        certifications={groupedCertifications.completed}
        status="completed"
        onEditCertification={onEditCertification}
      />
      
      <CertificationGroup
        title="Expiring Soon"
        icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
        certifications={groupedCertifications.expiringSoon}
        status="expiring-soon"
        onEditCertification={onEditCertification}
      />
      
      <CertificationGroup
        title="Expired"
        icon={<XCircle className="h-5 w-5 text-rose-500" />}
        certifications={groupedCertifications.expired}
        status="expired"
        onEditCertification={onEditCertification}
      />
    </div>
  );
};

export default CertificationsList;
