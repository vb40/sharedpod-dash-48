
export const normalizeStatus = (status: string) => {
  if (status === "Active" || status === "Planning") return "Active";
  if (status === "Completed") return "Completed";
  if (status === "Pipeline") return "Pipeline";
  if (status === "OnHold" || status === "On Hold") return "On Hold";
  return "On Hold";
};

export const getHoursUsed = (project: any) => {
  return project.hoursUsed || Math.floor(Math.random() * 80);
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const filterAndSortProjects = (
  projects: any[], 
  searchQuery: string, 
  statusFilter: string, 
  memberFilter: string
) => {
  return projects
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
};
