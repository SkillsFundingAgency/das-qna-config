import { Field } from "react-final-form";
import { DateField, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const DateQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
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
        {!isSingleQuestion ? question.Label : null}
      </Field>
    </FormGroup>
  );
};

export default DateQuestion;
