import React, { useState, useEffect } from "react";
import Page from "./Page";

// import Example from "./dnd-example/example";
// import { DndProvider } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";

const Section = ({ section }) => {
  console.log(section);

  // const [section, setSection] = useState(null);
  // const [loading, setLoading] = useState(true);

  /*  TODO:
  // So actually here we only want to load the section data
  // for the section which has been clicked on (this json has all of the sections in)
  */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch("/section-data.json");
  //     const sections = await data.json();
  //     const thisSection = sections.Sections.filter(
  //       thisSection => thisSection.id === location.state.section.id
  //     );
  //     // console.log("sections:", thisSection);
  //     setSection(thisSection[0]);
  //   };

  //   fetchData();
  //   setLoading(false);
  // }, [location.state.section.id]);

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
    <>
      {section ? (
        <>
          <h1>{section.name}</h1>
          <button className="govuk-button" onClick={saveSection}>
            Save section
          </button>
          {section.Pages.map(page => (
            <Page key={page.PageId} page={page} />
          ))}
        </>
      ) : (
        <p>No pages in this section.</p>
      )}

      {/* <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider> */}
    </>
  );
};

export default Section;
