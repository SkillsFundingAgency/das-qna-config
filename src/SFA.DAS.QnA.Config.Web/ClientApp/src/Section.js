import React from "react";
import Page from "./Page";

// import Example from "./dnd-example/example";
// import { DndProvider } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";

const Section = ({ location }) => {
  const section = location.state.section;

  return (
    <div>
      <h1>{section.name}</h1>

      {section.Pages.length ? (
        section.Pages.map(page => <Page key={page.PageId} page={page} />)
      ) : (
        <p>No pages in this section.</p>
      )}

      {/* <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider> */}
    </div>
  );
};

export default Section;
