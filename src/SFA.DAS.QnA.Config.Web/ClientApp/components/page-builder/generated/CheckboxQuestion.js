import React from "react";
import { FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

import CheckboxGroup from "./../govuk-components/CheckboxGroup";

const CheckboxQuestion = ({ question }) => (
  <FormGroup>
    <CheckboxGroup
      name={question.key}
      options={[{ title: question.text, value: question.text }]}
      hint={ReactHtmlParser(question.hint)}
    />
  </FormGroup>
);

export default CheckboxQuestion;
