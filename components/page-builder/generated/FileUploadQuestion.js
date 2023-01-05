import { Field } from "react-final-form";
import { FileUpload, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const FileUploadQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  return (
    <FormGroup>
      <Field
        name={`Upload${question.QuestionId}[${questionIndex}]`}
        component={FileUpload}
        hint={ReactHtmlParser(question.Hint)}
      >
        {!isSingleQuestion ? question.Label : null}
      </Field>
    </FormGroup>
  );
};

export default FileUploadQuestion;
