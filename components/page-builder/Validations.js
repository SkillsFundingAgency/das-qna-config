import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Validation from "./Validation";
import { EMPTY_VALIDATION } from "@/data/data-structures";

const Validations = ({ name }) => {
  return (
    <Container>
      <FieldArray name={`${name}.Input.Validations`}>
        {({ fields }) => (
          <>
            {fields.map((name, index) => (
              <div key={name}>
                <h3>Validation</h3>
                <Validation
                  key={name}
                  index={index}
                  name={name}
                  remove={() => fields.remove(index)}
                />
              </div>
            ))}
            <Buttons>
              <Button
                type="button"
                onClick={() => fields.push(EMPTY_VALIDATION)}
              >
                + Add Validation
              </Button>
            </Buttons>
          </>
        )}
      </FieldArray>
    </Container>
  );
};

export default Validations;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  /* padding-left: 28px; */
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
