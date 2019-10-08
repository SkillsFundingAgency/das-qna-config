import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

const NextPage = ({ name }) => {
  return (
    <Container>
      <h3>Next</h3>
      <FieldArray name={`${name}.Next`}>
        {({ fields }) => {
          console.log("fields:", fields);
          {
            return fields.map((name, index) => (
              <>
                <Field
                  name={`${name}.ReturnId`}
                  component="input"
                  type="text"
                  placeholder="Question ID"
                />
                <Field
                  name={`${name}.Condition.QuestionId`}
                  component="input"
                  type="text"
                  placeholder="Condition id"
                />
                <Field
                  name={`${name}.Condition.MustEqual`}
                  component="input"
                  type="text"
                  placeholder="Condition equal"
                />
              </>
              // <Route
              //   key={name}
              //   index={index}
              //   name={name}
              //   remove={() => fields.remove(index)}
              // />
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
