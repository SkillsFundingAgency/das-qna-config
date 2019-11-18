import { useState } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "../Select";
import QnaField from "./../QnaField";
import WhenFieldChanges from "../WhenFieldChanges";

import { EMPTY_CONDITION } from "./../../data/data-structures";

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

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
              <Container key={index}>
                <h3 style={{ marginTop: "0" }}>if</h3>
                <PageControls>
                  <RemoveConditionButton
                    icon={faTrash}
                    onClick={() => fields.remove(index)}
                    width="0"
                  />
                </PageControls>
                <Row>
                  <QnaField
                    name="QuestionIdOrTag"
                    component={Select}
                    options={[
                      { value: "", label: "Select one..." },
                      { value: "QuestionId", label: "QuestionId" },
                      { value: "QuestionTag", label: "QuestionTag" }
                    ]}
                    isSearchable={false}
                  />
                </Row>
                <Row>
                  <Condition when="QuestionIdOrTag" is="QuestionId">
                    <QnaField
                      name={`${name}.QuestionId`}
                      component="input"
                      type="text"
                      placeholder="QuestionId"
                    />
                  </Condition>
                  <Condition when="QuestionIdOrTag" is="QuestionTag">
                    <QnaField
                      name={`${name}.QuestionTag`}
                      component="input"
                      type="text"
                      placeholder="QuestionTag"
                    />
                  </Condition>
                </Row>
                <Row>
                  <QnaField
                    name="ConditionType"
                    component={Select}
                    options={[
                      { value: "", label: "Select one..." },
                      { value: "MustEqual", label: "MustEqual" },
                      { value: "Contains", label: "Contains" }
                    ]}
                    isSearchable={false}
                  />
                </Row>
                <Row>
                  <Condition when="ConditionType" is="MustEqual">
                    <QnaField
                      name={`${name}.MustEqual`}
                      component="input"
                      type="text"
                      placeholder="Must equal"
                    />
                  </Condition>
                  <Condition when="ConditionType" is="Contains">
                    <QnaField
                      name={`${name}.Contains`}
                      component="input"
                      type="text"
                      placeholder="Contains"
                    />
                  </Condition>
                </Row>
              </Container>
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

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 36px;
  margin-bottom: 10px;
`;

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
  margin: 0 0 0 5px;
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

const PageControls = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0px;
  top: 0px;
  border-right: 2px solid #ccc;
  background: #f2f2f2;
`;

const RemoveConditionButton = styled(FontAwesomeIcon)`
  box-sizing: content-box;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  right: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  color: #800;
`;
