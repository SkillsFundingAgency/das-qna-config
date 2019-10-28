import React from "react";
import { Field } from "react-final-form";
import { TextArea, FormGroup, HintText } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

export default ({ question, questionIndex }) => {
  // console.log(question);

  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={TextArea}
        hint={ReactHtmlParser(question.Hint)}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};
