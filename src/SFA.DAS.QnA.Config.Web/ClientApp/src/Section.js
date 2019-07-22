import React, { useState, useEffect } from "react";
import Page from "./Page";
import EditQuestionForm from "./forms/EditQuestionForm";

// import Example from "./dnd-example/example";
// import { DndProvider } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";

const Section = ({ sectionId }) => {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editing question form
  const [showQuestionToEdit, setShowQuestionToEdit] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/data/sections/${sectionId}.json`);
      const section = await data.json();
      setSection(section);
    };

    fetchData();
    setLoading(false);
  }, [sectionId]);

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

  const editQuestion = question => {
    setShowQuestionToEdit(true);
    setQuestionToEdit(question);
  };

  const saveSection = () => {
    // event.preventDefualt();
    const jsonSection = JSON.stringify(section);
    window.localStorage.setItem(section.Sectionid, jsonSection);
  };

  const addPage = () => {
    console.log("page add");
  };

  return (
    <>
      {showQuestionToEdit && (
        <EditQuestionForm questionToEdit={questionToEdit} />
      )}
      {section && !loading ? (
        <>
          <h1>{section.Description}</h1>
          {section.Pages.length ? (
            <>
              <button className="govuk-button" onClick={saveSection}>
                Save section
              </button>
              {section.Pages.map(page => (
                <Page
                  key={page.PageId}
                  page={page}
                  editQuestion={editQuestion}
                />
              ))}
            </>
          ) : (
            <>
              <button className="govuk-button" onClick={addPage}>
                Add page
              </button>
              <p>No pages in this section.</p>
            </>
          )}
        </>
      ) : null}

      {/* <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider> */}
    </>
  );
};

export default Section;
