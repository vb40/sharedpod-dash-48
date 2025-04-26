import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle, PlayCircle } from "lucide-react";
import { format, addMonths, isPast, isAfter, isBefore, differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

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

interface CertificationsListProps {
  certifications: Certification[];
  onEditCertification: (cert: Certification) => void;
}

const CertificationsList = ({ certifications, onEditCertification }: CertificationsListProps) => {
  const getCertificationStatus = (cert: Certification) => {
    if (cert.isCompleted) return "completed";
    if (!cert.expirationDate) return "in-progress";
    
    try {
      const expirationDate = parseISO(cert.expirationDate);
      const oneMonthBefore = addMonths(new Date(), 1);
      
      if (isPast(expirationDate)) return "expired";
      if (isBefore(expirationDate, oneMonthBefore)) return "expiring-soon";
      return "in-progress";
    } catch (error) {
      console.error("Date parsing error:", error);
      return "in-progress";
    }
  };
  
  const groupedCertifications = {
    inProgress: certifications.filter(cert => getCertificationStatus(cert) === "in-progress"),
    completed: certifications.filter(cert => getCertificationStatus(cert) === "completed"),
    expiringSoon: certifications.filter(cert => getCertificationStatus(cert) === "expiring-soon"),
    expired: certifications.filter(cert => getCertificationStatus(cert) === "expired"),
  };

  return (
    <div className="space-y-8">
      {/* In Progress Certifications */}
      {groupedCertifications.inProgress.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <PlayCircle className="h-5 w-5 text-blue-500 mr-2" />
            In Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedCertifications.inProgress.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                certification={cert} 
                onEdit={onEditCertification}
                status="in-progress"
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Completed Certifications */}
      {groupedCertifications.completed.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            Completed Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedCertifications.completed.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                certification={cert} 
                onEdit={onEditCertification}
                status="completed"
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Expiring Soon */}
      {groupedCertifications.expiringSoon.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            Expiring Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedCertifications.expiringSoon.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                certification={cert} 
                onEdit={onEditCertification}
                status="expiring-soon"
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Expired */}
      {groupedCertifications.expired.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <XCircle className="h-5 w-5 text-rose-500 mr-2" />
            Expired
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedCertifications.expired.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                certification={cert} 
                onEdit={onEditCertification}
                status="expired"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CertificationCardProps {
  certification: Certification;
  onEdit: (cert: Certification) => void;
  status: "in-progress" | "completed" | "expiring-soon" | "expired";
}

const CertificationCard = ({ certification, onEdit, status }: CertificationCardProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = parseISO(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  const getDaysRemaining = () => {
    if (!certification.expirationDate) return null;
    try {
      const expirationDate = parseISO(certification.expirationDate);
      if (isPast(expirationDate)) return null;
      return differenceInDays(expirationDate, new Date());
    } catch (error) {
      console.error("Days remaining calculation error:", error);
      return null;
    }
  };
  
  const daysRemaining = getDaysRemaining();
  
  return (
    <Card 
      className={cn(
        "overflow-hidden hover:shadow-md transition-all border-transparent cursor-pointer",
        status === "in-progress" && "bg-gradient-to-br from-card to-blue-50/20 dark:from-card dark:to-blue-950/20",
        status === "completed" && "bg-gradient-to-br from-card to-emerald-50/20 dark:from-card dark:to-emerald-950/20",
        status === "expiring-soon" && "bg-gradient-to-br from-card to-amber-50/20 dark:from-card dark:to-amber-950/20",
        status === "expired" && "bg-gradient-to-br from-card to-rose-50/20 dark:from-card dark:to-rose-950/20",
      )}
      onClick={() => onEdit(certification)}
    >
      <CardHeader className="pb-3 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
        <div className="flex justify-between">
          <div>
            <CardTitle>{certification.name}</CardTitle>
            <CardDescription>{certification.provider}</CardDescription>
          </div>
          <Badge 
            className={cn(
              status === "in-progress" && "bg-blue-500",
              status === "completed" && "bg-emerald-500",
              status === "expiring-soon" && "bg-amber-500",
              status === "expired" && "bg-rose-500",
            )}
          >
            {status === "in-progress" && "In Progress"}
            {status === "completed" && "Completed"}
            {status === "expiring-soon" && "Expiring Soon"}
            {status === "expired" && "Expired"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-sm font-medium mb-1">Date Obtained</div>
          <div className="text-sm">{formatDate(certification.dateObtained)}</div>
        </div>
        
        {certification.expirationDate && (
          <div>
            <div className="text-sm font-medium mb-1">
              {status === "expired" ? "Expired" : "Expires"} On
            </div>
            <div className={cn(
              "text-sm",
              status === "expired" && "text-rose-600 dark:text-rose-400",
              status === "expiring-soon" && "text-amber-600 dark:text-amber-400"
            )}>
              {formatDate(certification.expirationDate)}
              {daysRemaining !== null && daysRemaining > 0 && (
                <span className="ml-1 text-xs">
                  ({daysRemaining} days remaining)
                </span>
              )}
            </div>
          </div>
        )}
        
        <div>
          <div className="text-sm font-medium mb-1">Skills</div>
          <div className="flex flex-wrap gap-1">
            {certification.skills && certification.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {(!certification.skills || certification.skills.length === 0) && (
              <span className="text-xs text-muted-foreground">No skills listed</span>
            )}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-1">Level</div>
          <div className="text-sm">{certification.level || "Not specified"}</div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-1">Status</div>
          <div className="text-sm">
            {certification.isCompleted ? "Completed" : "In Progress"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationsList;
