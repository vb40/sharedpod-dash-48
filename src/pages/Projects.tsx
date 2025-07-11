
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddProjectModal from "@/components/projects/AddProjectModal";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectModal from "@/components/dashboard/ProjectModal";
import ProjectEditModal from "@/components/projects/ProjectModal";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const { projects, deleteProject } = useApp();
  const [selectedProject, setSelectedProject] = useState<any | undefined>(undefined);
  const [editProject, setEditProject] = useState<any | undefined>(undefined);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsInfoModalOpen(true);
  };

  const handleEditProject = (project: any) => {
    setEditProject(project);
    setIsEditModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
    setSelectedProject(undefined);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditProject(undefined);
  };

  const handleAddProject = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    deleteProject(projectId);
    toast({
      title: "Project Deleted",
      description: `${projectName} has been successfully deleted.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Track and manage all projects.</p>
        </div>
        <Button onClick={handleAddProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Project
        </Button>
      </div>
      
      <ProjectsList
        projects={projects}
        onProjectClick={handleProjectClick}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
      
      {/* Info Modal (like dashboard) */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isInfoModalOpen}
        onClose={handleCloseInfoModal}
      />
      
      {/* Edit Modal (original projects modal) */}
      <ProjectEditModal 
        project={editProject}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      />
      
      <AddProjectModal 
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      />
    </div>
  );
};

export default Projects;
