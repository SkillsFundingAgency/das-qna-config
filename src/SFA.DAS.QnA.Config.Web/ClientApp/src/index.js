import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import "./index.css";
import App from "./App";
// import Projects from "./Projects";
// import Sections from "./Sections";
// import Sections from "./Sections";
import Section from "./Section";
import EditQuestionForm from "./forms/EditQuestionForm";
import * as serviceWorker from "./serviceWorker";

const Root = () => (
  <div className="app-container">
    <Router>
      <App path="/" />
      <Section path=":sectionId" />
      <EditQuestionForm path=":sectionId/:questionId" />
    </Router>
  </div>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
