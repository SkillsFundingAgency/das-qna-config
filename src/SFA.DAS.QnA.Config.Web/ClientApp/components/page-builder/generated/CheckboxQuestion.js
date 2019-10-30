import React from "react";
import { FormGroup, Checkbox } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

// import CheckboxGroup from "./../govuk-components/CheckboxGroup";

const CheckboxQuestion = ({ question }) => (
  <FormGroup>
    <Checkbox hint={ReactHtmlParser(question.hint)}>{question.text}</Checkbox>
    {/* <CheckboxGroup
      name={question.key}
      options={[{ title: question.text, value: question.text }]}
      hint={ReactHtmlParser(question.hint)}
    /> */}
  </FormGroup>
);

export default CheckboxQuestion;
