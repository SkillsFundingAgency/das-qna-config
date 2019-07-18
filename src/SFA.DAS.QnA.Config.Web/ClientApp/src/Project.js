import React from "react";
import Sections from "./Sections";

const Project = ({ project, addSectionToProject }) => {
  return (
    <>
      <h1>{project.name}</h1>

      <ul role="navigation">
        <Sections project={project} addSectionToProject={addSectionToProject} />
      </ul>
    </>
  );
};

export default Project;
