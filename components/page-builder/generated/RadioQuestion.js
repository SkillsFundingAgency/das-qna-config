import { Field } from "react-final-form";
import { MultiChoice, Radio, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

const GovRadio = ({ input, hint, inline, label }) => {
  return (
    <Radio {...input} hint={hint} inline={inline}>
      {label}
    </Radio>
  );
};

const RadioQuestion = ({ question, questionIndex }) => {
  return (
    <FormGroup>
      {question.Input.Options && (
        <div>
          <MultiChoice label={question.Label} hint={question.Hint}>
            {question.Input.Options.map((option, index) => {
              return (
                <Field
                  key={`${question.QuestionId}[${questionIndex}][${index}]`}
                  name={`${question.QuestionId}[${questionIndex}]`}
                  type="radio"
                  component={GovRadio}
                  hint={ReactHtmlParser(option.HintText)}
                  inline={question.Input.Options.length <= 2}
                  label={option.Label}
                  value={option.Value}
                />
              );
            })}
          </MultiChoice>
        </div>
      )}
    </FormGroup>
  );
};

export default RadioQuestion;
