import React, { useState, useEffect } from "react";
// import { Link } from "@reach/router";

import Projects from "./Projects";

const App = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [data, setData] = useState({
  //   projects: [],
  //   sections: [],
  //   loading: true
  // });

  // useEffect(() => {
  //   fetch("/data.json")
  //     .then(response => response.json())
  //     .then(data => {
  //       setData({
  //         projects: data.Projects,
  //         sections: data.Sections,
  //         loading: false
  //       });
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/projects-data.json");
      const projects = await data.json();
      setProjects(projects.Projects);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      {projects && !loading ? (
        <Projects projects={projects} />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default App;
