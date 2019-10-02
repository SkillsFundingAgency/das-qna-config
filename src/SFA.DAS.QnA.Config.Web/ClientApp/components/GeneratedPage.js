import { Form, Field } from "react-final-form";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import {
  asPaginationItem,
  BackLink,
  Breadcrumb,
  Button,
  Checkbox,
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

import TextQuestion from "./generated/TextQuestion";
import DateQuestion from "./generated/DateQuestion";
import NumberQuestion from "./generated/NumberQuestion";
import LongTextQuestion from "./generated/LongTextQuestion";
import CheckboxQuestion from "./generated/CheckboxQuestion";
import OptionGroupQuestion from "./generated/OptionGroupQuestion";
import ComplexRadioQuestion from "./generated/ComplexRadioQuestion";
import DropdownQuestion from "./generated/DropdownQuestion";
import ChecklistQuestion from "./generated/ChecklistQuestion";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  console.table(values);

  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const components = {
  text: TextQuestion,
  Date: DateQuestion,
  number: NumberQuestion,
  longText: LongTextQuestion,
  Textarea: LongTextQuestion,
  checkbox: CheckboxQuestion,
  optionGroup: OptionGroupQuestion,
  ComplexRadio: ComplexRadioQuestion,
  Radio: OptionGroupQuestion,
  checklist: ChecklistQuestion,
  dropdown: DropdownQuestion
};

const GeneratedPage = ({ schema }) => {
  // console.log(schema);

  const { LinkTitle, Title, BodyText, Questions } = schema;
  const reset = event => event.preventDefault();
  return (
    <Container>
      <GridRow>
        <GridCol>
          <Link noVisitedState href="#">
            {LinkTitle}
          </Link>
        </GridCol>
      </GridRow>
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
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <GridRow>
              <GridCol>
                {Questions &&
                  Questions.filter(
                    question => question.QuestionId && question.Input
                  ).map((question, index) => {
                    // console.log(question);

                    const QuestionComponent = components[question.Input.Type];
                    return (
                      question.QuestionId && (
                        <QuestionComponent
                          key={index}
                          questionIndex={index}
                          question={question}
                        />
                      )
                    );
                  })}
              </GridCol>
            </GridRow>
            <GridRow>
              <GridCol>
                <Button type="submit" disabled={submitting}>
                  Submit
                </Button>
              </GridCol>
            </GridRow>
            {/* <GridRow>
              <GridCol>
                <Button disabled={submitting || pristine}>Reset</Button>
              </GridCol>
            </GridRow> */}
            {/* <GridRow>
              <GridCol>
                <Dump>{JSON.stringify(values, 0, 2)}</Dump>
              </GridCol>
            </GridRow> */}
            {/* <Buttons>
                <Button
                  secondary
                  type="submit"
                  disabled={submitting || pristine}
                >
                Submit
                </Button>
                </Buttons>
              <Dump>{JSON.stringify(values, 0, 2)}</Dump> */}
          </form>
        )}
      />
    </Container>
  );
};

export default GeneratedPage;

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
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
