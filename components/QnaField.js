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
      <Label>{singleWordName}</Label>
      <Field parse={identity} name={name} {...props} />
    </QnaFieldContainer>
  );
};

export default QnaField;

const QnaFieldContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
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
