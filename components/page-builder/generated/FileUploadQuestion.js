import { Field } from "react-final-form";
import { FileUpload, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const FileUploadQuestion = ({ question, questionIndex }) => {
  return (
    <FormGroup>
      <Field
        name={`${question.QuestionId}[${questionIndex}]`}
        component={FileUpload}
        hint={ReactHtmlParser(question.Hint)}
      >
        {question.Label}
      </Field>
    </FormGroup>
  );
};

export default FileUploadQuestion;
