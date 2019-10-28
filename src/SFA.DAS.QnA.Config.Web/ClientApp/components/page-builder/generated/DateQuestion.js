import React from "react";
import { Field } from "react-final-form";
import { DateField, InputField, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

export default ({ question, questionIndex }) => {
  // console.log("question:", question);

  return (
    <FormGroup>
      <Field
        component={DateField}
        hintText={ReactHtmlParser(question.Hint)}
        defaultValues={{
          day: "",
          month: "",
          year: ""
        }}
        inputNames={{
          day: `${question.QuestionId}[Day]`,
          month: `${question.QuestionId}[Month]`,
          year: `${question.QuestionId}[Year]`
        }}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};
