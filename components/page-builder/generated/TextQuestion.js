import { Field } from "react-final-form";
import { Label, HintText, Input, FormGroup, H2, Paragraph } from "govuk-react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const LabelSwitcher = ({ label, inputType }) => (
  <>
    {inputType === "Address" ? (
      <>
        <H2 margin={{ size: 0, direction: "bottom" }}>{label}</H2>
        <Paragraph mb="0">**Start typing the address or postcode**</Paragraph>
      </>
    ) : (
      <Label>{label}</Label>
    )}
  </>
);

const TextQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  const GovukInput = styled(Input)`
    max-width: ${question.Input.InputPrefix || question.Input.InputSuffix
      ? "calc(100% - 8em)"
      : "100%"};

    &.govuk-input--width-30 {
      max-width: calc(56ex + 3ex);
    }

    &.govuk-input--width-20 {
      max-width: calc(38ex + 3ex);
    }

    &.govuk-input--width-10 {
      max-width: calc(20ex + 3ex);
    }

    &.govuk-input--width-5 {
      max-width: 10.8ex;
    }

    &.govuk-input--width-4 {
      max-width: 9ex;
    }

    &.govuk-input--width-3 {
      max-width: 7.2ex;
    }

    &.govuk-input--width-2 {
      max-width: 5.4ex;
    }

    &.govuk-\\0021-width-full {
      width: 100%;
    }

    &.govuk-\\0021-width-three-quarters {
      width: 75%;
    }

    &.govuk-\\0021-width-two-thirds {
      width: 66.66%;
    }

    &.govuk-\\0021-width-one-half {
      width: 50%;
    }

    &.govuk-\\0021-width-one-third {
      width: 33.33%;
    }

    &.govuk-\\0021-width-one-quarter {
      width: 25%;
    }
  `;

  return (
    <FormGroup>
      <Field name={`${question.QuestionId}[${questionIndex}]`}>
        {({ input, meta }) => (
          <>
            {!isSingleQuestion && (
              <LabelSwitcher
                label={question.Label}
                inputType={question.Input.Type}
              />
            )}
            <HintText>{ReactHtmlParser(question.Hint)}</HintText>
            <Prefix>{question.Input.InputPrefix}</Prefix>
            <GovukInput {...input} className={question.Input.InputClasses} />
            <Suffix>{question.Input.InputSuffix}</Suffix>
          </>
        )}
      </Field>
    </FormGroup>
  );
};

const Prefix = styled.span`
  font-size: 19px;
  margin-right: 0.5em;
`;
const Suffix = styled.span`
  font-size: 19px;
  margin-left: 0.5em;
`;

export default TextQuestion;
