import { FormGroup, Checkbox } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const CheckboxQuestion = ({ question }) => {
  return (
    <>
      {question.Input.Type === "DataFed_CheckboxList" ? (
        <FormGroup>
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
        </FormGroup>
      ) : (
        <FormGroup>
          {question.Input.Options.map(option => {
            return (
              <Checkbox hint={ReactHtmlParser(option.HintText)}>
                {option.Label}
              </Checkbox>
            );
          })}
        </FormGroup>
      )}
    </>
  );
};

export default CheckboxQuestion;
