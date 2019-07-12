import React, { useState } from "react";
import Page from "./Page";

// import Example from "./dnd-example/example";
// import { DndProvider } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";

const Section = ({ location }) => {
  const [section, setSection] = useState(location.state.section);
  // console.log(section);

  /*  TODO: Update a copy of the section state here based on:
   *
   *  SectionId > PageId > QuestionID
   *
   *   This is where we'll make the call to send the section data back to the server. (If we need to include project data go further up the tree)
   *
   *   Pages is an [] in which each page has a PageId, SectionId and SequenceId.
   *   Pages contains a Questions [] of which each has a QuestionId
   *   Each question has an Input.Type property which defines the question type and the makup of the question
   *   If question type is "ComplexRadio" the Input.Options [] will contain a FurtherQuestions []
   *   which has it's own set of properties (such as QuestionBodyText) and Input.Validations.
   *   There is no further nesting after this level. (ComplexRadio cannot contain a ComplexRadio 😅)
   *
   */

  const saveSection = () => {
    // event.preventDefualt();
    const jsonSection = JSON.stringify(section);
    window.localStorage.setItem(section.id, jsonSection);
  };

  return (
    <div>
      <h1>{section.name}</h1>
      <button onClick={saveSection}>Save section</button>

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
