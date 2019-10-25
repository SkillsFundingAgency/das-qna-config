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

export const INPUT_CLASSES = {
  InputClasses: "govuk-!-width-two-thirds",
  InputClasses: "govuk-input--width-10",
  InputClasses: "govuk-input--width-20",
  InputClasses: "govuk-input--width-3",
  InputClasses: "govuk-input--width-5",
  InputClasses: null
};

export const VALIDATION_TYPES = {
  Name: "AddressBuildingAndStreetRequired",
  Name: "AddressPostcodeRequired",
  Name: "AddressTownOrCityRequired",
  Name: "ClientApiCall",
  Name: "Date",
  Name: "DateNotInFuture",
  Name: "EmailAddressIsValid",
  Name: "MaxCharCount",
  Name: "MaxWordCount",
  Name: "MonthAndYear",
  Name: "MonthAndYearNotInFuture",
  Name: "Regex",
  Name: "RegisteredCharityNumber",
  Name: "Required"
};
