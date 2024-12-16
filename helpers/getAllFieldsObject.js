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
  EMPTY_VALIDATION
} from "@/data/data-structures";

export const schemaObjects = [
  EMPTY_SECTION,
  EMPTY_PAGE,
  EMPTY_OPTION,
  EMPTY_COMPLEX_OPTION,
  EMPTY_NEXT,
  EMPTY_NOT_REQUIRED_CONDITION,
  EMPTY_DETAILS,
  EMPTY_CONDITION,
  EMPTY_QUESTION,
  EMPTY_VALIDATION
];

export const mergeObjects = objects => {
  var out = {};

  for (var i = 0; i < objects.length; i++) {
    for (var p in objects[i]) {
      out[p] = objects[i][p];
    }
  }

  return out;
};
