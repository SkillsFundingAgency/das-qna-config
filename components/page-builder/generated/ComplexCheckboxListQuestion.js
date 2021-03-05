import { Field } from "react-final-form";
import {
  MultiChoice,
  Checkbox,
  FormGroup,
  GridRow,
  GridCol
} from "govuk-react";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
// import PropTypes from "prop-types";

import { QuestionComponents } from "./QuestionComponents";

const GovCheckbox = ({ input, hint, inline, label }) => {
  return (
    <Checkbox {...input} hint={hint} inline={inline}>
      {label}
    </Checkbox>
  );
};

const ComplexCheckboxListQuestion = ({
  question,
  questionIndex,
  isSingleQuestion
}) => {
  return (
    <FormGroup>
      {question.Input.Options && (
        <div>
          <MultiChoice
            label={!isSingleQuestion ? question.Label : null}
            hint={ReactHtmlParser(question.Hint)}
          >
            {question.Input.Options.map((option, index) => {
              return (
                <div key={`Checkbox${question.QuestionId}[${questionIndex}][${index}]`}>
                  <Field
                    name={`Checkbox${question.QuestionId}[${questionIndex}][${index}]`}
                    hint={ReactHtmlParser(option.HintText)}
                    component={GovCheckbox}
                    type="checkbox"
                    label={option.Label}
                  />
                  {option.FurtherQuestions
                    ? option.FurtherQuestions.map((furtherQuestion, index) => {
                        const QuestionComponent =
                          QuestionComponents[furtherQuestion.Input.Type];
                        return (
                          furtherQuestion.QuestionId && (
                            <div
                              key={index}
                              style={{
                                marginBottom: "15px",
                                marginLeft: "18px",
                                paddingLeft: "33px",
                                borderLeft: "4px solid #b1b4b6"
                              }}
                            >
                              <GridRow>
                                <GridCol>
                                  <QuestionComponent
                                    key={index}
                                    questionIndex={index}
                                    question={furtherQuestion}
                                    style={{
                                      paddingLeft: "10px",
                                      borderLeft: "3px solid #ccc"
                                    }}
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

export default ComplexCheckboxListQuestion;
