import { Field } from "react-final-form";
import styled from "styled-components";
import NamedSelect from "../../Select";

const SelectQuestion = ({ question }) => (
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

export default SelectQuestion;

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

const Selector = styled(NamedSelect)`
  flex: 1;
`;
