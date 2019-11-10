import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import Select from "../Select";
import QnaField from "./../QnaField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { EMPTY_NOT_REQUIRED_CONDITION } from "./../../data/data-structures";

const NotRequiredConditions = ({ name }) => {
  return (
    <FieldArray name={`${name}.NotRequiredConditions`}>
      {({ fields }) => {
        return (
          <>
            {fields.map((name, index) => (
              <Container key={index}>
                <h3 style={{ marginTop: "0" }}>Not required conditions</h3>
                <PageControls>
                  <RemoveNotRequiredConditionButton
                    icon={faTrash}
                    onClick={() => fields.remove(index)}
                    width="0"
                  />
                </PageControls>
                <Row>
                  {/* <Field
                    name={`${name}.Action`}
                    component={FieldTypeSelector}
                    options={FIELD_TYPES}
                    isSearchable={false}
                  /> */}
                  <QnaField
                    name={`${name}.Field`}
                    component="input"
                    type="text"
                    placeholder="Field"
                  />
                </Row>

                <FieldArray name={`${name}.IsOneOf`}>
                  {({ fields }) => {
                    return (
                      <>
                        {fields.map((name, index) => (
                          <Row key={index}>
                            <QnaField
                              name={`${name}`}
                              component="input"
                              type="text"
                              placeholder="Values"
                            />
                            <RemoveNotRequiredConditionValueButton
                              icon={faTrash}
                              onClick={() => fields.remove(index)}
                              width="0"
                            />
                          </Row>
                        ))}

                        <Buttons>
                          <Button type="button" onClick={() => fields.push("")}>
                            + Add a value
                          </Button>
                        </Buttons>
                      </>
                    );
                  }}
                </FieldArray>
              </Container>
            ))}

            <Row>
              <Buttons>
                <Button
                  type="button"
                  onClick={() => fields.push(EMPTY_NOT_REQUIRED_CONDITION)}
                >
                  + Add not required condition
                </Button>
              </Buttons>
            </Row>
          </>
        );
      }}
    </FieldArray>
  );
};

export default NotRequiredConditions;

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 36px;
  margin-bottom: 10px;
`;

const InnerText = styled.p`
  line-height: 2.4em;
  margin: 0 5px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }

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

const RoutingSelector = styled(Select)`
  width: 250px;
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

const RemoveNotRequiredConditionButton = styled(FontAwesomeIcon)`
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

const RemoveNotRequiredConditionValueButton = styled(
  RemoveNotRequiredConditionButton
)`
  padding: 12px 0 0 10px;
`;
