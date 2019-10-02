import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { sortableElement } from "react-sortable-hoc";

import Question from "./Question";
import SortHandle from "./SortHandle";
import Textarea from "./Textarea";

const Answer = sortableElement(({ name, remove }) => (
  <Container>
    <QuestionControls>
      <SortHandle />
      <RemoveAnswerButton icon={faTrash} onClick={remove} width="0" />
    </QuestionControls>
    <Rows>
      <Row>
        <Field
          name={`${name}.Value`}
          component="input"
          type="text"
          placeholder="Value"
        />
      </Row>
      <Row>
        <Field
          name={`${name}.Label`}
          component={Textarea}
          placeholder="Label"
        />
      </Row>
      <Row>
        <Field name={`${name}.Hint`} component={Textarea} placeholder="Hint" />
      </Row>
      <FieldArray name={`${name}.FurtherQuestions`}>
        {({ fields }) =>
          fields.value ? (
            <FurtherQuestionsContainer>
              {/* {console.log({ fields })} */}
              {fields.map((name, index) => {
                // console.log(name);

                return (
                  <Question
                    key={name}
                    index={index}
                    name={name}
                    isSortable={false}
                    removeQuestion={() => fields.remove(index)}
                  />
                );
              })}
              <Buttons>
                <Button type="button" onClick={() => fields.push({})}>
                  + Add further questions
                </Button>
              </Buttons>
            </FurtherQuestionsContainer>
          ) : null
        }
      </FieldArray>
    </Rows>
  </Container>
));

export default Answer;

const RemoveAnswerButton = styled(FontAwesomeIcon)`
  box-sizing: content-box;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  right: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  color: #800;
`;

// const Container = styled.div`
//   margin: 5px 0;
//   position: relative;
//   padding-right: 30px;
// `;

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 36px;
  margin-bottom: 10px;
`;

const FurtherQuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rows = styled.div`
  /* border: 1px solid #ddd; */
  /* border-radius: 3px; */
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); */

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 2px solid #ccc;
    border-radius: 3px;
    min-height: 38px;
    line-height: 24px;
    margin-left: 0;
    margin-bottom: 0;
    &[disabled] {
      background: #eee;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// const Handle = styled.div`
//   position: absolute;
//   left: -25px;
//   top: 50%;
//   margin-top: -14px;
//   color: #666;
// `;

const QuestionControls = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0px;
  top: 0px;
  border-right: 2px solid #ccc;
  background: #f2f2f2;
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
