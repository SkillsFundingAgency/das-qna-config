import React, { useState, useEffect } from "react";
// import { Link } from "@reach/router";

import Projects from "./Projects";

const App = () => {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/projects-data.json");
      const projects = await data.json();
      setProjectsData(projects.Projects);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      {projectsData && !loading ? (
        <Projects projectsData={projectsData} />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default App;
