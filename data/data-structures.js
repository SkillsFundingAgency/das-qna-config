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
  LinkTitle: null,
  InfoText: "",
  Questions: [],
  PageOfAnswers: [],
  Next: [],
  Complete: false,
  AllowMultipleAnswers: false,
  Order: null,
  Active: true,
  NotRequiredConditions: [],
  BodyText: "",
  Details: null,
  DisplayType: null,
  Feedback: null,
  ActivatedByPageId: null
};

export const EMPTY_OPTION = {
  Value: "",
  Label: "",
  HintText: ""
};

export const EMPTY_COMPLEX_OPTION = {
  FurtherQuestions: [],
  Value: "",
  Label: "",
  HintText: ""
};

export const EMPTY_NEXT = {
  Action: "NextPage",
  ReturnId: "",
  Condition: null,
  Conditions: [],
  ConditionMet: false
};

export const EMPTY_NOT_REQUIRED_CONDITION = {
  Field: "",
  IsOneOf: []
};

export const EMPTY_DETAILS = {
  Title: "",
  Body: ""
};

export const EMPTY_CONDITION = {
  QuestionId: "",
  QuestionTag: null,
  MustEqual: ""
};

export const EMPTY_QUESTION = {
  QuestionId: "",
  QuestionTag: null,
  Label: "",
  ShortLabel: "",
  InputClasses: null,
  QuestionBodyText: "",
  Hint: "",
  Input: {
    Type: "Text",
    InputClasses: null,
    Options: [],
    Validations: [],
    DataEndpoint: null
  },
  Order: null,
  Value: null,
  ErrorMessages: null
};

export const EMPTY_FURTHER_QUESTION = {
  QuestionId: "",
  QuestionTag: null,
  Label: "",
  ShortLabel: "",
  InputClasses: null,
  QuestionBodyText: "",
  Hint: "",
  Input: {
    Type: "Text",
    InputClasses: null,
    Options: [],
    Validations: [],
    DataEndpoint: null
  },
  Order: null,
  Value: null,
  ErrorMessages: null
};

export const EMPTY_DATAFED_CHECKBOXLIST = {
  Type: "DataFed_CheckboxList",
  InputClasses: null,
  Options: [],
  Validations: [],
  DataEndpoint: "http://replace-with-endpoint"
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
  { value: "", label: "None" }
];

export const VALIDATION_TYPES = [
  {
    value: "AddressBuildingAndStreetRequired",
    label: "AddressBuildingAndStreetRequired"
  },
  { value: "AddressPostcodeRequired", label: "AddressPostcodeRequired" },
  { value: "AddressRequired", label: "AddressRequired" },
  { value: "AddressTownOrCityRequired", label: "AddressTownOrCityRequired" },
  { value: "ClientApiCall", label: "ClientApiCall" },
  { value: "Date", label: "Date" },
  { value: "DateNotInFuture", label: "DateNotInFuture" },
  { value: "EmailAddressIsValid", label: "EmailAddressIsValid" },
  { value: "FileType", label: "FileType" },
  { value: "MaxLength", label: "MaxLength" },
  { value: "MaxWordCount", label: "MaxWordCount" },
  { value: "MinLength", label: "MinLength" },
  { value: "MonthAndYear", label: "MonthAndYear" },
  { value: "MonthAndYearNotInFuture", label: "MonthAndYearNotInFuture" },
  { value: "Regex", label: "Regex" },
  { value: "RegisteredCharityNumber", label: "RegisteredCharityNumber" },
  { value: "Required", label: "Required" }
];

export const QUESTION_TYPES = [
  {
    value: "Text",
    label: "Text"
  },
  {
    value: "Radio",
    label: "Radio"
  },
  {
    value: "ComplexRadio",
    label: "Complex radio"
  },
  {
    value: "Number",
    label: "Number"
  },
  {
    value: "Textarea",
    label: "Textarea"
  },
  {
    value: "Email",
    label: "Email address"
  },
  {
    value: "Address",
    label: "Address"
  },
  {
    value: "Date",
    label: "Date"
  },
  {
    value: "MonthAndYear",
    label: "Month and year"
  },
  {
    value: "FileUpload",
    label: "File upload"
  },
  {
    value: "CheckBoxList",
    label: "Checkbox list"
  },
  {
    value: "DataFed_CheckboxList",
    label: "Data-fed checkbox list"
  },
  {
    value: "TabularData",
    label: "Tabular data"
  }
  // {
  //   value: "checkbox",
  //   label: "Checkbox"
  // },
  // {
  //   value: "dropdown",
  //   label: "Select"
  // }
];

export const SECTION_DISPLAY_TYPES = [
  {
    value: "Pages",
    label: "Pages"
  },
  {
    value: "PagesWithSections",
    label: "Pages with sections"
  }
];

export const ROUTING_TYPES = [
  {
    value: "NextPage",
    label: "Next page"
  },
  {
    value: "ReturnToSection",
    label: "Return to section"
  }
];