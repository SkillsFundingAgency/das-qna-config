import { useState } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import Select from "../Select";
import QnaField from "./../QnaField";

import { EMPTY_CONDITION } from "./../../data/data-structures";

const Conditions = ({ name, questions }) => {
  // const [conditionType, setConditionType] = useState("QuestionTag");

  // const handleTagConditionChange = event => {
  //   console.log(event);
  //   // setConditionType(event.target.value === "QuestionTag")
  // };

  return (
    <FieldArray name={`${name}.Conditions`}>
      {({ fields }) => {
        return (
          <>
            {fields.map((name, index) => (
              <div key={index}>
                {/* <Row>
                  <Field
                    name={`${name}.QuestionId`}
                    component={QuestionSelector}
                    options={questions}
                    isSearchable={true}
                  />
                </Row> */}
                {/* <Row>
                  <ConditionSelector
                    name="ConditionSelector"
                    options={[
                      { label: "QuestionTag", value: "QuestionTag" },
                      { label: "QuestionId", value: "QuestionId" }
                    ]}
                    onChange={handleTagConditionChange}
                    value={conditionType}
                  />
                </Row> */}
                <Row>
                  <InnerText>if</InnerText>
                  <QnaField
                    name={`${name}.QuestionId`}
                    component="input"
                    type="text"
                    placeholder="QuestionId"
                  />
                  <InnerText>or</InnerText>
                  <QnaField
                    name={`${name}.QuestionTag`}
                    component="input"
                    type="text"
                    placeholder="QuestionTag"
                  />
                  <InnerText>value</InnerText>
                  <QnaField
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

  &:last-child {
    margin-bottom: 0;
  }
`;

const ConditionSelector = styled(Select)`
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
