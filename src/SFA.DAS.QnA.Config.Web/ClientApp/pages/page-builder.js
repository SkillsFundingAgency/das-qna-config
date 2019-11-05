import cookie from "cookie";
import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import Cookies from "js-cookie";
import saveAs from "file-saver";

import styled from "styled-components";
import GlobalStyles from "../styles/global";

import AutoSave from "../components/AutoSave";

import Questions from "../components/page-builder/Questions";
import GeneratedPage from "../components/page-builder/GeneratedPage";
import Textarea from "../components/Textarea";
import FileManager from "../components/FileManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFolderOpen,
  faFolder,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";

import { EMPTY_PAGE } from "../data/data-structures";

const required = value => (value ? undefined : "required");

const parseCookies = req =>
  cookie.parse(req ? req.headers.cookie || "" : document.cookie);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async values => {
  setCookie(values);
  await sleep(2000);
};

const setCookie = values => Cookies.set("pageData", values);

const Index = ({ initialPageData, initialUserSettings }) => {
  // console.log("initialPageData:", initialPageData);

  const [userSettings, setUserSettings] = useState(
    initialUserSettings
      ? JSON.parse(initialUserSettings)
      : {
          showPreview: true,
          showSchema: false,
          showFileManager: false
        }
  );

  const [pageData, setpageData] = useState(
    initialPageData ? JSON.parse(initialPageData) : {}
  );
  // console.log("pageData:", pageData);

  const updatePageBuilder = fileContents => {
    setpageData(JSON.parse(fileContents));
  };

  const updateUserSettings = setting => {
    setUserSettings(prevState => {
      return {
        ...prevState,
        [setting]: !userSettings[setting]
      };
    });
  };

  useEffect(() => {
    Cookies.set("userSettings", userSettings);
  }, [userSettings]);

  const saveCurrentPage = (fileName, jsonContents) => {
    var file = new File([JSON.stringify(jsonContents)], fileName, {
      type: "application/json;charset=utf-8"
    });
    saveAs(file);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config | Page builder</Header>
        <DisplayControls>
          <TogglePreView
            icon={faFileAlt}
            onClick={() => updateUserSettings("showPreview")}
            width="0"
          />
          <ToggleFileView
            icon={userSettings.showFileManager ? faFolderOpen : faFolder}
            onClick={() => updateUserSettings("showFileManager")}
            width="0"
          />
          <ToggleCodeView
            icon={faCode}
            onClick={() => updateUserSettings("showSchema")}
            width="0"
          />
        </DisplayControls>
        <Form
          onSubmit={save}
          // initialValues={{
          //   // This is just for one page
          //   PageId: "2",
          //   Title: "Name to use on the register",
          //   LinkTitle: "Name to use on the register",
          //   InfoText: "",
          //   Next: [
          //     {
          //       Action: "NextPage",
          //       ReturnId: "3",
          //       ConditionMet: false
          //     }
          //   ],
          //   AllowMultipleAnswers: false,
          //   BodyText: "",
          //   Questions: [
          //     {
          //       QuestionId: "CD-02",
          //       QuestionTag: "contact-name",
          //       Label: "Full name",
          //       ShortLabel: "",
          //       QuestionBodyText: "",
          //       Hint: "",
          //       Input: {
          //         Type: "text",
          //         Validations: [
          //           {
          //             Name: "Required",
          //             ErrorMessage: "Enter name"
          //           }
          //         ]
          //       }
          //     },
          //     {
          //       QuestionId: "CD-01",
          //       QuestionTag: "use-trading-name",
          //       Label: "Do you want to use your trading name on the register?",
          //       ShortLabel: "",
          //       QuestionBodyText: "",
          //       Hint: "",
          //       Input: {
          //         Type: "Radio",
          //         Options: [
          //           {
          //             Value: "Yes",
          //             Label: "Yes"
          //           },
          //           {
          //             Value: "No",
          //             Label: "No"
          //           }
          //         ],
          //         Validations: [
          //           {
          //             Name: "Required",
          //             ErrorMessage:
          //               "Select yes if you want to use your trading name on the register"
          //           }
          //         ]
          //       }
          //     },
          //     {
          //       QuestionId: "CD-14",
          //       Label: "Provide details of other positions or directorships ",
          //       ShortLabel: "",
          //       QuestionBodyText: "",
          //       Hint: "",
          //       Input: {
          //         Type: "Textarea",
          //         Validations: [
          //           {
          //             Name: "Required",
          //             ErrorMessage: "Enter other organisation details"
          //           }
          //         ]
          //       }
          //     },
          //     {
          //       QuestionId: "CD-20",
          //       Label: "Date of birth",
          //       ShortLabel: "",
          //       QuestionBodyText: "",
          //       Hint: "",
          //       Input: {
          //         Type: "Date",
          //         Validations: [
          //           {
          //             Name: "Required",
          //             ErrorMessage: "Enter a date"
          //           },
          //           {
          //             Name: "Date",
          //             Value: "",
          //             ErrorMessage: "Date must be correct"
          //           },
          //           {
          //             Name: "DateNotInFuture",
          //             Value: "",
          //             ErrorMessage: "Date cannot be in the future"
          //           }
          //         ]
          //       }
          //     },
          //     {
          //       QuestionId: "CD-21",
          //       Label: "How many shares does the director hold?",
          //       ShortLabel: "",
          //       QuestionBodyText: "",
          //       Hint: "",
          //       Input: {
          //         Type: "number",
          //         InputClasses: "govuk-input--width-5",
          //         Validations: [
          //           {
          //             Name: "Required",
          //             ErrorMessage: "Enter number of shares"
          //           }
          //         ]
          //       }
          //     },
          //     {
          //       QuestionId: "CD-12",
          //       QuestionTag: "company-ukprn",
          //       Label: "Do you have a UK provider registration number (UKPRN)?",
          //       ShortLabel: "",
          //       QuestionBodyText: "",
          //       Hint: "",
          //       Input: {
          //         Type: "ComplexRadio",
          //         Options: [
          //           {
          //             FurtherQuestions: [
          //               {
          //                 QuestionId: "CD-12.1",
          //                 Label: "Provide your UKPRN",
          //                 ShortLabel: "",
          //                 QuestionBodyText: "",
          //                 Hint: "",
          //                 Input: {
          //                   Type: "number",
          //                   InputClasses: "govuk-input--width-10",
          //                   Validations: [
          //                     {
          //                       Name: "Required",
          //                       ErrorMessage: "Enter your UKPRN"
          //                     },
          //                     {
          //                       Name: "Regex",
          //                       Value: "^[0-9]{8}$",
          //                       ErrorMessage:
          //                         "Enter your UKPRN (must be 8 digits)"
          //                     }
          //                   ]
          //                 }
          //               }
          //             ],
          //             Value: "Yes",
          //             Label: "Yes"
          //           },
          //           {
          //             Value: "No",
          //             Label: "No"
          //           }
          //         ],
          //         Validations: [
          //           {
          //             Name: "Required",
          //             ErrorMessage: "Select yes if you have a UKPRN"
          //           }
          //         ]
          //       }
          //     }
          //   ],
          //   // questions: [
          //   //   {
          //   //     type: "text",
          //   //     key: "givenName",
          //   //     text: "Given name",
          //   //     hint: "Tell us your given name",
          //   //     placeholder: "Given name"
          //   //   },
          //   //   {
          //   //     type: "longText",
          //   //     key: "longTextQuestion",
          //   //     text: "Long answer question",
          //   //     placeholder: "Type your long answer here"
          //   //   },
          //   //   {
          //   //     type: "checkbox",
          //   //     key: "employed",
          //   //     text: "Employed?"
          //   //   },
          //   //   {
          //   //     type: "optionGroup",
          //   //     key: "standardAppliedFor",
          //   //     text: "Standard applied for?",
          //   //     answers: [
          //   //       {
          //   //         text: "Carpentry",
          //   //         value: "Carpentry"
          //   //       },
          //   //       {
          //   //         text: "Plumbing",
          //   //         value: "Plumbing"
          //   //       },
          //   //       {
          //   //         text: "Accountancy",
          //   //         value: "Accountancy"
          //   //       }
          //   //     ]
          //   //   }
          //   // {
          //   //   QuestionId: "CD-01",
          //   //   QuestionTag: "use-trading-name",
          //   //   Label: "Do you want to use your trading name on the register?",
          //   //   ShortLabel: "",
          //   //   QuestionBodyText: "",
          //   //   Hint: "",
          //   //   Input: {
          //   //     Type: "Radio",
          //   //     Options: [
          //   //       {
          //   //         Value: "Yes",
          //   //         Label: "Yes"
          //   //       },
          //   //       {
          //   //         Value: "No",
          //   //         Label: "No"
          //   //       }
          //   //     ],
          //   //     Validations: [
          //   //       {
          //   //         Name: "Required",
          //   //         ErrorMessage:
          //   //           "Select yes if you want to use your trading name on the register"
          //   //       }
          //   //     ]
          //   //   }
          //   // },
          //   // {
          //   //   QuestionId: "CD-02",
          //   //   QuestionTag: "contact-name",
          //   //   Label: "Full name",
          //   //   ShortLabel: "",
          //   //   QuestionBodyText: "",
          //   //   Hint: "",
          //   //   Input: {
          //   //     Type: "text",
          //   //     Validations: [
          //   //       {
          //   //         Name: "Required",
          //   //         ErrorMessage: "Enter name"
          //   //       }
          //   //     ]
          //   //   }
          //   // }
          //   // ],
          //   SequenceId: "c1a3c474-4bb0-4c0d-0b62-08d6f96ce085",
          //   SectionId: "713a23fa-3a1f-4bdc-852e-08d6f96ce0ce",
          //   PageOfAnswers: [],
          //   Complete: false,
          //   Active: false,
          //   NotRequiredOrgTypes: [],
          //   NotRequired: false
          // }}
          initialValues={pageData}
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
                <form>
                  <h3>Page {values.PageId}</h3>
                  <Row>
                    <Field name="LinkTitle" validate={required}>
                      {({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            type="text"
                            placeholder={
                              meta.error && meta.touched
                                ? `Link title is ${meta.error}`
                                : `Link title`
                            }
                            style={{ width: "100%" }}
                            component="input"
                            className={
                              meta.error && meta.touched
                                ? meta.error
                                : undefined
                            }
                          />
                        </>
                      )}
                    </Field>
                  </Row>
                  <Row>
                    <Field name="Title" validate={required}>
                      {({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            type="text"
                            placeholder={
                              meta.error && meta.touched
                                ? `Page title is ${meta.error}`
                                : `Page title`
                            }
                            style={{ width: "100%" }}
                            component="input"
                            className={
                              meta.error && meta.touched
                                ? meta.error
                                : undefined
                            }
                          />
                        </>
                      )}
                    </Field>
                  </Row>
                  <Row>
                    <Field
                      name="BodyText"
                      component={Textarea}
                      type="text"
                      placeholder={`<p class='govuk-body'>
  Body text (HTML)
</p>`}
                      style={{ width: "100%" }}
                      label="Body text"
                    />
                  </Row>
                  <Questions />
                </form>
                {userSettings.showPreview && (
                  <div>
                    <h3>
                      <FontAwesomeIcon icon={faFileAlt} width="0" /> Preview
                    </h3>
                    <GeneratedPage schema={values} />
                  </div>
                )}
                {userSettings.showFileManager && (
                  <div>
                    <h3>
                      <FontAwesomeIcon icon={faFolderOpen} width="0" /> File
                      manager
                    </h3>
                    <FileManager
                      updatePageBuilder={updatePageBuilder}
                      savePageToFile={filename =>
                        saveCurrentPage(filename, values)
                      }
                    />
                  </div>
                )}
                {userSettings.showSchema && (
                  <div>
                    {/* <a onClick={() => saveCurrentPage("page-1.json", values)}>
                      Save page
                    </a> */}
                    <h3>
                      <FontAwesomeIcon icon={faCode} width="0" /> Generated JSON{" "}
                    </h3>
                    <Dump>{JSON.stringify(values, 0, 2)}</Dump>
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

Index.getInitialProps = async context => {
  const cookies = parseCookies(context.req);
  return {
    initialPageData: cookies.pageData,
    initialUserSettings: cookies.userSettings
  };
};

export default Index;

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

const DisplayControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  margin: 5px 15px;
`;

const Columns = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  padding-top: 50px;
  & > * {
    flex: 1;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    padding: 0 20px;
    overflow-y: auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 5px;

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
`;

const Buttons = styled.div`
  padding: 10px;
  text-align: center;
`;

const TogglePreView = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-right: 10px;
`;

const ToggleFileView = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-right: 10px;
`;

const ToggleCodeView = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;
