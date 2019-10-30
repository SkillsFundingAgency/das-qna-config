import React from "react";
import { Field } from "react-final-form";
import {
  MultiChoice,
  Radio,
  Paragraph,
  FormGroup,
  GridRow,
  GridCol
} from "govuk-react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

import { QuestionComponents } from "./../generated/QuestionComponents";

const GovRadio = ({ input, hint, inline, label }) => {
  return (
    <Radio {...input} hint={hint} inline={inline}>
      {label}
    </Radio>
  );
};

export default ({ question, questionIndex }) => {
  // console.log("input: ", input);
  // console.log("question: ", question);

  return (
    <FormGroup>
      {question.Input.Options && (
        <div>
          <MultiChoice
            label={question.Label}
            hint={ReactHtmlParser(question.Hint)}
          >
            {question.Input.Options.map((option, index) => {
              return (
                <div key={`${question.QuestionId}[${questionIndex}][${index}]`}>
                  <Field
                    name={`${question.QuestionId}[${questionIndex}]`}
                    hint={ReactHtmlParser(option.Hint)}
                    component={GovRadio}
                    type="radio"
                    value={option.Value}
                    label={option.Label}
                  />
                  {option.FurtherQuestions
                    ? option.FurtherQuestions.map((furtherQuestion, index) => {
                        const QuestionComponent =
                          QuestionComponents[furtherQuestion.Input.Type];
                        return (
                          furtherQuestion.QuestionId && (
                            <div key={index} style={{ marginBottom: "20px" }}>
                              <GridRow>
                                <GridCol>
                                  <QuestionComponent
                                    key={index}
                                    questionIndex={index}
                                    question={furtherQuestion}
                                  />
                                </GridCol>
                              </GridRow>
                            </div>
                          )
                        );
                      })
                    : null}
                </div>
              );
            })}
          </MultiChoice>
        </div>
      )}
    </FormGroup>
  );
};
