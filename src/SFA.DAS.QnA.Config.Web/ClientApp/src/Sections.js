import React, { useState } from "react";
// import { v4 } from 'uuid';

// import { EMPTY_PROJECT } from "./data-structures";

import Section from "./Section";
import AddSectionForm from "./forms/AddSectionForm";

const Sections = ({ project, addSectionToProject }) => {
  /*  TODO:
      We'll need to update both the project-data with a reference to the added section
      as well as generate a new section-id.json. This will be a post to the API
      but will go into local storage for now.
  */

  console.log("project:", project);
  const [sections, setSections] = useState(project.sections);

  // View single section
  const [showSection, setShowSection] = useState(false);
  const [sectionId, setSectionId] = useState(null);

  const openSection = id => {
    setSectionId(id);
    setShowSection(true);
  };

  const addSection = section => {
    section.id = `section-${sections.length + 1}`;
    setSections([...sections, section]);
    addSectionToProject(project.id, section.id, section.name);
  };

  return (
    <>
      {showSection ? (
        <Section sectionId={sectionId} />
      ) : (
        <>
          <AddSectionForm addSection={addSection} />

          <ul role="navigation">
            {project.sections.map((section, index) => (
              <div key={index}>
                <button
                  className="button-link"
                  onClick={() => openSection(section.id)}
                >
                  {section.name}
                </button>
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Sections;
