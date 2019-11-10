import Link from "next/link";
import { useRouter } from "next/router";
import { Field } from "react-final-form";
import styled from "styled-components";

import Textarea from "./../Textarea";
import Questions from "./Questions";
import Select from "../Select";
import QnaField from "./../QnaField";

const required = value => (value ? undefined : "required");

const SinglePageView = ({ currentPage, returnToSection }) => {
  // console.log(currentPage);

  return (
    <>
      {/* <Container> */}
      <Field name={`${currentPage}.PageId`}>
        {({ input: { name, value } }) => (
          <>
            <Button onClick={returnToSection}>Return to section</Button>
            <h2 name={currentPage}>Page {value}</h2>
          </>
        )}
      </Field>
      {/* <Row>
        <Field name={`${currentPage}.LinkTitle`} validate={required}>
          {({ input, meta }) => (
            <>
              <input
                {...input}
                type="text"
                placeholder={
                  meta.error && meta.touched
                    ? `Page link title is ${meta.error}`
                    : `Page link title`
                }
                style={{ width: "100%" }}
                component="input"
                className={meta.error && meta.touched ? meta.error : undefined}
              />
            </>
          )}
        </Field>
      </Row> */}
      <Row>
        <QnaField name={`${currentPage}.Title`} validate={required}>
          {({ input, meta }) => (
            <>
              <input
                {...input}
                type="text"
                placeholder={
                  meta.error && meta.touched
                    ? `Page title is ${meta.error}`
                    : `Page title (<h1> when more than one question)`
                }
                style={{ width: "100%" }}
                component="input"
                className={meta.error && meta.touched ? meta.error : undefined}
              />
            </>
          )}
        </QnaField>
      </Row>
      <Row>
        <QnaField
          name={`${currentPage}.BodyText`}
          component={Textarea}
          type="text"
          placeholder={`Body text (HTML)`}
          style={{ width: "100%" }}
          label="Body text"
        />
      </Row>
      <Row>
        <QnaField
          name={`${currentPage}.AllowMultipleAnswers`}
          component={MultipleAnswersSelect}
          options={[
            { label: "True", value: true },
            { label: "False", value: false }
          ]}
          label="Allow multiple answers"
        />
      </Row>
      <Questions name={currentPage} />
      {/* </Container> */}

      <h3>Details</h3>
      <Row>
        <QnaField
          name={`${currentPage}.Details.Title`}
          component={Textarea}
          type="text"
          placeholder={`Details title`}
          label="Details title"
        />
      </Row>
      <Row>
        <QnaField
          name={`${currentPage}.Details.Description`}
          component={Textarea}
          type="text"
          placeholder={`Details description`}
          label="Details title"
        />
      </Row>
      <Button onClick={returnToSection}>Return to section</Button>
    </>
  );
};

export default SinglePageView;

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

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
  padding: 0;
  text-align: left;
`;

const MultipleAnswersSelect = styled(Select)`
  width: 100%;
`;

const Button = styled.button`
  margin-top: 10px;
  background: #0b0c0c;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
