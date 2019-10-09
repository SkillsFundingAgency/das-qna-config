import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

const Conditions = ({ name }) => {
  return (
    <Container>
      <p>...if...</p>

      <FieldArray name={`${name}.Conditions`}>
        {({ fields }) => {
          console.log("fields:", fields);
          {
            return fields.map((name, index) => (
              <Row>
                <Field
                  name={`${name}.QuestionId`}
                  component="input"
                  type="text"
                  placeholder="Question Id"
                />
              </Row>
            ));
          }
        }}
      </FieldArray>
    </Container>
  );
};

export default Conditions;

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
