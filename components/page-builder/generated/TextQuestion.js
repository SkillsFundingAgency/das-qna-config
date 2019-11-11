import { Field } from "react-final-form";
import { InputField, FormGroup, H2, Paragraph } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const Label = ({ label, inputType }) => (
  <>
    {inputType === "Address" ? (
      <>
        <H2 margin={{ size: 0, direction: "bottom" }}>{label}</H2>
        <Paragraph mb="0">**Start typing the address or postcode**</Paragraph>
      </>
    ) : (
      <span>{label}</span>
    )}
  </>
);

const TextQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  // console.log(question.Input.InputClasses);
  /* 
  TODO: Will need to extract input and label from this <Field /> component as on /[sectionId]/index.js
  <span>{question.Input.InputClasses}</span>
 */

  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={InputField}
        hint={ReactHtmlParser(question.Hint)}
      >
        {!isSingleQuestion && (
          <Label label={question.Label} inputType={question.Input.Type} />
        )}
      </Field>
    </FormGroup>
  );
};

export default TextQuestion;
