import { useState } from "react";
import { Field } from "react-final-form";
import { sortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SortHandle from "../SortHandle";
import WhenFieldChanges from "../WhenFieldChanges";
import Select from "../Select";
import CreatableSelect from "../CreatableSelect";
import Textarea from "../Textarea";
import Answers from "./Answers";
import Validations from "./Validations";
import QnaField from "../QnaField";
import {
  QUESTION_TYPES,
  INPUT_CLASSES,
  EMPTY_COMPLEX_OPTION,
  EMPTY_DATAFED_CHECKBOXLIST,
  EMPTY_OPTION
} from "../../data/data-structures";

const hasOptions = type => ~["Radio", "CheckboxList"].indexOf(type);
const isComplex = type => ~["ComplexRadio"].indexOf(type);
const isDataFedCheckboxList = type => ~["DataFed_CheckboxList"].indexOf(type);
const isNumber = type => ~["Number"].indexOf(type);
const isText = type =>
  ~[
    "Text",
    "Date",
    "MonthAndYear",
    "Number",
    "Address",
    "Email",
    "Textarea",
    "LongTextarea"
  ].indexOf(type);

const FURTHER_QUESTION_TYPES = QUESTION_TYPES.filter(
  element => element.value !== "ComplexRadio"
);

const IfType = ({ name, children, predicate }) => (
  <Field name={`${name}.Input.Type`} subscription={{ value: true }}>
    {({ input: { value } }) => (predicate(value) ? children : null)}
  </Field>
);

const Question = sortableElement(({ name, isSortable, removeQuestion }) => {
  const isFurtherQuestion = name.includes("FurtherQuestions");

  return (
    <div>
      <Container>
        <QuestionControls>
          <SortHandle />
          <RemoveQuestionButton
            icon={faTrash}
            onClick={removeQuestion}
            width="0"
          />
        </QuestionControls>

        <Row>
          <QnaField
            name={`${name}.QuestionId`}
            component="input"
            type="text"
            placeholder="Question ID"
          />
          <QnaField
            name={`${name}.Input.Type`}
            component={TypeSelector}
            options={
              isFurtherQuestion ? FURTHER_QUESTION_TYPES : QUESTION_TYPES
            }
            isSearchable={false}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["Text", "Date", "Number", "Address"]}
            set={`${name}.Input.Options`}
            to={undefined}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["Radio", "CheckboxList"]}
            set={`${name}.Input.Options`}
            to={[EMPTY_OPTION]}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["DataFed_CheckboxList"]}
            set={`${name}.Input`}
            to={EMPTY_DATAFED_CHECKBOXLIST}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["ComplexRadio"]}
            set={`${name}.Input.Options`}
            to={[EMPTY_COMPLEX_OPTION]}
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
            name={`${name}.QuestionBodyText`}
            component={Textarea}
            placeholder="Question body text (HTML)"
          />
        </Row>
        <Row>
          <QnaField
            name={`${name}.QuestionTag`}
            component={Textarea}
            placeholder="Question tag"
          />
        </Row>
        <Row>
          <QnaField
            name={`${name}.ShortLabel`}
            component={Textarea}
            placeholder="Short label"
          />
        </Row>
        <Row>
          <QnaField
            name={`${name}.Hint`}
            component={Textarea}
            placeholder="Hint text (HTML)"
          />
        </Row>
        <IfType name={name} predicate={isNumber}>
          <Row>
            <QnaField
              name={`${name}.Input.InputPrefix`}
              component="input"
              type="text"
              placeholder="Input 
            prefix"
            />

            <QnaField
              name={`${name}.Input.InputSuffix`}
              component="input"
              type="text"
              placeholder="Input 
            suffix"
            />
          </Row>
        </IfType>
        <IfType name={name} predicate={isText}>
          <Row>
            <QnaField
              name={`${name}.Input.InputClasses`}
              component={InputClasses}
              options={INPUT_CLASSES}
              placeholder="Input classes"
            />
          </Row>
        </IfType>
        <IfType name={name} predicate={isDataFedCheckboxList}>
          <Row>
            <QnaField
              name={`${name}.Input.DataEndpoint`}
              component={Textarea}
              placeholder="You must enter a data endpoint"
            />
          </Row>
        </IfType>

        <>
          <IfType name={name} predicate={hasOptions}>
            <Answers name={name} isComplex={false} />
          </IfType>
          <IfType name={name} predicate={isComplex}>
            <Answers name={name} isComplex={true} />
          </IfType>
        </>

        <Validations name={name} />
      </Container>
    </div>
  );
});

export default Question;

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 36px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TypeSelector = styled(Select)`
  margin-left: 5px;
  width: 100%;
`;

const InputClasses = styled(CreatableSelect)`
  width: 100%;
`;

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

const RemoveQuestionButton = styled(FontAwesomeIcon)`
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
