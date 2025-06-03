import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Calendar, BarChart2, Search } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ProjectsProgress = () => {
  const { projects, teamMembers } = useApp();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  
  // Normalize project status to only allowed values
  const normalizeStatus = (status: string) => {
    if (status === "Active" || status === "Planning") return "In Progress";
    if (status === "Completed") return "Completed";
    return "OnHold";
  };

  // Filter and sort projects
  const filteredProjects = projects
    .map(project => ({
      ...project,
      status: normalizeStatus(project.status)
    }))
    .filter(project => {
      const matchesSearch = !searchQuery || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || 
        project.status === statusFilter;
      
      const matchesMember = memberFilter === "all" || 
        project.team.some((member: string) => member === memberFilter);
      
      return matchesSearch && matchesStatus && matchesMember;
    })
    .sort((a, b) => b.progress - a.progress);

  const getHoursUsed = (project: any) => {
    return project.hoursUsed || Math.floor(Math.random() * 80);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 focus:ring-[#ff9e16] focus:border-[#ff9e16] focus-visible:ring-[#ff9e16] focus-visible:border-[#ff9e16] border-input"
              />
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 focus:ring-[#ff9e16] focus:border-[#ff9e16]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="data-[state=checked]:bg-[#ff9e16] data-[state=checked]:text-white">All Status</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="OnHold">OnHold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={memberFilter} onValueChange={setMemberFilter}>
                <SelectTrigger className="w-32 focus:ring-[#ff9e16] focus:border-[#ff9e16]">
                  <SelectValue placeholder="Member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="data-[state=checked]:bg-[#ff9e16] data-[state=checked]:text-white">All Members</SelectItem>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredProjects.map((project) => {
                const hoursUsed = getHoursUsed(project);
                const hoursRemaining = Math.max(0, 80 - hoursUsed);
                
                return (
                  <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card 
                      className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer border-transparent shadow-md w-full h-full"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80"></div>
                      
                      <CardHeader className="pb-2 md:pb-3">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base md:text-lg truncate">{project.name}</CardTitle>
                          </div>
                          <Badge
                            className={cn(
                              "transition-all group-hover:scale-110 text-xs shrink-0",
                              project.status === "In Progress" ? "bg-blue-500" : 
                              project.status === "OnHold" ? "bg-amber-500" : 
                              "bg-green-500"
                            )}
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3 md:space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs md:text-sm">
                            <div className="flex items-center gap-1">
                              <BarChart2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                              <span className="font-medium">Progress</span>
                            </div>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-primary to-secondary transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs md:text-sm">
                            <div className="flex items-center gap-1">
                              <BarChart2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                              <span className="font-medium hidden sm:inline">Hours (80h/month)</span>
                              <span className="font-medium sm:hidden">Hours</span>
                            </div>
                            <span className="font-medium">{hoursUsed}/80h</span>
                          </div>
                          
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                hoursUsed > 70 ? "bg-rose-500" : 
                                hoursUsed > 50 ? "bg-amber-500" : 
                                "bg-emerald-500"
                              )}
                              style={{ width: `${Math.min(100, (hoursUsed / 80) * 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>{hoursUsed}h used</span>
                            <span>{hoursRemaining}h left</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                          <div className="flex items-center gap-2 rounded-lg bg-background p-2 md:p-3">
                            <div className="rounded-full bg-primary/10 p-1 md:p-1.5">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-muted-foreground">Start Date</p>
                              <p className="text-xs md:text-sm font-medium truncate">{format(new Date(project.startDate), "MMM dd")}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 rounded-lg bg-background p-2 md:p-3">
                            <div className="rounded-full bg-secondary/10 p-1 md:p-1.5">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-muted-foreground">End Date</p>
                              <p className="text-xs md:text-sm font-medium truncate">{format(new Date(project.endDate), "MMM dd")}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-xs md:text-sm font-medium">Team Members</div>
                          <div className="flex -space-x-1 md:-space-x-2">
                            {project.team.map((member: string, index: number) => (
                              <HoverCard key={index}>
                                <HoverCardTrigger>
                                  <Avatar className="border-2 border-background h-6 w-6 md:h-8 md:w-8">
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                                      {getInitials(member)}
                                    </AvatarFallback>
                                  </Avatar>
                                </HoverCardTrigger>
                                <HoverCardContent className="text-sm">
                                  {member}
                                </HoverCardContent>
                              </HoverCard>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white border-0 shadow-lg z-10" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white border-0 shadow-lg z-10" />
          </Carousel>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Project Status</h4>
                  <Badge className={cn(
                    selectedProject.status === "In Progress" ? "bg-blue-500" : 
                    selectedProject.status === "OnHold" ? "bg-amber-500" : 
                    "bg-green-500"
                  )}>
                    {selectedProject.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Hours Utilization</h4>
                  <div className="flex justify-between text-sm">
                    <span>Used: {getHoursUsed(selectedProject)}/80 hours</span>
                    <span>Remaining: {Math.max(0, 80 - getHoursUsed(selectedProject))} hours</span>
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (getHoursUsed(selectedProject) / 80) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Team Members</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsProgress;
