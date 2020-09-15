import { FormGroup, MultiChoice, Radio } from "govuk-react";
import ReactHtmlParser from "react-html-parser";

const DataFedRadioQuestion = ({ question }) => {
    return (
        <FormGroup>
            <MultiChoice hint={ReactHtmlParser(question.Hint)}>
                <Radio name="datafed-radio-questions" hint={`Options will be populated by ${question.Input.DataEndpoint}`}>
                    Data-fed option placeholder
                </Radio>
                <Radio name="datafed-radio-questions" hint={`Options will be populated by ${question.Input.DataEndpoint}`}>
                    Data-fed option placeholder
                </Radio>
            </MultiChoice>
        </FormGroup>
    );
};

export default DataFedRadioQuestion;
