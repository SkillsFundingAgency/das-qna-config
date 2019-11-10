import { Field } from "react-final-form";
import styled from "styled-components";
import Select from "../../Select";

const DropdownQuestion = ({ question }) => (
  <Row>
    <label>{question.text}</label>
    <Field
      name={question.key}
      component={Selector}
      options={
        question.answers
          ? question.answers.map(answer => ({
              value: answer.value,
              label: answer.text
            }))
          : []
      }
      isSearchable={false}
    />
  </Row>
);

export default DropdownQuestion;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }

  & > label {
    width: 150px;
    margin-right: 15px;
  }
`;

const Selector = styled(Select)`
  flex: 1;
`;
