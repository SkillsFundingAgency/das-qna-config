import { Field } from "react-final-form";
import { InputField, FormGroup, H2, Paragraph } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const TextQuestion = ({ question, questionIndex }) => {
  return (
    <FormGroup>
      {question.Input.Type === "Address" ? (
        <>
          <H2>Address</H2>
          <Paragraph>**Start typing the address or postcode**</Paragraph>
        </>
      ) : null}
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

export default TextQuestion;
