import { FormGroup, Checkbox, MultiChoice } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const CheckboxListQuestion = ({ question, isSingleQuestion }) => {
  return (
    <FormGroup>
      <MultiChoice
        label={!isSingleQuestion ? question.Label : null}
        hint={ReactHtmlParser(question.Hint)}
      >
        {question.Input.Type === "DataFed_CheckboxList" ? (
          <>
            <Checkbox
              hint={`Options will be populated by ${question.Input.DataEndpoint}`}
            >
              Data-fed option placeholder
            </Checkbox>
            <Checkbox
              hint={`Options will be populated by ${question.Input.DataEndpoint}`}
            >
              Data-fed option placeholder
            </Checkbox>
          </>
        ) : (
          <>
            {question.Input.Options.map((option, index) => {
              return (
                <Checkbox key={index} hint={ReactHtmlParser(option.HintText)}>
                  {option.Label}
                </Checkbox>
              );
            })}
          </>
        )}
      </MultiChoice>
    </FormGroup>
  );
};

export default CheckboxListQuestion;
