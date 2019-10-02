import React from "react";
import { Field } from "react-final-form";
import { FormGroup } from "govuk-react";
import styled from "styled-components";

import CheckboxGroup from "../../components/govuk-components/CheckboxGroup";

export default ({ question }) => (
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
