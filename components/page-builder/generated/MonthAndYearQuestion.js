import { Field } from "react-final-form";
import {
  Label,
  LabelText,
  StyledInput,
  Input,
  InputField,
  DateField,
  HintText,
  FormGroup
} from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const DateQuestion = ({ question, questionIndex, isSingleQuestion }) => {
  return (
    <FormGroup>
      {!isSingleQuestion ? (
        <Label>
          <LabelText>{question.Label}</LabelText>
        </Label>
      ) : null}
      <HintText>{ReactHtmlParser(question.Hint)}</HintText>
      <div style={{ display: "flex" }}>
        <Label style={{ width: "50px", marginRight: "20px" }}>
          <LabelText>Month</LabelText>
          <Input
            name={`MonthYear${question.QuestionId}[Month]`}
            type="number"
            defaultValue=""
            value=""
          />
        </Label>
        <Label style={{ width: "70px" }}>
          <LabelText>Year</LabelText>
          <Input
            name={`MonthYear${question.QuestionId}[Year]`}
            type="number"
            defaultValue=""
            value=""
          />
        </Label>
      </div>
    </FormGroup>
  );
};

export default DateQuestion;
