import { Field } from "react-final-form";
import { InputField, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const TextQuestion = ({ question, questionIndex }) => {
  return (
    <FormGroup>
      <Field
        name={questionIndex}
        component={InputField}
        hint={ReactHtmlParser(question.Hint)}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};

export default TextQuestion;
