import { Field } from "react-final-form";
import { FormGroup } from "govuk-react";
// import CheckboxGroup from "./../govuk-components/CheckboxGroup";

const ChecklistQuestion = ({ question }) => (
  <FormGroup>
    <label>{question.text}</label>
    <div>
      {question.answers &&
        question.answers.map(
          (answer, index) =>
            answer.value &&
            answer.text && (
              <label key={index}>
                <Field
                  name={question.key}
                  value={answer.value}
                  component="input"
                  type="checkbox"
                  label=""
                />
                {answer.text}
              </label>
            )
        )}
    </div>
  </FormGroup>
);
export default ChecklistQuestion;
