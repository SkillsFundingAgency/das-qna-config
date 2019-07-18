import React, { useState, useEffect } from "react";

import Section from "./Section";
import AddSectionForm from "./forms/AddSectionForm";

const Sections = ({ project, addSectionToProject }) => {
  /*  TODO:
      We'll need to update both the project-data with a reference to the added section
      as well as generate a new section-id.json. This will be a post to the API
      but will go into local storage for now.
  */

  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);

  // View single section
  const [showSection, setShowSection] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/section-data.json");
      const sections = await data.json();
      setSections(sections.Sections);
    };

    fetchData();
    setLoading(false);
  }, []);

  const openSection = id => {
    const sectionToOpen = sections.find(section => section.id === id);
    setSelectedSection(sectionToOpen);
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
        <Section section={selectedSection} />
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
