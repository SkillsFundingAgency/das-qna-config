import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import cookie from "cookie";
import Cookies from "js-cookie";
import saveAs from "file-saver";
// import fetch from "isomorphic-unfetch";

import styled from "styled-components";
import GlobalStyles from "../../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";

import QnaField from "./../../components/QnaField";
import FloatingLabel from "./../../components/FloatingLabel";
import AutoSave from "./../../components/AutoSave";
import FileManager from "./../../components/FileManager";
import GeneratedPage from "../../components/page-builder/GeneratedPage";
import GeneratedSection from "../../components/section-builder/GeneratedSection";
import Pages from "../../components/section-builder/Pages";

const parseCookies = req =>
  cookie.parse(req ? req.headers.cookie || "" : document.cookie);

const required = value => (value ? undefined : "required");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async values => {
  localStorage.setItem("sectionData", JSON.stringify(values));
  await sleep(2000);
};

const Section = ({ initialSectionData, initialUserSettings }) => {
  const [sectionData, setSectionData] = useState(initialSectionData.default);

  const [currentView, setCurrentView] = useState("section"); // or page
  const [currentPage, setCurrentPage] = useState(0);

  const [userSettings, setUserSettings] = useState(
    initialUserSettings
      ? JSON.parse(initialUserSettings)
      : {
          showPreview: true,
          showSchema: false,
          showFileManager: false
        }
  );

  const updateCurrentView = changeViewTo => {
    // console.log("changeViewTo:", changeViewTo);
    setCurrentView(changeViewTo);
  };

  const updateCurrentPage = changePageTo => {
    // console.log("changePageTo:", changePageTo);
    setCurrentPage(changePageTo);
  };

  // useEffect on below to get "questions" to stay current
  const questions = sectionData.Pages.map(
    page =>
      page.Questions &&
      page.Questions.reduce(
        (accumulator, element) => ({
          label: `${element.Label} (${element.QuestionId})`,
          value: element.QuestionId
        }),
        {}
      )
  );

  const updateUserSettings = setting => {
    setUserSettings(prevState => {
      return {
        ...prevState,
        [setting]: !userSettings[setting]
      };
    });
  };

  const loadSectionData = fileContents => {
    setSectionData(JSON.parse(fileContents));
  };

  useEffect(() => {
    Cookies.set("userSettings", userSettings);
  }, [userSettings]);

  useEffect(() => {
    // this is a problem because the localStorage data will always overwrite the loaded section data
    const data = localStorage.getItem("sectionData");
    if (data) {
      setSectionData(JSON.parse(data));
    }
  }, []);

  const saveCurrentSectionToFile = (fileName, jsonContents) => {
    var file = new File([JSON.stringify(jsonContents)], fileName, {
      type: "application/json;charset=utf-8"
    });
    saveAs(file);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          QnA Config | {currentView === "section" ? "Section " : "Page "} editor
        </Header>
        <DisplayControls>
          <TogglePreView
            icon={faFileAlt}
            onClick={() => updateUserSettings("showPreview")}
            width="0"
            title="Toggle preview"
            className={userSettings.showPreview ? "view-is-open" : ""}
          />
          <ToggleFileView
            icon={faFolder}
            onClick={() => updateUserSettings("showFileManager")}
            width="0"
            title="Toggle file manager"
            className={userSettings.showFileManager ? "view-is-open" : ""}
          />
          <ToggleCodeView
            icon={faCode}
            onClick={() => updateUserSettings("showSchema")}
            width="0"
            title="Toggle code view"
            className={userSettings.showSchema ? "view-is-open" : ""}
          />
        </DisplayControls>
        <Form
          onSubmit={() => {}}
          initialValues={sectionData}
          mutators={{
            ...arrayMutators
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            form: {
              mutators: { push, pop } // injected from final-form-arrays above
            },
            pristine,
            values
          }) => (
            <>
              <AutoSave debounce={1000} save={save} />
              <Columns>
                <form onSubmit={handleSubmit}>
                  {/* <h3>{currentView === "section" ? "Section" : "Page"}</h3> */}

                  {currentView === "section" && (
                    <>
                      <Row style={{ marginTop: "20px" }}>
                        <QnaField name="Title" validate={required}>
                          {({ input, meta }) => {
                            // console.log(meta);

                            return (
                              <>
                                {/* {console.log(meta.dirty)} */}
                                {/* <FloatingLabel dirty={meta.dirty}>
                                Title (section)
                              </FloatingLabel> */}
                                <label>Title (section)</label>
                                <input
                                  {...input}
                                  type="text"
                                  placeholder={
                                    meta.error && meta.touched
                                      ? `Title is ${meta.error}`
                                      : `Title (section)`
                                  }
                                  style={{ width: "100%" }}
                                  component="input"
                                  className={
                                    meta.error && meta.touched ? meta.error : ""
                                  }
                                />
                              </>
                            );
                          }}
                        </QnaField>
                      </Row>
                      <Row>
                        <QnaField name="LinkTitle" validate={required}>
                          {({ input, meta }) => (
                            <>
                              <label>Link title (section)</label>
                              <input
                                {...input}
                                type="text"
                                placeholder={
                                  meta.error && meta.touched
                                    ? `Link title is ${meta.error}`
                                    : `Link title (section)`
                                }
                                style={{ width: "100%" }}
                                component="input"
                                className={
                                  meta.error && meta.touched ? meta.error : ""
                                }
                              />
                            </>
                          )}
                        </QnaField>
                      </Row>
                    </>
                  )}

                  <Pages
                    questions={questions}
                    updateCurrentView={updateCurrentView}
                    currentView={currentView}
                    updateCurrentPage={updateCurrentPage}
                    currentPage={currentPage}
                  />
                </form>

                {userSettings.showPreview && (
                  <div>
                    <h3>
                      <FontAwesomeIcon icon={faFileAlt} width="0" /> Preview
                    </h3>
                    {currentView === "page" ? (
                      <GeneratedPage schema={eval(`values.${currentPage}`)} />
                    ) : (
                      <GeneratedSection
                        schema={values}
                        updateCurrentPage={updateCurrentPage}
                        updateCurrentView={updateCurrentView}
                      />
                    )}
                  </div>
                )}

                {userSettings.showFileManager && (
                  <div>
                    <h3>
                      <FontAwesomeIcon icon={faFolder} width="0" /> File manager
                    </h3>
                    <FileManager
                      loadSectionData={loadSectionData}
                      saveSectionToFile={filename =>
                        saveCurrentSectionToFile(filename, values)
                      }
                    />
                  </div>
                )}

                {userSettings.showSchema && (
                  <div>
                    <h3>
                      <FontAwesomeIcon icon={faCode} width="0" /> Generated JSON{" "}
                    </h3>
                    {currentView === "page" ? (
                      <Dump>
                        {JSON.stringify(eval(`values.${currentPage}`), 0, 2)}
                      </Dump>
                    ) : (
                      <Dump>{JSON.stringify(values, 0, 2)}</Dump>
                    )}
                  </div>
                )}
              </Columns>
            </>
          )}
        />
      </Container>
    </>
  );
};

