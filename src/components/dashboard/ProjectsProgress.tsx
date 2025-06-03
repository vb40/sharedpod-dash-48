
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectFilters from "./ProjectFilters";
import { useProjectFilters } from "./hooks/useProjectFilters";

const ProjectsProgress = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    memberFilter,
    setMemberFilter,
    filteredProjects
  } = useProjectFilters();

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
          <ProjectFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            memberFilter={memberFilter}
            setMemberFilter={setMemberFilter}
          />

          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProjectCard 
                    project={project} 
                    onClick={handleProjectClick} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white border-0 shadow-lg z-10" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white border-0 shadow-lg z-10" />
          </Carousel>
        </CardContent>
      </Card>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsProgress;
