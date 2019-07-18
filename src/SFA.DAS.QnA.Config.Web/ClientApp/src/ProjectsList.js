import React from "react";
import { formatDateTime } from "./helpers";

const ProjectsList = ({
  projects,
  openProject,
  editProject,
  deleteProject
}) => {
  return (
    <>
      {projects.length ? (
        <ul className="link-list" role="navigation">
          {projects.map(project => (
            <li key={project.id}>
              {/* <Sections project={project} /> */}
              <h2 className="link-list__title">
                <button
                  className="button-link button-link--large"
                  onClick={() => openProject(project.id)}
                >
                  {project.name}
                </button>
              </h2>
              {project.description && (
                <p className="link-list__body">{project.description}</p>
              )}
              {project.createdAt && (
                <p className="link-list__body">
                  Created on: {formatDateTime(project.createdAt)}
                </p>
              )}
              <button
                className="button-link"
                onClick={() => editProject(project)}
              >
                Edit
              </button>{" "}
              <button
                className="button-link"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no projects.</p>
      )}
    </>
  );
};

export default ProjectsList;
