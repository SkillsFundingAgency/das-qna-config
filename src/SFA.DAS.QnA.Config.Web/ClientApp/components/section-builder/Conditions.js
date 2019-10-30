import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import Select from "../Select";

import { EMPTY_CONDITION } from "./../../data/data-structures";

const Conditions = ({ name, questions }) => {
  return (
    <FieldArray name={`${name}.Conditions`}>
      {({ fields }) => {
        return (
          <>
            {fields.map((name, index) => (
              <div key={index}>
                <Row>
                  <InnerText>when</InnerText>
                  <Field
                    name={`${name}.QuestionId`}
                    component={QuestionSelector}
                    options={questions}
                    isSearchable={true}
                  />
                  <InnerText>equals</InnerText>
                  <Field
                    name={`${name}.MustEqual`}
                    component="input"
                    type="text"
                    placeholder="Must equal"
                  />
                </Row>
                <Button type="button" onClick={() => fields.remove(index)}>
                  Remove condition
                </Button>
              </div>
            ))}

            {!fields.value.length && (
              <Buttons>
                <Button
                  type="button"
                  onClick={() => fields.push(EMPTY_CONDITION)}
                >
                  + Add a Condition
                </Button>
              </Buttons>
            )}
          </>
        );
      }}
    </FieldArray>
  );
};

export default Conditions;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 10px;

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 2px solid #ccc;
    border-radius: 3px;
    &[disabled] {
      background: #eee;
    }
  }

  .required {
    border: 2px solid #d60000;
  }

  & > input {
    margin: 0;
    padding: 9px;
  }

  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 0;
  }
`;

const QuestionSelector = styled(Select)`
  width: 100%;
`;

const InnerText = styled.p`
  line-height: 2.4em;
  margin: 0 5px;
`;

const Buttons = styled.div`
  padding: 0;
  text-align: left;
`;

const Button = styled.button`
  background: #0b0c0c;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;