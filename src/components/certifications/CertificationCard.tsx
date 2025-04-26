
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isPast, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Certification } from "./types";
import { CertificationStatus } from "./utils/certificationStatus";

interface CertificationCardProps {
  certification: Certification;
  onEdit: (cert: Certification) => void;
  status: CertificationStatus;
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
        {certification.assignedTo && (
          <div>
            <div className="text-sm font-medium mb-1">Assigned To</div>
            <div className="text-sm">{certification.assignedTo}</div>
          </div>
        )}
        
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

export default CertificationCard;
