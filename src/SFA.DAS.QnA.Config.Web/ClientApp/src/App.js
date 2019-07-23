import React, { useState, useEffect } from "react";
import Projects from "./Projects";
import { Sidebar, Menu, Icon } from "semantic-ui-react";

const App = () => {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/data/projects-data.json");
      const projects = await data.json();
      setProjectsData(projects.Projects);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        {/* <Link to="/projects"> */}
        <Menu.Item name="projects">
          <Icon name="folder open" />
          Projects
        </Menu.Item>
        {/* </Link> */}
        {/* <Menu.Item name="logout">
          <Icon name="power" />
          Logout
        </Menu.Item> */}
      </Sidebar>
      <div className="app-container">
        {projectsData && !loading ? (
          // <Router>
          <Projects
            // path="/projects"
            // navigate={navigate}
            projectsData={projectsData}
          />
        ) : (
          // </Router>
          <span>Loading...</span>
        )}
      </div>
    </>
  );
};

export default App;
