import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { InputField, FormGroup } from "govuk-react";

export default ({ question, questionIndex }) => {
  // console.log("question:", question);

  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={InputField}
        hint={question.Hint}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};
