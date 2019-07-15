import React from "react";
import { Link } from "@reach/router";

// import Project from "./Project";

const Projects = ({ projects, children }) => {
  return (
    <>
      <h1>Projects</h1>
      <ul role="navigation">
        {projects.map(project => (
          <li key={project.id}>
            <Link to={project.id} state={{ project }}>
              {project.name}
            </Link>
            {project.description && <span>{project.description}</span>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Projects;
