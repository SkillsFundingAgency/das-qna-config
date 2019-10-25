import Link from "next/link";
import { useRouter } from "next/router";
import { Field } from "react-final-form";
import styled from "styled-components";

import Textarea from "./../Textarea";
import Questions from "./Questions";

const required = value => (value ? undefined : "required");

const SinglePageView = ({ currentPage }) => {
  return (
    <>
      <Container>
        <Field name={`${currentPage}.PageId`}>
          {({ input: { name, value } }) => (
            <>
              <h2 name={currentPage}>Page {value}</h2>
            </>
          )}
        </Field>
        <Row>
          <Field name={`${currentPage}.LinkTitle`} validate={required}>
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
                    meta.error && meta.touched ? meta.error : undefined
                  }
                />
              </>
            )}
          </Field>
        </Row>
        <Row>
          <Field name={`${currentPage}.Title`} validate={required}>
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
                    meta.error && meta.touched ? meta.error : undefined
                  }
                />
              </>
            )}
          </Field>
        </Row>
        <Row>
          <Field
            name={`${currentPage}.BodyText`}
            component={Textarea}
            type="text"
            placeholder={`Body text (HTML)`}
            style={{ width: "100%" }}
            label="Body text"
          />
        </Row>
        <Questions name={currentPage} />
      </Container>
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
