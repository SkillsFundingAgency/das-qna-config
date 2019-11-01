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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  console.table(values);

  await sleep(300);
  // window.alert(JSON.stringify(values, 0, 2));
};

const GeneratedPage = ({ schema }) => {
  const { Title, BodyText, Questions, Details, AllowMultipleAnswers } = schema;
  // const reset = event => event.preventDefault();
  return (
    <>
      <Link noVisitedState href="#" style={{ marginBottom: "10px" }}>
        {Title}
      </Link>
      <Container>
        <GridRow>
          <GridCol>
            <H1>{Title}</H1>
          </GridCol>
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
                    // console.log(question);

                    const QuestionComponent =
                      QuestionComponents[question.Input.Type];
                    return (
                      question.QuestionId && (
                        <div key={index}>
                          <GridRow>
                            <GridCol>
                              {ReactHtmlParser(question.QuestionBodyText)}
                            </GridCol>
                          </GridRow>
                          <GridRow>
                            <GridCol>
                              <QuestionComponent
                                key={index}
                                questionIndex={index}
                                question={question}
                              />
                            </GridCol>
                          </GridRow>
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
              {/* <GridRow>
                <GridCol>
                  <Button
                    secondary
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </GridCol>
              </GridRow> */}
              {/* <GridRow>
              <GridCol>
                <Dump>{JSON.stringify(values, 0, 2)}</Dump>
              </GridCol>
            </GridRow> */}
            </form>
          )}
        />

        {Details && (
          <GridRow>
            <GridCol>
              <GovDetails summary={Details.Title}>
                {Details.Description}
              </GovDetails>
            </GridCol>
          </GridRow>
        )}
      </Container>
    </>
  );
};

export default GeneratedPage;

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 25px;
  margin-top: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const StyledQuestions = styled.div`
  display: flex;
  flex-flow: column nowrap;
  & > * {
    margin: 3px 2px;
    border-top: 1px solid #eee;
    padding: 5px;
    &:last-of-type {
      border-bottom: 1px solid #eee;
    }
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
