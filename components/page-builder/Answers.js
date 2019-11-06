import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Answer from "./Answer";
import SortableList from "../SortableList";

import {
  EMPTY_OPTION,
  EMPTY_COMPLEX_OPTION
} from "./../../data/data-structures";

const Answers = ({ name, isComplex }) => {
  // console.log("isComplex:", isComplex);
  // console.log(name);

  return (
    <Container>
      <FieldArray name={`${name}.Input.Options`}>
        {({ fields }) => (
          <>
            {/* {console.log({ fields })} */}
            <SortableList
              lockAxis="y"
              useDragHandle
              onSortEnd={({ oldIndex, newIndex }) => {
                console.log("oldIndex, newIndex:", oldIndex, newIndex);
                return fields.move(oldIndex, newIndex);
              }}
            >
              {fields.map((name, index) => (
                <Answer
                  key={name}
                  index={index}
                  name={name}
                  remove={() => fields.remove(index)}
                />
              ))}
            </SortableList>
            <Buttons>
              <Button
                type="button"
                onClick={() =>
                  fields.push(isComplex ? EMPTY_COMPLEX_OPTION : EMPTY_OPTION)
                }
              >
                + Add Answer
              </Button>
            </Buttons>
          </>
        )}
      </FieldArray>
    </Container>
  );
};

export default Answers;

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
  margin-bottom: 10px;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
