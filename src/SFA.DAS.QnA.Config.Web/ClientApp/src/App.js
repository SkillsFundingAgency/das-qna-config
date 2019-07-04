import React from "react";

import { Link } from "@reach/router";
import { H1, H2 } from "govuk-react";

import Section from "./Section";
import Page from "./Page";

const App = () => (
  <div style={{ width: 600, margin: "0 auto" }}>
    <H1 size="LARGE">QnA Config</H1>

    <nav>
      <Link to="/">Projects home</Link>
      {" | "}
      <Link to="/123">Project 123</Link>
      {" | "}
      {/* <Link to="/123/456">Workflow 456</Link>
      {" | "} */}
      <Link to="/123/456/sequence/789">Sequence 789</Link>
      {" | "}
      <Link to="123/456/section/012">Section 012</Link>
      {" | "}
      <Link to="123/456/section/012/page/1">Page 1</Link>
    </nav>

    <hr />

    <Router>
      <Home path="/" />
      <Projects path=":projectId">
        {/* <Workflow path=":workflowId"> */}
        <Sequence path="sequence/:sequenceId" />
        <Section path="section/:sectionId">
          <Page path="page/:pageId" foo="bar" />
        </Section>
        {/* </Workflow> */}
      </Projects>
    </Router>
  </div>
);

const Home = () => (
  <div>
    <H2 size="SMALL">Projects home</H2>
    <Link to="123">Project 123</Link>
    <br />
    <Link to="234">Project 234</Link>
    <br />
    <Link to="345">Project 345</Link>
  </div>
);

const Projects = ({ projectId, children }) => (
  <div>
    <H2 size="SMALL">Project: {projectId} </H2>
    {children}
  </div>
);

const Workflow = ({ workflowId, children }) => (
  <div>
    <H2 size="SMALL">Workflow: {workflowId}</H2>
    {children}
  </div>
);

const Sequence = props => (
  <div>
    <H2 size="SMALL">Sequence: {props.sequenceId}</H2>
  </div>
);

export default App;
