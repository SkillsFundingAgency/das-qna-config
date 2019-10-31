import React from "react";
import { FormGroup, Checkbox } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

// import CheckboxGroup from "./../govuk-components/CheckboxGroup";

const CheckboxQuestion = ({ question }) => {
  // console.log(question);

  return (
    <FormGroup>
      {question.Input.Options.map(option => {
        return (
          <Checkbox hint={ReactHtmlParser(option.HintText)}>
            {option.Label}
          </Checkbox>
        );
      })}
    </FormGroup>
  );
};

export default CheckboxQuestion;
