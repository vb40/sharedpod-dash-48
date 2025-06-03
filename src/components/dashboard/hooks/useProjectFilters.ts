
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { filterAndSortProjects } from "../utils/projectUtils";

export const useProjectFilters = () => {
  const { projects } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("all");

  const filteredProjects = filterAndSortProjects(
    projects,
    searchQuery,
    statusFilter,
    memberFilter
  );

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    memberFilter,
    setMemberFilter,
    filteredProjects
  };
};
