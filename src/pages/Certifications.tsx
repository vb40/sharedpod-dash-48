
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, addMonths } from "date-fns";
import CertificationModal from "@/components/certifications/CertificationModal";

const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { teamMembers, certifications = [] } = useApp();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500">Active</Badge>;
      case "expiring-soon":
        return <Badge className="bg-amber-500">Expiring Soon</Badge>;
      case "expired":
        return <Badge className="bg-rose-500">Expired</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
        <p className="text-muted-foreground">Track team certifications and professional development.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert: any) => {
          const member = teamMembers.find(m => m.name === cert.assignedTo);

          return (
            <Card key={cert.id} className="overflow-hidden transform transition-all hover:scale-[1.02] bg-gradient-to-r from-card to-muted/30">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{cert.name}</CardTitle>
                    <CardDescription>{cert.provider}</CardDescription>
                  </div>
                  {getStatusBadge(cert.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {member ? getInitials(member.name) : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{cert.assignedTo}</span>
                </div>
                
                {cert.status === "in-progress" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full left-0 top-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {cert.expiryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {cert.status === "in-progress" ? "Target completion" : "Expires"}:{" "}
                      <span className="font-medium">
                        {format(new Date(cert.expiryDate), "MMM dd, yyyy")}
                      </span>
                    </span>
                  </div>
                )}
                
                <Button variant="outline" className="w-full flex items-center justify-between group">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
        
        <Card 
          onClick={() => setIsModalOpen(true)}
          className="overflow-hidden border-dashed flex flex-col items-center justify-center p-6 h-full cursor-pointer transition-all hover:bg-muted/20"
        >
          <Award className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Add New Certification</h3>
          <p className="text-muted-foreground text-center mb-4">
            Track professional development and certifications for your team members.
          </p>
          <Button>
            <Award className="h-4 w-4 mr-2" /> 
            Add Certification
          </Button>
        </Card>
      </div>

      <CertificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Certifications;
