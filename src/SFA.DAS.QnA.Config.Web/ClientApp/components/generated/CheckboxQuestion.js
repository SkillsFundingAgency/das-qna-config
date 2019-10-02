import React from "react";
import { FormGroup } from "govuk-react";

import CheckboxGroup from "../../components/govuk-components/CheckboxGroup";

const CheckboxQuestion = ({ question }) => (
  <FormGroup>
    <CheckboxGroup
      name={question.key}
      options={[{ title: question.text, value: question.text }]}
      hint={question.hint}
    />
  </FormGroup>
);

export default CheckboxQuestion;
