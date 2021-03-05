import { Field } from "react-final-form";
import {
  MultiChoice,
  Radio,
  FormGroup,
  GridRow,
  GridCol,
  Paragraph
} from "govuk-react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

const GovRadio = ({ input, hint, inline, label }) => {
  return (
    <Radio {...input} hint={hint} inline={inline}>
      {label}
    </Radio>
  );
};

const RadioQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  const containsConditionalContentText = !!question.Input.Options.filter(
    option => option.ConditionalContentText
  ).length;

  return (
    <FormGroup>
      {question.Input.Options && (
        <div>
          <MultiChoice
            label={!isSingleQuestion ? question.Label : null}
            hint={question.Hint}
          >
            {question.Input.Options.map((option, index) => {
              return (
                <div key={index}>
                  <Field
                    key={`Radio${question.QuestionId}[${questionIndex}][${index}]`}
                    name={`Radio${question.QuestionId}[${questionIndex}]`}
                    type="radio"
                    component={GovRadio}
                    hint={ReactHtmlParser(option.HintText)}
                    inline={
                      question.Input.Options.length <= 2 &&
                      !containsConditionalContentText
                    }
                    label={option.Label}
                    value={option.Value}
                  />
                  {option.ConditionalContentText && (
                    <div
                      style={{
                        marginBottom: "15px",
                        marginLeft: "18px",
                        paddingLeft: "33px",
                        borderLeft: "4px solid #b1b4b6"
                      }}
                    >
                      <GridRow>
                        <GridCol>
                          <Paragraph>{option.ConditionalContentText}</Paragraph>
                        </GridCol>
                      </GridRow>
                    </div>
                  )}
                </div>
              );
            })}
          </MultiChoice>
        </div>
      )}
    </FormGroup>
  );
};

export default RadioQuestion;