Section.getInitialProps = async context => {
  const { sectionId } = context.query;
  const cookies = parseCookies(context.req);

  // if (context.req) {
  // const data = await import(`./../data/sections/section-1.json`);
  const initialSectionData = await import(
    `../../data/sections/${sectionId}.json`
  );
  // console.log(
  //   `Show data fetched. Count: ${initialSectionData.Pages.length} pages`
  // );
  return {
    initialSectionData: initialSectionData,
    initialUserSettings: cookies.userSettings
  };
  // } else {
  //   const data = window.__NEXT_DATA__.props.pageProps.data;
  //   return { data };
  // }
};

export default Section;

const Container = styled.div`
  padding: 0 10px;
  h3 {
    text-align: left;
    color: #333;
  }
`;

const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  margin: 5px 15px;
  text-align: left;
  color: #333;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Columns = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  padding-top: 50px;
  & > * {
    flex: 1;
    margin: 5px;
    border: 3px solid #ddd;
    border-radius: 3px;
    /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); */
    padding: 0 20px;
    overflow-y: auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 7px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 2px solid #ccc;
    border-radius: 3px;
    &[disabled] {
      background: #eee;
    }
  }

  .required {
    border: 2px solid #d60000;
  }

  & > input {
    margin: 0;
    padding: 9px;
  }

  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 0;
  }

  & > label {
    position: absolute;
    top: -6px;
    left: 10px;
    padding: 0 1px;
    line-height: 1;
    font-size: 11px;
    font-weight: bold;
    color: #555555;
    background: #fff;
  }
`;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;

const DisplayControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
`;

const TogglePreView = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  margin-right: 15px;
  opacity: 0.7;
  padding: 0 0 3px;
  border-bottom: 3px solid #fff;
  &:hover {
    opacity: 1;
  }
  &.view-is-open {
    border-bottom: 3px solid #00703c;
    opacity: 1;
  }
`;

const ToggleFileView = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  margin-right: 15px;
  opacity: 0.7;
  padding: 0 0 3px;
  border-bottom: 3px solid #fff;
  &:hover {
    opacity: 1;
  }
  &.view-is-open {
    border-bottom: 3px solid #00703c;
    opacity: 1;
  }
`;

const ToggleCodeView = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  opacity: 0.7;
  padding: 0 0 3px;
  border-bottom: 3px solid #fff;
  &:hover {
    opacity: 1;
  }
  &.view-is-open {
    border-bottom: 3px solid #00703c;
    opacity: 1;
  }
`;
