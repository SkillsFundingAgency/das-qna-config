import React, { useState, useEffect } from "react";
import { EMPTY_PROJECT } from "./data-structures";

import ProjectsList from "./ProjectsList";
import Project from "./Project";
import AddProjectForm from "./forms/AddProjectForm";
import EditProjectForm from "./forms/EditProjectForm";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);

  // Current project for editing
  const [currentProject, setCurrentProject] = useState(EMPTY_PROJECT);
  const [editing, setEditing] = useState(false);

  // Project to open
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProject, setShowProject] = useState(false);

  // Get data and add to projects
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/data/projects-data.json");
      const projects = await data.json();
      setProjects(
        JSON.parse(window.localStorage.getItem("projects")) || projects.Projects
      );
    };

    fetchData();
    setLoading(false);
  }, []);

  // Add project to localStorage
  useEffect(() => {
    window.localStorage.setItem("projects", JSON.stringify(projects));
  });

  const openProject = id => {
    const project = projects.find(project => project.id === id);
    setSelectedProject(project);
    setShowProject(true);
  };

  const addProject = project => {
    project.id = `project-${projects.length + 1}`;
    project.createdAt = Date.now();
    setProjects([...projects, project]);
  };

  const updateProject = (id, updatedProject) => {
    setEditing(false);
    setProjects(
      projects.map(project => (project.id === id ? updatedProject : project))
    );
  };

  const editProject = project => {
    setEditing(true);
    setCurrentProject({
      ...project,
      name: project.name,
      description: project.description
    });
  };

  const deleteProject = id => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const addSectionToProject = (projectId, sectionId, sectionName) => {
    const project = projects.find(project => project.id === projectId);
    const updatedSection = [
      ...project.sections,
      { id: sectionId, name: sectionName }
    ];
    const updatedProject = { ...project, sections: updatedSection };
    setProjects(
      projects.map(project =>
        project.id === projectId ? updatedProject : project
      )
    );
    setSelectedProject(updatedProject);
    window.localStorage.setItem(sectionId, updatedSection);
  };

  return (
    <>
      {showProject ? (
        <Project
          project={selectedProject}
          addSectionToProject={addSectionToProject}
        />
      ) : null}

      {!showProject && projects ? (
        <>
          <h1>Projects</h1>
          {editing ? (
            <>
              <h2>Edit project</h2>
              <EditProjectForm
                currentProject={currentProject}
                updateProject={updateProject}
              />
            </>
          ) : (
            <>
              <h2>Add project</h2>
              <AddProjectForm addProject={addProject} />
            </>
          )}
          <ProjectsList
            projects={projects}
            openProject={openProject}
            editProject={editProject}
            deleteProject={deleteProject}
          />
        </>
      ) : null}

      {loading ? <span>Loading...</span> : null}
    </>
  );
};

export default Projects;
