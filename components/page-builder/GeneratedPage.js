import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import {
  asPaginationItem,
  BackLink,
  Breadcrumb,
  Button,
  Checkbox,
  Details as GovDetails,
  DateInput,
  FormGroup,
  FileUpload,
  GridCol,
  GridRow,
  H1,
  Header,
  InputField,
  Layout,
  Link,
  ListItem,
  ListNavigation,
  Main,
  MultiChoice,
  Pagination,
  PhaseBanner,
  Radio,
  SearchBox,
  Select,
  TextArea,
  UnorderedList
} from "govuk-react";

import { QuestionComponents } from "./generated/QuestionComponents";
import { ColumnTitle } from "../../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  console.table(values);

  await sleep(300);
  // window.alert(JSON.stringify(values, 0, 2));
};

const GeneratedPage = ({ schema }) => {
  const { Title, BodyText, Questions, Details, AllowMultipleAnswers } = schema;

  const [isSingleQuestion, setIsSingleQuestion] = useState(false);

  const handleError = questionType => {
    console.warn(
      `${questionType} is an unknown question type. Please select an existing one.`
    );
  };

  useEffect(() => {
    setIsSingleQuestion(Questions.length === 1);
  }, [Questions]);

  // const reset = event => event.preventDefault();
  return (
    <div>
      <ColumnTitle>
        <FontAwesomeIcon icon={faFileAlt} width="0" /> Preview
      </ColumnTitle>
      <Link noVisitedState href="#" style={{ marginBottom: "10px" }}>
        {Title}
      </Link>
      <PreviewContainer>
        <GridRow>
          <GridCol>{!isSingleQuestion && <H1>{Title}</H1>}</GridCol>
        </GridRow>
        <GridRow>
          <GridCol>{ReactHtmlParser(BodyText)}</GridCol>
        </GridRow>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              {Questions && (
                <>
                  {Questions.filter(
                    question => question.QuestionId && question.Input
                  ).map((question, index) => {
                    const questionTypeExists = QuestionComponents.hasOwnProperty(
                      question.Input.Type
                    );

                    const QuestionComponent = questionTypeExists
                      ? QuestionComponents[question.Input.Type]
                      : handleError(question.Input.Type);
                    return (
                      question.QuestionId && (
                        <div key={index}>
                          <GridRow>
                            <GridCol>
                              {isSingleQuestion && <H1>{question.Label}</H1>}
                            </GridCol>
                          </GridRow>
                          <GridRow>
                            <GridCol>
                              {ReactHtmlParser(question.QuestionBodyText)}
                            </GridCol>
                          </GridRow>
                          {questionTypeExists && (
                            <GridRow>
                              <GridCol>
                                <QuestionComponent
                                  key={index}
                                  questionIndex={index}
                                  question={question}
                                  isSingleQuestion={isSingleQuestion}
                                />
                              </GridCol>
                            </GridRow>
                          )}
                        </div>
                      )
                    );
                  })}
                  {AllowMultipleAnswers ? (
                    <GridRow mb={5}>
                      <GridCol>
                        <Link noVisitedState href="#">
                          Save and add another
                        </Link>
                      </GridCol>
                    </GridRow>
                  ) : null}
                  <GridRow>
                    <GridCol>
                      <Button type="submit" disabled={submitting || pristine}>
                        Save and continue
                      </Button>
                    </GridCol>
                  </GridRow>
                </>
              )}
            </form>
          )}
        />

        {Details && (
          <GridRow>
            <GridCol>
              <GovDetails summary={Details.Title}>{Details.Body}</GovDetails>
            </GridCol>
          </GridRow>
        )}
      </PreviewContainer>
    </div>
  );
};

export default GeneratedPage;

const PreviewContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 25px;
  margin-top: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;
