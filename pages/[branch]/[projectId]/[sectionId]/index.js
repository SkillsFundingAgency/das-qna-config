import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import cookie from "cookie";
import Cookies from "js-cookie";
import saveAs from "file-saver";
import base64 from "base-64";

import styled from "styled-components";
import {
  GlobalStyles,
  Container,
  Header,
  Title,
  ColumnTitle,
  DisplayControls,
  Columns,
  Row,
  FooterBar,
  Status
} from "../../../../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";

import QnaField from "../../../../components/QnaField";
import AutoSave from "../../../../components/AutoSave";
import FileManager from "../../../../components/FileManager";
import GeneratedPage from "../../../../components/page-builder/GeneratedPage";
import GeneratedSection from "../../../../components/section-builder/GeneratedSection";
import IsJsonValid from "../../../../components/section-builder/IsJsonValid";
import GeneratedJson from "../../../../components/GeneratedJson";
import { githubFetchFileContents } from "../../../../helpers/githubApi";

import Pages from "../../../../components/section-builder/Pages";
import { EMPTY_SECTION } from "../../../../data/data-structures";

const parseCookies = req =>
  cookie.parse(req ? req.headers.cookie || "" : document.cookie);

const required = value => (value ? undefined : "required");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async (branch, projectId, sectionId, values) => {
  localStorage.setItem(
    `${branch}__${projectId}__${sectionId}`,
    JSON.stringify(values)
  );

  // How long the saving icon displays
  await sleep(1500);
};

const Section = ({
  branch,
  projectId,
  sectionId,
  initialSectionData,
  initialUserSettings
}) => {
  const [sectionData, setSectionData] = useState(initialSectionData);
  const [usingLocalSave, setUsingLocalSave] = useState(false);
  // console.log(usingLocalSave);

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
  // const questions =
  //   sectionData &&
  //   sectionData.Pages.map(
  //     page =>
  //       page.Questions &&
  //       page.Questions.reduce(
  //         (accumulator, element) => ({
  //           label: `${element.Label} (${element.QuestionId})`,
  //           value: element.QuestionId
  //         }),`
  //         {}
  //       )
  //   );

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

  // loads data from localStorage to editor
  useEffect(() => {
    const data = localStorage.getItem(`${branch}__${projectId}__${sectionId}`);
    if (data) {
      console.log("Draft found. Loading...");
      setUsingLocalSave(true);
      setSectionData(JSON.parse(data));
      // window.confirm(
      //   "Local save found for this section, would you like to load it?"
      // ) && setSectionData(JSON.parse(data));
    } else {
      console.log("Draft section not found, loading from GitHub.");
      loadDataFromGithub(branch, projectId, sectionId);
      setUsingLocalSave(false);
    }
  }, [branch, projectId, sectionId]);

  const loadDataFromGithub = async () => {
    try {
      const sectionJsonResponse = await githubFetchFileContents(
        branch,
        `src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`
      );
      const sectionData = await JSON.parse(
        sectionJsonResponse.data.repository.object.text
      );
      setSectionData(sectionData);
    } catch (error) {
      console.error(error);
    }
  };

  const saveCurrentSectionToFile = (fileName, jsonContents) => {
    var file = new File([JSON.stringify(jsonContents, 0, 4)], fileName, {
      type: "application/json;charset=utf-8"
    });
    saveAs(file);
  };

  return (
    <>
      <GlobalStyles />
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
            <IsJsonValid values={values} />
            <Container>
              <Header>
                <Title>
                  <a href="/">QnA Config</a> |{" "}
                  {currentView === "section" ? "Section " : "Page "} editor
                </Title>
                <AutoSave
                  // After keyup how long to wait before storing in localStorage
                  debounce={1000}
                  save={() => save(branch, projectId, sectionId, values)}
                />
                <DisplayControls>
                  <DisplayControlIcon
                    icon={faFileAlt}
                    onClick={() => updateUserSettings("showPreview")}
                    width="0"
                    className={userSettings.showPreview ? "view-is-open" : ""}
                  />
                  <DisplayControlIcon
                    icon={faFolder}
                    onClick={() => updateUserSettings("showFileManager")}
                    width="0"
                    className={
                      userSettings.showFileManager ? "view-is-open" : ""
                    }
                  />
                  <DisplayControlIcon
                    icon={faCode}
                    onClick={() => updateUserSettings("showSchema")}
                    width="0"
                    className={userSettings.showSchema ? "view-is-open" : ""}
                  />
                </DisplayControls>
              </Header>

              {sectionData && (
                <Columns>
                  <form onSubmit={handleSubmit}>
                    {/* <h3>{currentView === "section" ? "Section" : "Page"}</h3> */}

                    {currentView === "section" && (
                      <>
                        <Row>
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
                                      meta.error && meta.touched
                                        ? meta.error
                                        : ""
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
                      updateCurrentView={updateCurrentView}
                      currentView={currentView}
                      updateCurrentPage={updateCurrentPage}
                      currentPage={currentPage}
                    />
                  </form>

                  {userSettings.showPreview && (
                    <>
                      {currentView === "page" ? (
                        <GeneratedPage schema={eval(`values.${currentPage}`)} />
                      ) : (
                        <GeneratedSection
                          schema={values}
                          updateCurrentPage={updateCurrentPage}
                          updateCurrentView={updateCurrentView}
                        />
                      )}
                    </>
                  )}

                  {userSettings.showFileManager && (
                    <FileManager
                      loadSectionData={loadSectionData}
                      saveSectionToFile={filename =>
                        saveCurrentSectionToFile(filename, values)
                      }
                    />
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
              )}
              <FooterBar>
                <div>{`${branch} > ${projectId} > ${sectionId}`} </div>
                <div>
                  {usingLocalSave ? (
                    <>
                      Draft section loaded from local storage (
                      <a
                        href={`https://github.com/SkillsFundingAgency/das-qna-api/blob/${branch}/src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`}
                      >
                        View original on GitHub
                      </a>
                      )
                    </>
                  ) : (
                    "Loaded from GitHub"
                  )}
                </div>
              </FooterBar>
            </Container>
          </>
        )}
      />
    </>
  );
};

Section.getInitialProps = async context => {
  const { branch, sectionId, projectId } = context.query;
  const initialSectionData = sectionId === "custom" ? EMPTY_SECTION : null;

  const cookies = parseCookies(context.req);
  return {
    branch,
    projectId,
    sectionId,
    initialSectionData,
    initialUserSettings: cookies.userSettings
  };

  //   // Example response from `context.query`:
  //   // {
  //   //   branch: 'master',
  //   //   projectId: 'epaoall',
  //   //   sectionId: 'section1'
  //   // }
  // const { branch, sectionId, projectId } = context.query;
  //   const cookies = parseCookies(context.req);
  //   // Return with stub data for empty section
  //   if (sectionId === "custom") {
  //     return {
  //       projectId,
  //       sectionId,
  //       initialSectionData: EMPTY_SECTION,
  //       initialUserSettings: cookies.userSettings
  //     };
  //   }
  //   try {
  //     const sectionJsonResponse = await githubFetchFileContents(
  //       branch,
  //       `src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`
  //     );
  //     const sectionData = await JSON.parse(
  //       sectionJsonResponse.data.repository.object.text
  //     );
  //     return {
  //       branch,
  //       projectId,
  //       sectionId,
  //       initialSectionData: sectionData,
  //       initialUserSettings: cookies.userSettings
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   }
};

export default Section;

const DisplayControlIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  cursor: pointer;
  margin-left: 15px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
  &.view-is-open {
    opacity: 1;
  }
`;
