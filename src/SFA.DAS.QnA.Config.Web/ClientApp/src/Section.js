import React, { useState, useEffect } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";

import Page from "./Page";
import EditPageForm from "./forms/EditPageForm";
import EditQuestionForm from "./forms/EditQuestionForm";

// import Example from "./dnd-example/example";
// import { DndProvider } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";

const pageStyle = {
  margin: "0 0 200px 0",
  display: "flex",
  justifyContent: "center"
};

const inlinePageStyle = {
  margin: "200px 0",
  display: "flex",
  justifyContent: "space-between"
};

const labelStyle = {
  position: "relative",
  background: "white",
  padding: "5px",
  borderRadius: "3px",
  border: "2px solid #ccc"
};

const boxStyle = { padding: "10px", border: "2px solid #222" };

const Section = ({ sectionId, match }) => {
  const sectionIdToLoad = sectionId || match.params.id;

  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editing question form
  const [showQuestionToEdit, setShowQuestionToEdit] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);

  // Editing page form
  const [showPageToEdit, setShowPageToEdit] = useState(false);
  const [pageToEdit, setPageToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/data/sections/${sectionIdToLoad}.json`);
      const section = await data.json();
      setSection(section);
    };

    fetchData();
    setLoading(false);
  }, [sectionIdToLoad]);

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

  const editPage = page => {
    setShowPageToEdit(true);
    setPageToEdit(page);
  };

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

  const updatePage = pageToUpdate => {
    console.log("pageToUpdate:", pageToUpdate);

    setSection({
      ...section,
      Pages: section.Pages.map(page =>
        page.PageId === pageToUpdate.PageId ? pageToUpdate : page
      )
    });
    console.log("section:", section);
  };

  return (
    <>
      {showPageToEdit && (
        <EditPageForm
          pageToEdit={pageToEdit}
          section={section}
          updatePage={updatePage}
        />
      )}
      {showQuestionToEdit && (
        <EditQuestionForm questionToEdit={questionToEdit} />
      )}
      {section && !loading ? (
        <>
          <h1>{section.Description}</h1>

          {section.Pages.length ? (
            <>
              {/* <ArcherContainer
                strokeColor="#222"
                arrowLength="8"
                arrowThickness="8"
              >
                <div style={pageStyle}>
                  <ArcherElement
                    id="page-1"
                    relations={[
                      {
                        targetId: "page-2",
                        sourceAnchor: "bottom",
                        targetAnchor: "top",
                        label: <div style={labelStyle}>Yes</div>
                      },
                      {
                        targetId: "page-3",
                        sourceAnchor: "bottom",
                        targetAnchor: "top",
                        label: <div style={labelStyle}>No</div>
                      },
                      {
                        targetId: "page-4",
                        sourceAnchor: "bottom",
                        targetAnchor: "top",
                        label: <div style={labelStyle}>Maybe</div>
                      }
                    ]}
                  >
                    <div style={boxStyle}>Page 1</div>
                  </ArcherElement>
                </div>

                <div style={inlinePageStyle}>
                  <ArcherElement
                    id="page-2"
                    relations={[
                      {
                        targetId: "page-5",
                        sourceAnchor: "bottom",
                        targetAnchor: "top"
                      }
                    ]}
                  >
                    <div style={boxStyle}>Page 2</div>
                  </ArcherElement>
                  <ArcherElement
                    id="page-3"
                    relations={[
                      {
                        targetId: "page-5",
                        sourceAnchor: "bottom",
                        targetAnchor: "top"
                      }
                    ]}
                  >
                    <div style={boxStyle}>Page 3</div>
                  </ArcherElement>
                  <ArcherElement
                    id="page-4"
                    relations={[
                      {
                        targetId: "page-5",
                        sourceAnchor: "bottom",
                        targetAnchor: "top"
                      }
                    ]}
                  >
                    <div style={boxStyle}>Page 4</div>
                  </ArcherElement>
                </div>

                <div style={pageStyle}>
                  <ArcherElement
                    id="page-5"
                    relations={[
                      {
                        targetId: "page-6",
                        sourceAnchor: "bottom",
                        targetAnchor: "top",
                        style: {
                          strokeColor: "#f00",
                          borderStyle: "dashed"
                        }
                      }
                    ]}
                  >
                    <div style={boxStyle}>Page 5</div>
                  </ArcherElement>
                </div>

                <div style={pageStyle}>
                  <ArcherElement id="page-6">
                    <div style={boxStyle}>Page 6</div>
                  </ArcherElement>
                </div>
              </ArcherContainer> */}
              <ArcherContainer
                strokeColor="#222"
                arrowLength="8"
                arrowThickness="8"
              >
                {section.Pages.map((page, index) => {
                  return (
                    <Page
                      key={index}
                      page={page}
                      editQuestion={editQuestion}
                      editPage={editPage}
                    />
                  );
                })}
              </ArcherContainer>
            </>
          ) : (
            <>
              <button className="govuk-button" onClick={addPage}>
                Add page
              </button>
              <p>No pages in this section.</p>
            </>
          )}
          <button className="govuk-button" onClick={saveSection}>
            Save section
          </button>
        </>
      ) : null}

      {/* <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider> */}
    </>
  );
};

export default Section;
