import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import "./index.css";
import App from "./App";
import Projects from "./Projects";
import Project from "./Project";
import Sections from "./Sections";
import Section from "./Section";
import EditQuestion from "./EditQuestion";
import * as serviceWorker from "./serviceWorker";

const Root = () => (
  <Router>
    <App path="/">
      <Projects path="projects" />
      <Project path="projects/:projectId" />
      <Sections path="sections" />
      <Section path="sections/:sectionId" />
      <EditQuestion path="questions/:questionId" />
    </App>
  </Router>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
