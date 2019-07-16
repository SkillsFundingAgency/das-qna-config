import React from "react";
import { Link } from "@reach/router";

const Project = ({ location }) => {
  const { project } = location.state;

  return (
    <>
      <h1>Sections</h1>
      <h2>{project.name}</h2>

      <ul role="navigation">
        {project.sections.map(section => (
          <li key={section.id}>
            <Link to={section.id} state={{ section }}>
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Project;
