import { useState } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "../Select";
import QnaField from "../QnaField";
import WhenFieldChanges from "../WhenFieldChanges";

import { EMPTY_CONDITION } from "../../data/data-structures";

const Condition = ({ when, is, children }) => (
  // show children if condition (value === is) is met or show nothing
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const Conditions = ({ name, questions }) => {
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
                  {/* <Condition when={`${name}.QuestionIdOrTag`} is="QuestionId"> */}
                  {/* </Condition> */}
                  <QnaField
                    name={`${name}.QuestionId`}
                    component="input"
                    type="text"
                    placeholder="QuestionId"
                  />
                  <WhenFieldChanges
                    field={`${name}.QuestionId`}
                    isNotEmpty
                    set={`${name}.QuestionTag`}
                    to={undefined}
                  />
                  <InnerText>or</InnerText>
                  <QnaField
                    name={`${name}.QuestionTag`}
                    component="input"
                    type="text"
                    placeholder="QuestionTag"
                  />
                  <WhenFieldChanges
                    field={`${name}.QuestionTag`}
                    isNotEmpty
                    set={`${name}.QuestionId`}
                    to={undefined}
                  />
                </Row>
                <Row></Row>
                <Row>
                  <QnaField
                    name={`${name}.MustEqual`}
                    component="input"
                    type="text"
                    placeholder="Must equal"
                  />
                  <WhenFieldChanges
                    field={`${name}.MustEqual`}
                    isNotEmpty
                    set={`${name}.Contains`}
                    to={undefined}
                  />
                  <InnerText>or</InnerText>
                  <QnaField
                    name={`${name}.Contains`}
                    component="input"
                    type="text"
                    placeholder="Contains"
                  />
                  <WhenFieldChanges
                    field={`${name}.Contains`}
                    isNotEmpty
                    set={`${name}.MustEqual`}
                    to={undefined}
                  />
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
