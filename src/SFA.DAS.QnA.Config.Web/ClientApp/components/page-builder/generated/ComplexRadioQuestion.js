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

import TextQuestion from "./../generated/TextQuestion";
import DateQuestion from "./../generated/DateQuestion";
import NumberQuestion from "./../generated/NumberQuestion";
import LongTextQuestion from "./../generated/LongTextQuestion";
import CheckboxQuestion from "./../generated/CheckboxQuestion";
import OptionGroupQuestion from "./../generated/OptionGroupQuestion";
import ComplexRadioQuestion from "./../generated/ComplexRadioQuestion";
import DropdownQuestion from "./../generated/DropdownQuestion";
import ChecklistQuestion from "./../generated/ChecklistQuestion";

const components = {
  text: TextQuestion,
  Date: DateQuestion,
  number: NumberQuestion,
  longText: LongTextQuestion,
  Textarea: LongTextQuestion,
  checkbox: CheckboxQuestion,
  optionGroup: OptionGroupQuestion,
  ComplexRadio: ComplexRadioQuestion,
  Radio: OptionGroupQuestion,
  checklist: ChecklistQuestion,
  dropdown: DropdownQuestion
};

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
                    // key={`${question.QuestionId}[${questionIndex}][${index}]`}
                    name={`${question.QuestionId}[${questionIndex}]`}
                    hint={ReactHtmlParser(option.Hint)}
                    component={GovRadio}
                    type="radio"
                    value={option.Value}
                    label={option.Label}
                  />
                  {option.FurtherQuestions
                    ? option.FurtherQuestions.map(furtherQuestion => {
                        // This is returning both questions.. we only want the one with a furtherQuestion
                        // console.log("furtherQuestion:", furtherQuestion);

                        const QuestionComponent =
                          components[furtherQuestion.Input.Type];
                        return (
                          furtherQuestion.QuestionId && (
                            <div style={{ marginBottom: "20px" }}>
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
