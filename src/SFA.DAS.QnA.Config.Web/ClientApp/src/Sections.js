import React from "react";
import { Link } from "@reach/router";

const Sections = ({ location }) => {
  const { sections } = location.state;

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
    </div>
  );
};

export default Sections;
