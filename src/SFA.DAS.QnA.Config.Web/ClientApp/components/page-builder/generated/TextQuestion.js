import { Field } from "react-final-form";
import { InputField, FormGroup, H2, Paragraph } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const TextQuestion = ({ question, questionIndex }) => {
  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={InputField}
        hint={ReactHtmlParser(question.Hint)}
      >
        {question.Input.Type === "Address" ? (
          <>
            <H2 margin={{ size: 0, direction: "bottom" }}>{question.Label}</H2>
            <Paragraph mb="0">
              **Start typing the address or postcode**
            </Paragraph>
          </>
        ) : (
          <span>{question.Label}</span>
        )}
      </Field>
    </FormGroup>
  );
};

export default TextQuestion;
