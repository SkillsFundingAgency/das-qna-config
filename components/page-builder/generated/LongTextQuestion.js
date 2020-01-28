import { Field } from "react-final-form";
import { TextArea, FormGroup, HintText } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const LongTextQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={TextArea}
        hint={ReactHtmlParser(question.Hint)}
      >
        {!isSingleQuestion ? question.Label : null}
      </Field>
    </FormGroup>
  );
};

export default LongTextQuestion;
