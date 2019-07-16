export const EMPTY_PROJECT = {
  id: null,
  createdAt: "",
  name: "",
  description: "",
  sections: []
};

export const EMPTY_SECTION = {
  id: null,
  name: "",
  Pages: []
};

export const EMPTY_PAGE = {
  PageId: "",
  SequenceId: "",
  SectionId: "",
  Title: "",
  LinkTitle: "",
  InfoText: "",
  Questions: [],
  PageOfAnswers: [],
  Next: [],
  Complete: false,
  AllowMultipleAnswers: false,
  Active: true,
  NotRequiredOrgTypes: [],
  NotRequired: false,
  BodyText: ""
};

export const EMPTY_QUESTION = {
  QuestionId: "",
  QuestionTag: "",
  Label: "",
  ShortLabel: "",
  QuestionBodyText: "",
  Hint: "",
  Input: {}
};

// Input {} is below

// Type: "",
// Options: [],
// Validations: [],
// InputClasses: ""
