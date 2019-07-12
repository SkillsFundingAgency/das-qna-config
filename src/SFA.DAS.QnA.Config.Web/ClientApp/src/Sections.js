import React, { useState } from "react";
import { Link } from "@reach/router";

import AddSectionForm from "./forms/AddSectionForm";

const Sections = ({ location }) => {
  const [sections, setSection] = useState(location.state.sections);

  const addSection = section => {
    section.id = `section-${sections.length + 1}`;
    setSection([...sections, section]);
  };

  return (
    <div>
      <h1>Sections</h1>
      <ul role="navigation">
        {sections.map(section => (
          <li key={section.id}>
            <Link to={section.id} state={{ section: section }}>
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
      <AddSectionForm addSection={addSection} />
    </div>
  );
};

export default Sections;
