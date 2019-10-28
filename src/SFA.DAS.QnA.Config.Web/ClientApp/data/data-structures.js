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
    Type: "text",
    Validations: [],
    Options: [],
    InputClasses: null,
    DataEndpoint: null
  },
  Order: null,
  Value: null,
  ErrorMessages: null
};

export const EMPTY_VALIDATION = {
  Name: "",
  Value: null,
  ErrorMessage: ""
};

export const INPUT_CLASSES = [
  { value: "govuk-!-width-two-thirds", label: "govuk-!-width-two-thirds" },
  { value: "govuk-input--width-10", label: "govuk-input--width-10" },
  { value: "govuk-input--width-20", label: "govuk-input--width-20" },
  { value: "govuk-input--width-3", label: "govuk-input--width-3" },
  { value: "govuk-input--width-5", label: "govuk-input--width-5" },
  { value: null, label: "null" }
];

export const VALIDATION_TYPES = [
  {
    value: "AddressBuildingAndStreetRequired",
    label: "AddressBuildingAndStreetRequired"
  },
  { value: "AddressPostcodeRequired", label: "AddressPostcodeRequired" },
  { value: "AddressTownOrCityRequired", label: "AddressTownOrCityRequired" },
  { value: "ClientApiCall", label: "ClientApiCall" },
  { value: "Date", label: "Date" },
  { value: "DateNotInFuture", label: "DateNotInFuture" },
  { value: "EmailAddressIsValid", label: "EmailAddressIsValid" },
  { value: "MaxCharCount", label: "MaxCharCount" },
  { value: "MaxWordCount", label: "MaxWordCount" },
  { value: "MonthAndYear", label: "MonthAndYear" },
  { value: "MonthAndYearNotInFuture", label: "MonthAndYearNotInFuture" },
  { value: "Regex", label: "Regex" },
  { value: "RegisteredCharityNumber", label: "RegisteredCharityNumber" },
  { value: "Required", label: "Required" }
];

export const QUESTION_TYPES = [
  {
    value: "text",
    label: "Text"
  },
  {
    value: "Date",
    label: "Date"
  },
  {
    value: "number",
    label: "Number"
  },
  // {
  //   value: "longText",
  //   label: "Long answer"
  // },
  {
    value: "Textarea",
    label: "Long answer"
  },
  // {
  //   value: "checkbox",
  //   label: "Checkbox"
  // },
  // {
  //   value: "optionGroup",
  //   label: "Radio group"
  // },
  {
    value: "Radio",
    label: "Radio"
  },
  {
    value: "ComplexRadio",
    label: "Complex radio"
  }
  // {
  //   value: "checklist",
  //   label: "Checkbox list"
  // },
  // {
  //   value: "dropdown",
  //   label: "Select"
  // }
];
