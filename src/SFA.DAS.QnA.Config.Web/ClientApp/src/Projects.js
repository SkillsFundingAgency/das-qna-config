import React from "react";
import { Link } from "@reach/router";

const Projects = ({ children, location }) => {
  const { projects, sections } = location.state;

  return (
    <div>
      <h1>Projects</h1>
      <ul role="navigation">
        {projects.map(project => (
          <li key={project.id}>
            {/*
             ... allow for relative links in the
             route components. We can link to just
             the `id`, because the href is relative,
             the full href will be "/projects/${id}"
          */}
            <Link
              to={project.id}
              state={{ project: project, sections: sections }}
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default Projects;
