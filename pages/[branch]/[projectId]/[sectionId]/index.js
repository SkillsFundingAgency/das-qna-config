import { useState, useEffect } from "react";
import Router from "next/router";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
// import cookie from "cookie";
import Cookies from "js-cookie";
import saveAs from "file-saver";
import { format } from "date-fns";
import base64 from "base-64";
import nextCookie from "next-cookies";
import { withAuthSync } from "../../../../utils/auth";
import getHost from "../../../../utils/get-host";

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
import LoadingSpinner from "../../../../components/LoadingSpinner";
import {
  githubFetchFileContents,
  githubFetchFileSha,
  githubUpdateFile
} from "../../../../utils/github-api";

import Pages from "../../../../components/section-builder/Pages";
import { EMPTY_SECTION } from "../../../../data/data-structures";

// const parseCookies = req =>
//   cookie.parse(req ? req.headers.cookie || "" : document.cookie);

const required = value => (value ? undefined : "required");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Section = ({
  branch,
  projectId,
  sectionId,
  initialSectionData,
  initialUserSettings,
  initialLayoutSettings,
  ...rest
}) => {
  console.log(rest);

  const [sectionData, setSectionData] = useState(initialSectionData);
  const [usingLocalSave, setUsingLocalSave] = useState(false);
  const [lastSave, setLastSave] = useState("");
  const [saving, setSaving] = useState(false);

  const [showCommitInfo, setShowCommitInfo] = useState(null);
  // console.log(showCommitInfo);

  // const [currentView, setCurrentView] = useState(
  //   initialLayoutSettings ? JSON.parse(initialLayoutSettings).currentView : null
  // ); // or page
  // console.log("TCL: currentView", currentView);
  // const [currentPage, setCurrentPage] = useState(
  //   initialLayoutSettings ? JSON.parse(initialLayoutSettings).currentPage : null
  // );
  // console.log("TCL: currentPage", currentPage);

  const [currentView, setCurrentView] = useState("section"); // or page
  const [currentPage, setCurrentPage] = useState(0);

  const [userSettings, setUserSettings] = useState(
    initialUserSettings
      ? initialUserSettings
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
    Cookies.set("layoutSettings", { currentView, currentPage });
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
      // draft found in localStorage
      console.log("Loading draft...");
      setUsingLocalSave(true);
      setSectionData(JSON.parse(data).values);
      setLastSave(JSON.parse(data).timeOfSave);
    } else {
      if (branch === "custom" && projectId === "section") {
        // Create new section and return
        console.log("Creating section...");
        return;
      }

      console.log("Loading from GitHub...");
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

  const saveCurrentSectionToGithub = async (
    commit,
    branch,
    projectId,
    sectionId,
    values
  ) => {
    setSaving(true);
    const codeOwners = await githubFetchFileContents(
      "master",
      ".github/CODEOWNERS"
    );
    const codeOwnersArray = codeOwners.data.repository.object.text.match(
      /([@][\w_-]+)/g
    );
    console.log(commit.name, codeOwnersArray.includes);
    const shaJsonResponse = await githubFetchFileSha(
      branch,
      `src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`
    );
    const sha = await shaJsonResponse.data.repository.object.oid;
    // console.log("TCL: sha", sha);

    const valueString = JSON.stringify(values, 0, 4);
    const encodedValues = base64.encode(valueString);

    const updatedFileResults = await githubUpdateFile(
      `src/SFA.DAS.QnA.Database/projects/${projectId}/sections/${sectionId}.json`,
      branch,
      encodedValues,
      sha,
      commit
    );

    setSaving(false);
    setShowCommitInfo({ commit: updatedFileResults.commit });

    // https://github.com/SkillsFundingAgency/das-qna-api/compare/qna-config-file-update-tests?expand=1
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
            <Container>
              <Header>
                <Title>
                  QnA Config |{" "}
                  <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                  <AngleIcon icon={faAngleRight} width="0" />
                  {currentView === "section" ? "Section " : "Page "} editor
                </Title>
                <AutoSave
                  // After keyup how long to wait before storing in localStorage
                  debounce={3000}
                  save={() => save(branch, projectId, sectionId, values)}
                />
                <DisplayControls>
                  {saving ? <LoadingSpinner /> : null}
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
                        style={{ fontSize: "1.5em", pointerEvents: "none" }}
                      >
                        {numberOfErrors}
                      </span>
                    </span>
                  ) : (
                    <DisplayControlIcon
                      icon={faCheckCircle}
                      onClick={() => updateUserSettings("showErrors")}
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

              <IsJsonValid
                values={values}
                sendNumberOfErrorsToParent={numberOfErrorsFromChild}
                showErrors={userSettings.showErrors}
              />
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
                      saveSectionToGithub={commit =>
                        saveCurrentSectionToGithub(
                          commit,
                          branch,
                          projectId,
                          sectionId,
                          values
                        )
                      }
                      commitDetails={showCommitInfo}
                      branch={branch}
                      projectId={projectId}
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
                            "Are you sure you want to delete your changes and revert to the original version?"
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

  const { token, userSettings, layoutSettings } = nextCookie(context);
  const apiUrl = getHost(context.req) + "/api/restricted";

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/")
      : context.res.writeHead(302, { Location: "/" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token })
      }
    });

    if (response.ok) {
      return {
        branch,
        projectId,
        sectionId,
        initialSectionData,
        initialUserSettings: userSettings,
        initialLayoutSettings: layoutSettings
      };
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export default withAuthSync(Section);

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
