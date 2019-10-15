import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Conditions from "./Conditions";

const NextPage = ({ name, questions }) => {
  return (
    <>
      <h3>Routes</h3>

      <FieldArray name={`${name}.Next`}>
        {({ fields }) => {
          {
            return fields.map((name, index) => (
              <div key={index}>
                <Row>
                  <InnerText>The</InnerText>
                  <Field
                    name={`${name}.Action`}
                    component="input"
                    type="text"
                    placeholder="Action"
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
            ));
          }
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
