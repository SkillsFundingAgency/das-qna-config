import React from "react";
import { Field } from "react-final-form";
import { TextArea, FormGroup, HintText } from "govuk-react";

export default ({ question, questionIndex }) => {
  // console.log(question);

  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={TextArea}
        hint={question.Hint}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};
