import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sixDigitNumber } from "./helpers";
// import { v4 } from 'uuid';
// import { EMPTY_PROJECT } from "./data-structures";
import AddSectionForm from "./forms/AddSectionForm";

const Sections = ({ project, addSectionToProject }) => {
  /*  TODO:
      We'll need to update both the project-data with a reference to the added section
      as well as generate a new section-id.json. This will be a post to the API
      but will go into local storage for now.
  */

  const [sections, setSections] = useState(project.sections);

  const addSection = section => {
    section.id = `section-${sixDigitNumber()}`;
    setSections([...sections, section]);
    addSectionToProject(project.id, section.id, section.name);
  };

  return (
    <>
      <AddSectionForm addSection={addSection} />

      <ul role="navigation">
        {project.sections.map((section, index) => (
          <div key={index}>
            <Link to={`/section/${section.id}`}>{section.name}</Link>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Sections;
