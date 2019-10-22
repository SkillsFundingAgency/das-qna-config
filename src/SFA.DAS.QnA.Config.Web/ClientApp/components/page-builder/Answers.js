import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Answer from "./Answer";
import SortableList from "./SortableList";

const Answers = ({ name }) => {
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
              <Button type="button" onClick={() => fields.push({})}>
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
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
