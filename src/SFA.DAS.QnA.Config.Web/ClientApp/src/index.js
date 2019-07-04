import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";

const Root = () => (
  <Router>
    <App path="/">
      <Projects path="projects" />
      <Project path="projects/:projectId" />
      <Sections path="sections" />
      <Section path="sections/:sectionId" />
    </App>
  </Router>
);

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
    <div>
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

const Projects = ({ children, location }) => {
  const { projects, sections } = location.state;

  return (
    <div>
      <h1>Projects</h1>
      <ul role="navigation">
        {projects.map(project => (
          <li key={project.id}>
            {/*
             ... allow for relative links in the
             route components. We can link to just
             the `id`, because the href is relative,
             the full href will be "/projects/${id}"
          */}
            <Link
              to={project.id}
              state={{ project: project, sections: sections }}
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

const Project = ({ location }) => {
  const { project, sections } = location.state;

  const projectSections = sections.filter(
    section => !project.sections.includes(section.id)
  );

  return (
    <div>
      <h1>{project.name}</h1>

      {projectSections.map(section => (
        <li key={section.id}>
          <Link to={`/sections/${section.id}`} state={{ section: section }}>
            {section.name}
          </Link>
        </li>
      ))}
    </div>
  );
};

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

const Section = ({ location }) => {
  const section = location.state.section;

  return (
    <div>
      <h1>{section.name}</h1>

      {section.Pages.map(page => (
        <Page key={page.PageId} page={page} />
      ))}
    </div>
  );
};

const Page = props => {
  console.log(props);

  return <div>{props.page.PageId}</div>;
};

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
