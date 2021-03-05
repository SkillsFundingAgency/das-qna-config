import { DateField, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const DateQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  return (
    <FormGroup>
      <DateField
        name={`Date${question.QuestionId}[${questionIndex}]`}
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
      </DateField>
    </FormGroup>
  );
};

export default DateQuestion;
