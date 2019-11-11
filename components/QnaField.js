import { useMemo } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import {
  EMPTY_SECTION,
  EMPTY_PAGE,
  EMPTY_OPTION,
  EMPTY_COMPLEX_OPTION,
  EMPTY_NEXT,
  EMPTY_NOT_REQUIRED_CONDITION,
  EMPTY_DETAILS,
  EMPTY_CONDITION,
  EMPTY_QUESTION,
  EMPTY_FURTHER_QUESTION,
  EMPTY_VALIDATION
} from "./../data/data-structures";

const schemaObjects = [
  EMPTY_SECTION,
  EMPTY_PAGE,
  EMPTY_OPTION,
  EMPTY_COMPLEX_OPTION,
  EMPTY_NEXT,
  EMPTY_NOT_REQUIRED_CONDITION,
  EMPTY_DETAILS,
  EMPTY_CONDITION,
  EMPTY_QUESTION,
  EMPTY_FURTHER_QUESTION,
  EMPTY_VALIDATION
];

var merge = function(objects) {
  var out = {};

  for (var i = 0; i < objects.length; i++) {
    for (var p in objects[i]) {
      out[p] = objects[i][p];
    }
  }

  return out;
};

const QnaField = ({ emptyType, name, ...props }) => {
  const allFieldsObject = useMemo(() => merge(schemaObjects), schemaObjects);
  const singleWordName = name.split(".").splice(-1);
  const emptyValue = allFieldsObject[singleWordName];
  const identity = value => (value === "" ? emptyValue : value);
  return (
    <QnaFieldContainer>
      <Field parse={identity} name={name} {...props} />
      <Label>{singleWordName}</Label>
    </QnaFieldContainer>
  );
};

export default QnaField;

const QnaFieldContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-bottom: 10px;

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
    min-height: 38px;
    line-height: 24px;
  }

  .required {
    border: 2px solid #d60000;
  }

  /* & > input {
    margin: 0;
    padding: 9px;
  }

  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 0;
  } */
`;

const Label = styled.label`
  position: absolute;
  top: -6px;
  left: 10px;
  padding: 0 1px;
  line-height: 1;
  font-size: 11px;
  font-weight: bold;
  color: #555555;
  background: #fff;
`;
