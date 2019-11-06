import { Field } from "react-final-form";
import { DateField, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const DateQuestion = ({ question, questionIndex }) => {
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

export default DateQuestion;
