export const APPLICATION_DATA_SCHEMA = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/root.json",
  type: "object",
  title: "The Root Schema",
  required: [
    "Title",
    "LinkTitle",
    "DisplayType",
    "RequestedFeedbackAnswered",
    "Pages"
  ],
  properties: {
    Title: {
      $id: "#/properties/Title",
      type: "string",
      title: "The Title Schema",
      default: "",
      examples: ["Organisation details"],
      pattern: "^(.*)$"
    },
    LinkTitle: {
      $id: "#/properties/LinkTitle",
      type: "string",
      title: "The Linktitle Schema",
      default: "",
      examples: ["Organisation details"],
      pattern: "^(.*)$"
    },
    DisplayType: {
      $id: "#/properties/DisplayType",
      type: "string",
      title: "The Displaytype Schema",
      default: "",
      examples: ["Pages"],
      pattern: "^(.*)$"
    },
    RequestedFeedbackAnswered: {
      $id: "#/properties/RequestedFeedbackAnswered",
      type: "null",
      title: "The Requestedfeedbackanswered Schema",
      default: null,
      examples: [null]
    },
    Pages: {
      $id: "#/properties/Pages",
      type: "array",
      title: "The Pages Schema",
      items: {
        $id: "#/properties/Pages/items",
        type: "object",
        title: "The Items Schema",
        required: [
          "PageId",
          "SequenceId",
          "SectionId",
          "Title",
          "LinkTitle",
          "InfoText",
          "Questions",
          "PageOfAnswers",
          "Next",
          "Complete",
          "AllowMultipleAnswers",
          "Order",
          "Active",
          "NotRequiredConditions",
          "BodyText",
          "Feedback",
          "ActivatedByPageId"
        ],
        properties: {
          PageId: {
            $id: "#/properties/Pages/items/properties/PageId",
            type: "string",
            title: "The Pageid Schema",
            default: "",
            examples: ["1"],
            pattern: "^(.*)$"
          },
          SequenceId: {
            $id: "#/properties/Pages/items/properties/SequenceId",
            type: "null",
            title: "The Sequenceid Schema",
            default: null,
            examples: [null]
          },
          SectionId: {
            $id: "#/properties/Pages/items/properties/SectionId",
            type: "null",
            title: "The Sectionid Schema",
            default: null,
            examples: [null]
          },
          Title: {
            $id: "#/properties/Pages/items/properties/Title",
            type: "string",
            title: "The Title Schema",
            default: "",
            examples: ["Trading name"],
            pattern: "^(.*)$"
          },
          LinkTitle: {
            $id: "#/properties/Pages/items/properties/LinkTitle",
            type: "string",
            title: "The Linktitle Schema",
            default: "",
            examples: ["Trading name"],
            pattern: "^(.*)$"
          },
          InfoText: {
            $id: "#/properties/Pages/items/properties/InfoText",
            type: "string",
            title: "The Infotext Schema",
            default: "",
            examples: [""],
            pattern: "^(.*)$"
          },
          Questions: {
            $id: "#/properties/Pages/items/properties/Questions",
            type: "array",
            title: "The Questions Schema",
            items: {
              $id: "#/properties/Pages/items/properties/Questions/items",
              type: "object",
              title: "The Items Schema",
              required: [
                "QuestionId",
                "QuestionTag",
                "Label",
                "ShortLabel",
                "QuestionBodyText",
                "Hint",
                "Input",
                "Order"
              ],
              properties: {
                QuestionId: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/QuestionId",
                  type: "string",
                  title: "The Questionid Schema",
                  default: "",
                  examples: ["CD-30"],
                  pattern: "^(.*)$"
                },
                QuestionTag: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/QuestionTag",
                  type: ["string", "null"],
                  title: "The Questiontag Schema",
                  default: null,
                  examples: [null]
                },
                Label: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/Label",
                  type: "string",
                  title: "The Label Schema",
                  default: "",
                  examples: ["Does your organisation have a trading name?"],
                  pattern: "^(.*)$"
                },
                ShortLabel: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/ShortLabel",
                  type: "string",
                  title: "The Shortlabel Schema",
                  default: "",
                  examples: [""],
                  pattern: "^(.*)$"
                },
                InputClasses: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/InputClasses",
                  type: ["null", "string"],
                  title: "The Inputclasses Schema",
                  default: null,
                  examples: [null]
                },
                QuestionBodyText: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/QuestionBodyText",
                  type: "string",
                  title: "The Questionbodytext Schema",
                  default: "",
                  examples: [""],
                  pattern: "^(.*)$"
                },
                Hint: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/Hint",
                  type: "string",
                  title: "The Hint Schema",
                  default: "",
                  examples: [""],
                  pattern: "^(.*)$"
                },
                Input: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/Input",
                  type: "object",
                  title: "The Input Schema",
                  required: ["Type"],
                  properties: {
                    Type: {
                      $id:
                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Type",
                      type: "string",
                      title: "The Type Schema",
                      default: "",
                      examples: ["ComplexRadio"],
                      pattern: "^(.*)$"
                    },
                    InputClasses: {
                      $id:
                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/InputClasses",
                      type: ["null", "string"],
                      title: "The Inputclasses Schema",
                      default: null,
                      examples: [null]
                    },
                    Options: {
                      $id:
                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options",
                      type: "array",
                      title: "The Options Schema",
                      items: {
                        $id:
                          "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items",
                        type: "object",
                        title: "The Items Schema",
                        required: ["FurtherQuestions", "Value", "Label"],
                        properties: {
                          FurtherQuestions: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions",
                            type: "array",
                            title: "The Furtherquestions Schema",
                            items: {
                              $id:
                                "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items",
                              type: "object",
                              title: "The Items Schema",
                              required: [
                                "QuestionId",
                                "QuestionTag",
                                "Label",
                                "ShortLabel",
                                "InputClasses",
                                "QuestionBodyText",
                                "Hint",
                                "Input",
                                "Order",
                                "Value",
                                "ErrorMessages"
                              ],
                              properties: {
                                QuestionId: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/QuestionId",
                                  type: "string",
                                  title: "The Questionid Schema",
                                  default: "",
                                  examples: ["CD-30.1"],
                                  pattern: "^(.*)$"
                                },
                                QuestionTag: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/QuestionTag",
                                  type: ["string", "null"],
                                  title: "The Questiontag Schema",
                                  default: "",
                                  examples: ["trading-name"],
                                  pattern: "^(.*)$"
                                },
                                Label: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Label",
                                  type: "string",
                                  title: "The Label Schema",
                                  default: "",
                                  examples: ["What is your trading name?"],
                                  pattern: "^(.*)$"
                                },
                                ShortLabel: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/ShortLabel",
                                  type: "string",
                                  title: "The Shortlabel Schema",
                                  default: "",
                                  examples: [""],
                                  pattern: "^(.*)$"
                                },
                                InputClasses: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/InputClasses",
                                  type: ["null", "string"],
                                  title: "The Inputclasses Schema",
                                  default: null,
                                  examples: [null]
                                },
                                QuestionBodyText: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/QuestionBodyText",
                                  type: "string",
                                  title: "The Questionbodytext Schema",
                                  default: "",
                                  examples: [""],
                                  pattern: "^(.*)$"
                                },
                                Hint: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Hint",
                                  type: "string",
                                  title: "The Hint Schema",
                                  default: "",
                                  examples: [""],
                                  pattern: "^(.*)$"
                                },
                                Input: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input",
                                  type: "object",
                                  title: "The Input Schema",
                                  required: [
                                    "Type",
                                    "InputClasses",
                                    "Options",
                                    "Validations",
                                    "DataEndpoint"
                                  ],
                                  properties: {
                                    Type: {
                                      $id:
                                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Type",
                                      type: "string",
                                      title: "The Type Schema",
                                      default: "",
                                      examples: ["Text"],
                                      pattern: "^(.*)$"
                                    },
                                    InputClasses: {
                                      $id:
                                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/InputClasses",
                                      type: ["null", "string"],
                                      title: "The Inputclasses Schema",
                                      default: null,
                                      examples: [null]
                                    },
                                    Options: {
                                      $id:
                                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Options",
                                      type: "array",
                                      title: "The Options Schema"
                                    },
                                    Validations: {
                                      $id:
                                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Validations",
                                      type: "array",
                                      title: "The Validations Schema",
                                      items: {
                                        $id:
                                          "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Validations/items",
                                        type: "object",
                                        title: "The Items Schema",
                                        required: [
                                          "Name",
                                          "Value",
                                          "ErrorMessage"
                                        ],
                                        properties: {
                                          Name: {
                                            $id:
                                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Validations/items/properties/Name",
                                            type: "string",
                                            title: "The Name Schema",
                                            default: "",
                                            examples: ["Required"],
                                            pattern: "^(.*)$"
                                          },
                                          Value: {
                                            $id:
                                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Validations/items/properties/Value",
                                            type: "string",
                                            title: "The Value Schema",
                                            default: "",
                                            examples: [""],
                                            pattern: "^(.*)$"
                                          },
                                          ErrorMessage: {
                                            $id:
                                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/Validations/items/properties/ErrorMessage",
                                            type: "string",
                                            title: "The Errormessage Schema",
                                            default: "",
                                            examples: ["Enter a trading name"],
                                            pattern: "^(.*)$"
                                          }
                                        }
                                      }
                                    },
                                    DataEndpoint: {
                                      $id:
                                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Input/properties/DataEndpoint",
                                      type: ["string", "null"],
                                      title: "The Dataendpoint Schema",
                                      default: null,
                                      examples: [null]
                                    }
                                  }
                                },
                                Order: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Order",
                                  type: "null",
                                  title: "The Order Schema",
                                  default: null,
                                  examples: [null]
                                },
                                Value: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/Value",
                                  type: "string",
                                  title: "The Value Schema",
                                  default: "",
                                  examples: [""],
                                  pattern: "^(.*)$"
                                },
                                ErrorMessages: {
                                  $id:
                                    "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/FurtherQuestions/items/properties/ErrorMessages",
                                  type: "null",
                                  title: "The Errormessages Schema",
                                  default: null,
                                  examples: [null]
                                }
                              }
                            }
                          },
                          Value: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/Value",
                            type: "string",
                            title: "The Value Schema",
                            default: "",
                            examples: ["Yes"],
                            pattern: "^(.*)$"
                          },
                          Label: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/Label",
                            type: "string",
                            title: "The Label Schema",
                            default: "",
                            examples: ["Yes"],
                            pattern: "^(.*)$"
                          },
                          HintText: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Options/items/properties/HintText",
                            type: "string",
                            title: "The Hinttext Schema",
                            default: "",
                            examples: [""],
                            pattern: "^(.*)$"
                          }
                        }
                      }
                    },
                    Validations: {
                      $id:
                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Validations",
                      type: "array",
                      title: "The Validations Schema",
                      items: {
                        $id:
                          "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Validations/items",
                        type: "object",
                        title: "The Items Schema",
                        required: ["Name", "Value", "ErrorMessage"],
                        properties: {
                          Name: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Validations/items/properties/Name",
                            type: "string",
                            title: "The Name Schema",
                            default: "",
                            examples: ["Required"],
                            pattern: "^(.*)$"
                          },
                          Value: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Validations/items/properties/Value",
                            type: "string",
                            title: "The Value Schema",
                            default: "",
                            examples: [""],
                            pattern: "^(.*)$"
                          },
                          ErrorMessage: {
                            $id:
                              "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/Validations/items/properties/ErrorMessage",
                            type: "string",
                            title: "The Errormessage Schema",
                            default: "",
                            examples: [
                              "Select yes if your organisation has a trading name"
                            ],
                            pattern: "^(.*)$"
                          }
                        }
                      }
                    },
                    DataEndpoint: {
                      $id:
                        "#/properties/Pages/items/properties/Questions/items/properties/Input/properties/DataEndpoint",
                      type: ["null", "string"],
                      title: "The Dataendpoint Schema",
                      default: null,
                      examples: [null]
                    }
                  }
                },
                Order: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/Order",
                  type: "null",
                  title: "The Order Schema",
                  default: null,
                  examples: [null]
                },
                Value: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/Value",
                  type: "string",
                  title: "The Value Schema",
                  default: "",
                  examples: [""],
                  pattern: "^(.*)$"
                },
                ErrorMessages: {
                  $id:
                    "#/properties/Pages/items/properties/Questions/items/properties/ErrorMessages",
                  type: "null",
                  title: "The Errormessages Schema",
                  default: null,
                  examples: [null]
                }
              }
            }
          },
          PageOfAnswers: {
            $id: "#/properties/Pages/items/properties/PageOfAnswers",
            type: "array",
            title: "The Pageofanswers Schema"
          },
          Next: {
            $id: "#/properties/Pages/items/properties/Next",
            type: "array",
            title: "The Next Schema",
            items: {
              $id: "#/properties/Pages/items/properties/Next/items",
              type: "object",
              title: "The Items Schema",
              required: ["Action", "ReturnId", "Conditions", "ConditionMet"],
              properties: {
                Action: {
                  $id:
                    "#/properties/Pages/items/properties/Next/items/properties/Action",
                  type: "string",
                  title: "The Action Schema",
                  default: "",
                  examples: ["NextPage"],
                  pattern: "^(.*)$"
                },
                ReturnId: {
                  $id:
                    "#/properties/Pages/items/properties/Next/items/properties/ReturnId",
                  type: "string",
                  title: "The Returnid Schema",
                  default: "",
                  examples: ["2"],
                  pattern: "^(.*)$"
                },
                Condition: {
                  $id:
                    "#/properties/Pages/items/properties/Next/items/properties/Condition",
                  type: "null",
                  title: "The Condition Schema",
                  default: null,
                  examples: [null]
                },
                Conditions: {
                  $id:
                    "#/properties/Pages/items/properties/Next/items/properties/Conditions",
                  type: "array",
                  title: "The Conditions Schema",
                  items: {
                    $id:
                      "#/properties/Pages/items/properties/Next/items/properties/Conditions/items",
                    type: "object",
                    title: "The Items Schema",
                    required: ["MustEqual"],
                    properties: {
                      QuestionId: {
                        $id:
                          "#/properties/Pages/items/properties/Next/items/properties/Conditions/items/properties/QuestionId",
                        type: "string",
                        title: "The Questionid Schema",
                        default: "",
                        examples: ["CD-30"],
                        pattern: "^(.*)$"
                      },
                      QuestionTag: {
                        $id:
                          "#/properties/Pages/items/properties/Next/items/properties/Conditions/items/properties/QuestionTag",
                        type: ["string", "null"],
                        title: "The Questiontag Schema",
                        default: null,
                        examples: [null]
                      },
                      MustEqual: {
                        $id:
                          "#/properties/Pages/items/properties/Next/items/properties/Conditions/items/properties/MustEqual",
                        type: "string",
                        title: "The Mustequal Schema",
                        default: "",
                        examples: ["Yes"],
                        pattern: "^(.*)$"
                      }
                    }
                  }
                },
                ConditionMet: {
                  $id:
                    "#/properties/Pages/items/properties/Next/items/properties/ConditionMet",
                  type: "boolean",
                  title: "The Conditionmet Schema",
                  default: false,
                  examples: [false]
                }
              }
            }
          },
          Complete: {
            $id: "#/properties/Pages/items/properties/Complete",
            type: "boolean",
            title: "The Complete Schema",
            default: false,
            examples: [false]
          },
          AllowMultipleAnswers: {
            $id: "#/properties/Pages/items/properties/AllowMultipleAnswers",
            type: "boolean",
            title: "The Allowmultipleanswers Schema",
            default: false,
            examples: [false]
          },
          Order: {
            $id: "#/properties/Pages/items/properties/Order",
            type: "null",
            title: "The Order Schema",
            default: null,
            examples: [null]
          },
          Active: {
            $id: "#/properties/Pages/items/properties/Active",
            type: "boolean",
            title: "The Active Schema",
            default: false,
            examples: [true]
          },
          NotRequiredConditions: {
            $id: "#/properties/Pages/items/properties/NotRequiredConditions",
            type: "array",
            title: "The Notrequiredconditions Schema"
          },
          BodyText: {
            $id: "#/properties/Pages/items/properties/BodyText",
            type: "string",
            title: "The Bodytext Schema",
            default: "",
            examples: [""],
            pattern: "^(.*)$"
          },
          Details: {
            $id: "#/properties/Pages/items/properties/Details",
            type: ["object", "null"],
            title: "The Details Schema",
            default: null,
            examples: [null]
          },
          DisplayType: {
            $id: "#/properties/Pages/items/properties/DisplayType",
            type: "null",
            title: "The Displaytype Schema",
            default: null,
            examples: [null]
          },
          Feedback: {
            $id: "#/properties/Pages/items/properties/Feedback",
            type: "null",
            title: "The Feedback Schema",
            default: null,
            examples: [null]
          },
          ActivatedByPageId: {
            $id: "#/properties/Pages/items/properties/ActivatedByPageId",
            type: ["string", "null"],
            title: "The Activatedbypageid Schema",
            default: null,
            examples: [null]
          }
        }
      }
    }
  }
};
