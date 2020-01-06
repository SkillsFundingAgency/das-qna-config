import { useState, useEffect } from "react";
import Router from "next/router";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import cookie from "cookie";
import Cookies from "js-cookie";
import saveAs from "file-saver";
import { format } from "date-fns";

import styled from "styled-components";
import {
  GlobalStyles,
  Container,
  Header,
  Title,
  DisplayControls,
  Columns,
  Row,
  FooterBar
} from "../../../../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFolder,
  faFileAlt,
  faBug,
  faAngleRight,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

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

const Section = ({
  branch,
  projectId,
  sectionId,
  initialSectionData,
  initialUserSettings,
  initialPageSettings
}) => {
  const [sectionData, setSectionData] = useState(initialSectionData);
  const [usingLocalSave, setUsingLocalSave] = useState(false);
  const [lastSave, setLastSave] = useState("");

  // const [currentView, setCurrentView] = useState(
  //   initialPageSettings ? JSON.parse(initialPageSettings).currentView : null
  // ); // or page
  // console.log("TCL: currentView", currentView);
  // const [currentPage, setCurrentPage] = useState(
  //   initialPageSettings ? JSON.parse(initialPageSettings).currentPage : null
  // );
  // console.log("TCL: currentPage", currentPage);

  const [currentView, setCurrentView] = useState("section"); // or page
  const [currentPage, setCurrentPage] = useState(0);

  const [userSettings, setUserSettings] = useState(
    initialUserSettings
      ? JSON.parse(initialUserSettings)
      : {
          showErrors: false,
          showPreview: true,
          showSchema: false,
          showFileManager: false
        }
  );

  const [numberOfErrors, setNumberOfErrors] = useState(0);

  const numberOfErrorsFromChild = numberOfErrorsFromChild =>
    setNumberOfErrors(numberOfErrorsFromChild);

  const save = async (branch, projectId, sectionId, values) => {
    const timeOfSave = format(new Date(), "H:mm:ss 'on' do LLL");
    setLastSave(timeOfSave);
    setUsingLocalSave(true);
    localStorage.setItem(
      `${branch}__${projectId}__${sectionId}__draft`,
      JSON.stringify({ timeOfSave, values })
    );

    // How long the saving icon displays
    await sleep(1500);
  };

  const updateCurrentView = changeViewTo => {
    setCurrentView(changeViewTo);
  };

  const updateCurrentPage = changePageTo => {
    setCurrentPage(changePageTo);
  };

  const deleteDraft = event => {
    event.preventDefault();
    localStorage.removeItem(`${branch}__${projectId}__${sectionId}__draft`);
    Router.push({
      pathname: `/${branch}/${projectId}/${sectionId}`,
      query: { new: "draft" }
    });
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
    Cookies.set("pageSettings", { currentView, currentPage });
  }, [currentView, currentPage]);

  useEffect(() => {
    Cookies.set("userSettings", userSettings);
  }, [userSettings]);

  // loads data from localStorage to editor
  useEffect(() => {
    const data = localStorage.getItem(
      `${branch}__${projectId}__${sectionId}__draft`
    );
    if (data) {
      console.log("Loading draft...");
      setUsingLocalSave(true);
      setSectionData(JSON.parse(data).values);
      setLastSave(JSON.parse(data).timeOfSave);
      // window.confirm(
      //   "Local save found for this section, would you like to load it?"
      // ) && setSectionData(JSON.parse(data));
    } else {
      console.log("Loading from GitHub.");
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
            <IsJsonValid
              values={values}
              sendNumberOfErrorsToParent={numberOfErrorsFromChild}
              showErrors={userSettings.showErrors}
            />

            <Container>
              <Header>
                <Title>
                  QnA Config |{" "}
                  <BreadcrumbLink href="/">Projects</BreadcrumbLink>
                  <AngleIcon icon={faAngleRight} width="0" />
                  {currentView === "section" ? "Section " : "Page "} editor
                </Title>
                <AutoSave
                  // After keyup how long to wait before storing in localStorage
                  debounce={3000}
                  save={() => save(branch, projectId, sectionId, values)}
                />
                <DisplayControls>
                  {numberOfErrors > 0 ? (
                    <span className="fa-layers" style={{ fontSize: "1.5em" }}>
                      <BugIcon
                        icon={faBug}
                        onClick={() => updateUserSettings("showErrors")}
                        width="0"
                        className={
                          userSettings.showErrors ? "view-is-open" : ""
                        }
                      />

                      <span
                        className="fa-layers-counter"
                        style={{ fontSize: "1.5em" }}
                      >
                        {numberOfErrors}
                      </span>
                    </span>
                  ) : (
                    <DisplayControlIcon
                      icon={faCheckCircle}
                      width="0"
                      style={{ color: "#34b300", opacity: 1 }}
                    />
                  )}

                  {/* <span className="fa-layers-text fa-inverse">
                      {numberOfErrors}
                    </span> */}

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
                  {/* {console.log(sectionData)} */}
                  <form onSubmit={handleSubmit}>
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
                      currentView={currentView}
                      currentPage={currentPage}
                      updateCurrentView={updateCurrentView}
                      updateCurrentPage={updateCurrentPage}
                    />
                  </form>

                  {userSettings.showPreview && (
                    <>
                      {currentView === "page" ? (
                        <>
                          <GeneratedPage
                            schema={eval(`values.${currentPage}`)}
                          />
                        </>
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
                      Draft section saved at {lastSave}
                      {" | "}
                      <a
                        href={`https://github.com/SkillsFundingAgency/das-qna-api/blob/${branch}/src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`}
                      >
                        View original on GitHub
                      </a>
                      {" | "}
                      <a
                        href="#"
                        onClick={event =>
                          window.confirm(
                            "Are you sure you want to revert this page to the GitHub version? You will lose your draft for this section."
                          ) && deleteDraft(event)
                        }
                      >
                        Revert to original version
                      </a>
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
  const initialSectionData = branch === "custom" ? EMPTY_SECTION : null;

  const cookies = parseCookies(context.req);
  return {
    branch,
    projectId,
    sectionId,
    initialSectionData,
    initialUserSettings: cookies.userSettings,
    initialPageSettings: cookies.pageSettings
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

const BugIcon = styled(DisplayControlIcon)``;

const BreadcrumbLink = styled.a`
  text-decoration: underline;
`;

const AngleIcon = styled(FontAwesomeIcon)`
  margin: 0 5px;
`;
