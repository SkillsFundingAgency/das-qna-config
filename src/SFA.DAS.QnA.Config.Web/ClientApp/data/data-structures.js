export const EMPTY_SECTION = {
  Title: "",
  LinkTitle: "",
  DisplayType: "",
  RequestedFeedbackAnswered: null,
  Pages: []
};

export const EMPTY_PAGE = {
  PageId: "",
  SequenceId: null,
  SectionId: null,
  Title: "",
  LinkTitle: "",
  InfoText: "",
  Questions: [],
  PageOfAnswers: [],
  Next: [],
  Complete: false,
  AllowMultipleAnswers: false,
  Active: true,
  NotRequiredOrgTypes: null,
  NotRequiredConditions: [],
  NotRequired: false,
  BodyText: "",
  ActivatedByPageId: ""
};

export const EMPTY_QUESTION = {
  QuestionId: "",
  QuestionTag: "",
  Label: "",
  ShortLabel: "",
  QuestionBodyText: "",
  Hint: "",
  Input: {
    Type: "",
    Validations: [],
    Options: [],
    InputClasses: null,
    DataEndpoint: null
  },
  Order: null,
  Value: null,
  ErrorMessages: null
};
