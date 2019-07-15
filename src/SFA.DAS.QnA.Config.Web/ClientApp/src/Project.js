import React from "react";
import { Link } from "@reach/router";

const Project = props => {
  const { project } = props.location.state;

  return (
    <>
      <h1>{project.name}</h1>
      <h2>Sections</h2>

      {project.sections.map(section => (
        <li key={section.id}>
          <Link to={section.id} state={{ section }}>
            {section.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default Project;
