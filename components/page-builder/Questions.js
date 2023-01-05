import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { sortableContainer } from "react-sortable-hoc";
import SortableList from "../SortableList";

import Question from "./Question";
import Warning from "../Warning";

import { findArrayDuplicates } from "../../helpers/helperFunctions";

import { EMPTY_QUESTION } from "../../data/data-structures";

const Questions = sortableContainer(({ name }) => {
  return (
    <Container>
      <h3>Questions</h3>
      <FieldArray name={`${name}.Questions`}>
        {({ fields }) => {
          const allQuestionIds = fields.value
            ? fields.value.map(question => question.QuestionId)
            : [];

          // If this is not an empty array questionId has been used more than once.
          // Empty string values removed with filter
          const duplicateQuestionIds = [
            ...new Set(findArrayDuplicates(allQuestionIds))
          ].filter(id => id !== "");

          return (
            <>
              <span>
                {duplicateQuestionIds.length ? (
                  <Warning>
                    One or more question id's have been repeated:{" "}
                    {duplicateQuestionIds.map((id, index) => (
                      <span key={index}>
                        {index > 0 ? ", " : null}
                        {id}
                      </span>
                    ))}
                  </Warning>
                ) : null}
              </span>
              <SortableList
                lockAxis="y"
                useDragHandle
                onSortEnd={({ oldIndex, newIndex }) => {
                  return fields.move(oldIndex, newIndex);
                }}
              >
                {fields.map((name, index) => {
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
                  onClick={() => fields.push(EMPTY_QUESTION)}
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
