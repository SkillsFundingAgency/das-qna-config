import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import NamedSelect from "../Select";
import QnaField from "../QnaField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import WhenFieldChanges from "../WhenFieldChanges";

import { EMPTY_NOT_REQUIRED_CONDITION } from "../../data/data-structures";

const NotRequiredConditionValue = ({ name, type }) => {
  return (
    <FieldArray name={`${name}.${type}`}>
      {({ fields }) => {
        return (
          <>
            {fields.map((name, index) => {
              return (
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
              );
            })}

            <Buttons>
              <AddContainsAllOfButton
                type="button"
                onClick={() => fields.push("")}
              >
                + Add {type} value
              </AddContainsAllOfButton>
            </Buttons>
          </>
        );
      }}
    </FieldArray>
  );
};

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
                  <QnaField
                    name={`${name}.Field`}
                    component="input"
                    type="text"
                    placeholder="Field"
                  />
                </Row>

                <NotRequiredConditionValue name={name} type="IsOneOf" />

                <NotRequiredConditionValue name={name} type="ContainsAllOf" />

                <NotRequiredConditionValue name={name} type="DoesNotContain" />

                <WhenFieldChanges
                  field={`${name}.ContainsAllOf`}
                  isNotEmpty
                  set={`${name}.IsOneOf`}
                  to={undefined}
                />
                <WhenFieldChanges
                  field={`${name}.ContainsAllOf`}
                  isNotEmpty
                  set={`${name}.DoesNotContain`}
                  to={undefined}
                />
                <WhenFieldChanges
                  field={`${name}.IsOneOf`}
                  isNotEmpty
                  set={`${name}.ContainsAllOf`}
                  to={undefined}
                />
                <WhenFieldChanges
                  field={`${name}.IsOneOf`}
                  isNotEmpty
                  set={`${name}.DoesNotContain`}
                  to={undefined}
                />
                <WhenFieldChanges
                  field={`${name}.DoesNotContain`}
                  isNotEmpty
                  set={`${name}.ContainsAllOf`}
                  to={undefined}
                />
                <WhenFieldChanges
                  field={`${name}.DoesNotContain`}
                  isNotEmpty
                  set={`${name}.IsOneOf`}
                  to={undefined}
                />
              </Container>
            ))}

            <Row>
              <Buttons>
                <AddRequiredConditionButton
                  type="button"
                  onClick={() => fields.push(EMPTY_NOT_REQUIRED_CONDITION)}
                >
                  + Add not required condition
                </AddRequiredConditionButton>
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

const RoutingSelector = styled(NamedSelect)`
  width: 100%;
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

const AddRequiredConditionButton = styled(Button)`
  margin-bottom: 10px;
`;
const AddContainsAllOfButton = styled(Button)`
  margin-bottom: 10px;
`;
