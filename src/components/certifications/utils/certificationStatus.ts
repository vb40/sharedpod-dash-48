
import { addMonths, isPast, isBefore, parseISO } from "date-fns";
import { Certification } from "../types";

export type CertificationStatus = "in-progress" | "completed" | "expiring-soon" | "expired";

export const getCertificationStatus = (cert: Certification): CertificationStatus => {
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

export const groupCertifications = (certifications: Certification[]) => {
  return {
    inProgress: certifications.filter(cert => getCertificationStatus(cert) === "in-progress"),
    completed: certifications.filter(cert => getCertificationStatus(cert) === "completed"),
    expiringSoon: certifications.filter(cert => getCertificationStatus(cert) === "expiring-soon"),
    expired: certifications.filter(cert => getCertificationStatus(cert) === "expired"),
  };
};
