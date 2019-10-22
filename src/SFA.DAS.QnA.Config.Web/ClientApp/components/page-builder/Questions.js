import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { sortableContainer } from "react-sortable-hoc";
import SortableList from "./SortableList";

import Question from "./Question";

const Questions = sortableContainer(() => {
  return (
    <Container>
      <h3>Questions</h3>
      <FieldArray name="Questions">
        {({ fields }) => {
          // console.log("fields:", fields);

          const myMove = () => {
            // Error occurs as soon as we attempt to move the <Radio /> question,
            // but only if it contains answers.
            try {
              fields.move(0, 1);
            } catch (e) {
              console.log("Move exploded", e);
            }
          };

          return (
            <>
              {/* <div className="move">
                <button onClick={myMove}>Move down</button>
              </div> */}
              <SortableList
                lockAxis="y"
                useDragHandle
                onSortEnd={({
                  oldIndex,
                  newIndex,
                  collection,
                  isKeySorting
                }) => {
                  console.log(
                    "oldIndex, newIndex, collection, isKeySorting:",
                    oldIndex,
                    newIndex,
                    collection,
                    isKeySorting
                  );
                  return fields.move(oldIndex, newIndex);
                }}
              >
                {fields.map((name, index) => {
                  // console.log(name);

                  return (
                    <Question
                      key={name}
                      index={index}
                      name={name}
                      removeQuestion={() => fields.remove(index)}
                    />
                  );
                })}
              </SortableList>
              <Buttons>
                <Button
                  type="button"
                  onClick={() => fields.push({ Input: { Type: "text" } })}
                >
                  + Add Question
                </Button>
              </Buttons>
            </>
          );
        }}
      </FieldArray>
    </Container>
  );
});

export default Questions;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 20px;
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
