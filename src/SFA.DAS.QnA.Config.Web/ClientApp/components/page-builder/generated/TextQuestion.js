import React from "react";
import { Field } from "react-final-form";
import { InputField, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

export default ({ question, questionIndex }) => {
  // console.log("question:", question);

  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={InputField}
        hint={ReactHtmlParser(question.Hint)}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};
