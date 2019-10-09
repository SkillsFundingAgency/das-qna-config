import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Conditions from "./Conditions";

const NextPage = ({ name }) => {
  return (
    <Container>
      <h3>Routes</h3>

      <FieldArray name={`${name}.Next`}>
        {({ fields }) => {
          // console.log("fields:", fields);
          {
            return fields.map((name, index) => (
              <>
                <Row>
                  <Field
                    name={`${name}.Action`}
                    component="input"
                    type="text"
                    placeholder="Action"
                  />
                  <Field
                    name={`${name}.ReturnId`}
                    component="input"
                    type="text"
                    placeholder="Return ID"
                  />
                  {/* <Field
                  name={`${name}.Condition`}
                  component="input"
                  type="text"
                  placeholder="Condition"
                /> */}
                  <Field
                    name={`${name}.Conditions`}
                    component="input"
                    type="text"
                    placeholder="Condition equal"
                  />
                </Row>
                <Conditions name={name} />
              </>
            ));
          }
        }}
      </FieldArray>
    </Container>
  );
};

export default NextPage;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 5px;

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
