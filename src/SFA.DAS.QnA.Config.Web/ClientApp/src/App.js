import React, { useState, useEffect } from "react";
import Projects from "./Projects";
import Sidebar from "./Sidebar";

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
    <div className="app-container">
      <Sidebar />
      {projectsData && !loading ? (
        <Projects projectsData={projectsData} />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default App;
