
import ProjectCard from "./ProjectCard";

interface ProjectsListProps {
  projects: any[];
  onProjectClick: (project: any) => void;
  onDeleteProject: (projectId: string, projectName: string) => void;
}

const ProjectsList = ({ projects, onProjectClick, onDeleteProject }: ProjectsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onProjectClick={onProjectClick}
          onDeleteProject={onDeleteProject}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
