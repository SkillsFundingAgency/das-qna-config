import { useState } from "react";
import { Field } from "react-final-form";
import { sortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SortHandle from "./SortHandle";
import WhenFieldChanges from "./WhenFieldChanges";
import Select from "../Select";
import Textarea from "../Textarea";
import Answers from "./Answers";
import Validations from "./Validations";
import {
  QUESTION_TYPES,
  INPUT_CLASSES,
  EMPTY_FURTHER_QUESTION,
  EMPTY_COMPLEX_OPTION,
  EMPTY_OPTION
} from "./../../data/data-structures";

const hasOptions = type => {
  return ~["Radio", "CheckBoxList", "dropdown"].indexOf(type);
};
const isComplex = type => ~["ComplexRadio"].indexOf(type);

const isText = type => ~["Text", "longText", "Date", "Number"].indexOf(type);

const IfType = ({ name, children, predicate }) => (
  <Field name={`${name}.Input.Type`} subscription={{ value: true }}>
    {({ input: { value } }) => (predicate(value) ? children : null)}
  </Field>
);

const Question = sortableElement(({ name, isSortable, removeQuestion }) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = event => setOpen(!open);

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

        {/* <Handle>
          <SortHandle />
        </Handle> */}
        {/* <Toggle
          title={open ? "Collapse" : "Expand"}
          name={open ? "chevron-down" : "chevron-right"}
          onClick={this.toggleOpen}
        /> */}
        <Row>
          <Field
            name={`${name}.QuestionId`}
            component="input"
            type="text"
            placeholder="Question ID"
          />
          <Field
            name={`${name}.Input.Type`}
            component={TypeSelector}
            options={QUESTION_TYPES}
            isSearchable={false}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["Text", "longText", "Date", "Number"]}
            set={`${name}.Input.Options`}
            to={undefined}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["Radio", "CheckBoxList", "dropdown"]}
            set={`${name}.Input.Options`}
            to={[EMPTY_OPTION]}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes={["ComplexRadio"]}
            set={`${name}.Input.Options`}
            to={[EMPTY_COMPLEX_OPTION]}
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
          <Field
            name={`${name}.QuestionBodyText`}
            component={Textarea}
            placeholder="Question body text (HTML)"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.QuestionTag`}
            component={Textarea}
            placeholder="Question tag"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.ShortLabel`}
            component={Textarea}
            placeholder="Short label"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.Hint`}
            component={Textarea}
            placeholder="Hint text (HTML)"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.Input.InputClasses`}
            component={InputClasses}
            options={INPUT_CLASSES}
            placeholder="Input classes"
          />
        </Row>
        {open && (
          <>
            <IfType name={name} predicate={hasOptions}>
              <Answers name={name} isComplex={false} />
            </IfType>
            <IfType name={name} predicate={isComplex}>
              <Answers name={name} isComplex={true} />
            </IfType>
            {/* <IfType name={name} predicate={isText}>
              <Row>
                <Field
                  name={`${name}.placeholder`}
                  component={Textarea}
                  placeholder="Placeholder"
                />
              </Row>
            </IfType> */}
          </>
        )}
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

const TypeSelector = styled(Select)`
  margin-left: 5px;
  width: 165px;
`;

const InputClasses = styled(Select)`
  width: 100%;
`;

// const Toggle = styled(Icon)`
//   position: absolute;
//   top: -15px;
//   left: 5px;
//   width: 20px;
//   margin-right: 5px;
//   margin-top: 20px;
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