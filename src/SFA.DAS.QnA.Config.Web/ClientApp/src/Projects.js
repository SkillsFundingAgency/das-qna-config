import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { formatDateTime } from "./helpers";
import { EMPTY_PROJECT } from "./data-structures";

import AddProjectForm from "./forms/AddProjectForm";
import EditProjectForm from "./forms/EditProjectForm";

import Sections from "./Sections";

const Projects = ({ projectsData }) => {
  const initialProjects = () =>
    JSON.parse(window.localStorage.getItem("projects")) || projectsData;
  const [projects, setProjects] = useState(initialProjects);
  const jsonProjects = JSON.stringify(projects);
  const [currentProject, setCurrentProject] = useState(EMPTY_PROJECT);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("projects", jsonProjects);
  });

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

  return (
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
      {projects.length ? (
        <ul className="link-list" role="navigation">
          {projects.map(project => (
            <li key={project.id}>
              {/* <Sections project={project} /> */}
              <h2 className="link-list__title">
                <Link to={project.id} state={{ project }}>
                  {project.name}
                </Link>
              </h2>
              {project.description && (
                <p className="link-list__body">{project.description}</p>
              )}
              {project.createdAt && (
                <p className="link-list__body">
                  Created on: {formatDateTime(project.createdAt)}
                </p>
              )}
              <a href="#edit" onClick={() => editProject(project)}>
                Edit
              </a>{" "}
              <a href="#delete" onClick={() => deleteProject(project.id)}>
                Delete
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no projects.</p>
      )}
    </>
  );
};

export default Projects;
