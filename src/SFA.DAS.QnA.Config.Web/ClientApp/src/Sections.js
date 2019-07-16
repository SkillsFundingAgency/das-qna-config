import React, { useState } from "react";
import { Link } from "@reach/router";

import AddSectionForm from "./forms/AddSectionForm";

const Sections = ({ project }) => {
  console.log("project:", project);
  // const { project } = location.state;

  const [sections, setSection] = useState(project.sections);

  const addSection = section => {
    section.id = `section-${sections.length + 1}`;
    setSection([...sections, section]);
  };

  return (
    <>
      <h1>Sections</h1>
      <AddSectionForm addSection={addSection} />
      <h2>{project.name}</h2>

      <ul role="navigation">
        {sections.map(section => (
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

export default Sections;
