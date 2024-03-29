import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { sortableElement } from "react-sortable-hoc";

import Question from "./Question";
import SortHandle from "../SortHandle";
import Textarea from "../Textarea";
import QnaField from "../QnaField";

import { EMPTY_QUESTION } from "../../data/data-structures";

const Answer = sortableElement(({ name, remove, isComplex }) => (
  <Container>
    <QuestionControls>
      <SortHandle />
      <RemoveAnswerButton icon={faTrash} onClick={remove} width="0" />
    </QuestionControls>
    <Row>
      <QnaField
        name={`${name}.Value`}
        component="input"
        type="text"
        placeholder="Value"
      />
    </Row>
    <Row>
      <QnaField
        name={`${name}.Label`}
        component={Textarea}
        placeholder="Label"
      />
    </Row>
    <Row>
      <QnaField
        name={`${name}.HintText`}
        component={Textarea}
        placeholder="Hint text"
      />
    </Row>
    {isComplex && (
      <FieldArray name={`${name}.FurtherQuestions`}>
        {({ fields }) =>
          fields.value ? (
            <FurtherQuestionsContainer>
              {fields.map((name, index) => {
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
                <Button
                  type="button"
                  onClick={() => fields.push(EMPTY_QUESTION)}
                >
                  + Add further questions
                </Button>
              </Buttons>
            </FurtherQuestionsContainer>
          ) : (
            <Row>
              <QnaField
                name={`${name}.ConditionalContentText`}
                component={Textarea}
                placeholder="Conditional content"
              />
            </Row>
          )
        }
      </FieldArray>
    )}
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

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

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
