import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";

import Projects from "./Projects";
import Project from "./Project";
import Section from "./Section";

const App = () => {
  return (
    <>
      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        <Link to="/">
          <Menu.Item name="projects">
            <Icon name="folder open" />
            Projects
          </Menu.Item>
        </Link>
        <Link to="section/section-7">
          <Menu.Item name="section">
            <Icon name="folder open" />
            Working section
          </Menu.Item>
        </Link>
        {/* <Menu.Item name="logout">
          <Icon name="power" />
          Logout
        </Menu.Item> */}
      </Sidebar>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Projects} />
          <Route path="/project/:id" component={Project} />
          <Route path="/section/:id" component={Section} />
        </Switch>
      </div>
    </>
  );
};

export default App;
