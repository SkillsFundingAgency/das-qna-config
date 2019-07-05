import React from "react";
import { Link } from "@reach/router";

const Project = ({ location }) => {
  const { project, sections } = location.state;

  const projectSections = sections.filter(
    section => !project.sections.includes(section.id)
  );

  return (
    <div>
      <h1>{project.name}</h1>

      {projectSections.map(section => (
        <li key={section.id}>
          <Link to={`/sections/${section.id}`} state={{ section: section }}>
            {section.name}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Project;
