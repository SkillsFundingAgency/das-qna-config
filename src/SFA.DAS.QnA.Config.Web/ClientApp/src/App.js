import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const App = ({ children }) => {
  const [data, setData] = useState({
    projects: [],
    sections: [],
    loading: true
  });

  useEffect(() => {
    fetch("/data.json")
      .then(response => response.json())
      .then(data => {
        setData({
          projects: data.Projects,
          sections: data.Sections,
          loading: false
        });
      });
  }, []);

  return (
    <div className="app-container">
      <nav>
        <Link
          to="projects"
          state={{ projects: data.projects, sections: data.sections }}
        >
          Projects
        </Link>{" "}
        <Link to="sections" state={{ sections: data.sections }}>
          Sections
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default App;
