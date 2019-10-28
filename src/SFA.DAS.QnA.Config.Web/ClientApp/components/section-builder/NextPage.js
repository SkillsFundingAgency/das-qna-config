import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import Select from "../Select";

import Conditions from "./Conditions";

import { ROUTING_TYPES, EMPTY_NEXT } from "./../../data/data-structures";

const NextPage = ({ name, questions }) => {
  return (
    <>
      <h3>Routes</h3>

      <FieldArray name={`${name}.Next`}>
        {({ fields }) => {
          return (
            <>
              {fields.map((name, index) => (
                <div key={index}>
                  <Row>
                    <Field
                      name={`${name}.Action`}
                      component={RoutingSelector}
                      options={ROUTING_TYPES}
                      isSearchable={false}
                    />
                    <InnerText>will be</InnerText>
                    <Field
                      name={`${name}.ReturnId`}
                      component="input"
                      type="text"
                      placeholder="Return ID"
                    />
                  </Row>
                  <Conditions name={name} questions={questions} />
                </div>
              ))}

              <Buttons>
                <Button type="button" onClick={() => fields.push(EMPTY_NEXT)}>
                  + Add a Route
                </Button>
              </Buttons>
            </>
          );
        }}
      </FieldArray>
    </>
  );
};

export default NextPage;

const InnerText = styled.p`
  line-height: 2.4em;
  margin: 0 5px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 10px;

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
