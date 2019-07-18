import React, { useState, useEffect } from "react";
import { EMPTY_PROJECT } from "./data-structures";

import ProjectsList from "./ProjectsList";
import Project from "./Project";
import AddProjectForm from "./forms/AddProjectForm";
import EditProjectForm from "./forms/EditProjectForm";

// import Sections from "./Sections";

const Projects = ({ projectsData }) => {
  const initialProjects = () =>
    JSON.parse(window.localStorage.getItem("projects")) || projectsData;
  const [projects, setProjects] = useState(initialProjects);
  const jsonProjects = JSON.stringify(projects);

  // Current project for editing
  const [currentProject, setCurrentProject] = useState(EMPTY_PROJECT);
  const [editing, setEditing] = useState(false);

  // Project to open
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProject, setShowProject] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("projects", jsonProjects);
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
  };

  return (
    <>
      {showProject ? (
        <Project
          project={selectedProject}
          addSectionToProject={addSectionToProject}
        />
      ) : (
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
      )}
    </>
  );
};

export default Projects;
