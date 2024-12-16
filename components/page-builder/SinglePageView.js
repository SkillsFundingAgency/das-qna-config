import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Field } from "react-final-form";
import styled from "styled-components";

import QnaField from "@/components/QnaField";
import WhenFieldChanges from "@/components/WhenFieldChanges";
import Textarea from "@/components/Textarea";
import Questions from "./Questions";
import NamedSelect from "@/components/Select";

const required = value => (value ? undefined : "required");

const SinglePageView = ({ currentPage, returnToSection }) => {
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
        />
      </Row>

      <Row>
        {/* turn this into a single checkbox */}
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

      <Row>
        <QnaField
          name={`${currentPage}.InfoText`}
          component={Textarea}
          type="text"
          placeholder="Info text (HTML)"
          style={{ width: "100%" }}
        />
      </Row>

      <h3>Details</h3>

      <Row>
        <QnaField
          name={`${currentPage}.Details.Title`}
          component={Textarea}
          type="text"
          placeholder={`Details title`}
        />
        <WhenFieldChanges
          field={`${currentPage}.Details.Title`}
          becomes={[""]}
          set={`${currentPage}.Details`}
          to={null}
        />
      </Row>
      <Row>
        <QnaField
          name={`${currentPage}.Details.Body`}
          component={Textarea}
          type="text"
          placeholder={`Details body`}
        />
        <WhenFieldChanges
          field={`${currentPage}.Details.Body`}
          becomes={[""]}
          set={`${currentPage}.Details`}
          to={null}
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
`;

const Buttons = styled.div`
  padding: 0;
  text-align: left;
`;

const MultipleAnswersSelect = styled(NamedSelect)`
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
