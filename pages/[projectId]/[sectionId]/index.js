import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import cookie from "cookie";
import Cookies from "js-cookie";
import saveAs from "file-saver";
import base64 from "base-64";

import styled from "styled-components";
import GlobalStyles from "../../../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";

import QnaField from "../../../components/QnaField";
import AutoSave from "../../../components/AutoSave";
import FileManager from "../../../components/FileManager";
import GeneratedPage from "../../../components/page-builder/GeneratedPage";
import GeneratedSection from "../../../components/section-builder/GeneratedSection";
import GeneratedJson from "../../../components/GeneratedJson";
import { githubFetch } from "./../../../helpers/githubApi";

import Pages from "../../../components/section-builder/Pages";

const parseCookies = req =>
  cookie.parse(req ? req.headers.cookie || "" : document.cookie);

const required = value => (value ? undefined : "required");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async (projectId, sectionId, values) => {
  // console.log("projectId:", projectId);
  // console.log("sectionId:", sectionId);
  // console.log("values:", values);

  localStorage.setItem(`${projectId}__${sectionId}`, JSON.stringify(values));
  // How long the saving icon displays
  await sleep(1500);
};

const Section = ({
  projectId,
  sectionId,
  initialSectionData,
  initialUserSettings
}) => {
  const [sectionData, setSectionData] = useState(initialSectionData);

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
    setCurrentView(changeViewTo);
  };

  const updateCurrentPage = changePageTo => {
    setCurrentPage(changePageTo);
  };

  // useEffect on below to get "questions" to stay current.
  // Not currently being used
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
    console.log(fileContents);

    setSectionData(JSON.parse(fileContents));
  };

  useEffect(() => {
    Cookies.set("userSettings", userSettings);
  }, [userSettings]);

  // loads data from localStorage to editor
  // useEffect(() => {
  //   // this is a problem because the localStorage data will always overwrite the loaded section data
  //   const data = localStorage.getItem(`${projectId}__${sectionId}`);
  //   if (data) {
  //     setSectionData(JSON.parse(data));
  //   }
  // }, []);

  const saveCurrentSectionToFile = (fileName, jsonContents) => {
    var file = new File([JSON.stringify(jsonContents, 0, 4)], fileName, {
      type: "application/json;charset=utf-8"
    });
    saveAs(file);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <a href="/">QnA Config</a> |{" "}
          {currentView === "section" ? "Section " : "Page "} editor
        </Header>
        <DisplayControls>
          <TogglePreView
            icon={faFileAlt}
            onClick={() => updateUserSettings("showPreview")}
            width="0"
            className={userSettings.showPreview ? "view-is-open" : ""}
          />
          <ToggleFileView
            icon={faFolder}
            onClick={() => updateUserSettings("showFileManager")}
            width="0"
            className={userSettings.showFileManager ? "view-is-open" : ""}
          />
          <ToggleCodeView
            icon={faCode}
            onClick={() => updateUserSettings("showSchema")}
            width="0"
            className={userSettings.showSchema ? "view-is-open" : ""}
          />
        </DisplayControls>
        <Form
          // subscription={{ submitting: true, pristine: true }}
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
              <AutoSave
                // After keyup how long to wait before storing in localStorage
                debounce={1000}
                save={() => save(projectId, sectionId, values)}
              />
              <Columns>
                <form onSubmit={handleSubmit}>
                  {/* <h3>{currentView === "section" ? "Section" : "Page"}</h3> */}

                  {currentView === "section" && (
                    <>
                      <Row style={{ marginTop: "20px" }}>
                        <QnaField name="Title" validate={required}>
                          {({ input, meta }) => {
                            return (
                              <>
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
                  <GeneratedJson
                    values={
                      currentView === "page"
                        ? eval(`values.${currentPage}`)
                        : values
                    }
                  />
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
  // Example response from `context.query`:
  // { projectId: 'epaoall', sectionId: 'section1' }

  const { sectionId, projectId } = context.query;
  const cookies = parseCookies(context.req);

  // Load local data for empty section. Refactor this.
  if (sectionId === "empty-section") {
    const jsonResponse = await import(
      `../../../data/sections/${sectionId}.json`
    );
    const sectionData = jsonResponse.default;
    return {
      projectId: projectId,
      sectionId: sectionId,
      initialSectionData: sectionData,
      initialUserSettings: cookies.userSettings
    };
  }

  try {
    const jsonResponse = await githubFetch(
      `/src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`
    );
    const sectionData = await JSON.parse(base64.decode(jsonResponse.content));
    return {
      projectId: projectId,
      sectionId: sectionId,
      initialSectionData: sectionData,
      initialUserSettings: cookies.userSettings
    };
  } catch (error) {
    console.error(error);
  }
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
    padding: 0 20px;
    overflow-y: auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }
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
