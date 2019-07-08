import React, { useState } from "react";

import Radio from "./question-types/Radio";
import Text from "./question-types/Text";
import ComplexRadio from "./question-types/ComplexRadio";

const EditQuestion = ({ location }) => {
  // console.log(location.state.question);

  // const {
  //   Hint,
  //   Input,
  //   Label,
  //   QuestionBodyText,
  //   QuestionId,
  //   QuestionTag,
  //   ShortLabel
  // } = location.state.question;

  // const initialQuestionState = {
  //   Hint: "",
  //   Input: {
  //     Options: [],
  //     Type: "",
  //     Validations: []
  //   },
  //   Label: "",
  //   QuestionBodyText: "",
  //   QuestionId: "",
  //   QuestionTag: "",
  //   ShortLabel: ""
  // };

  const [question, setQuestion] = useState(location.state.question);

  const handleQuestionChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  const handleOptionChange = (optionindex, name, value) => {
    setQuestion({
      ...question,
      Input: {
        ...question.Input,
        Options: question.Input.Options.map((option, index) =>
          index === optionindex
            ? { ...question.Input.Options[optionindex], [name]: value }
            : option
        )
      }
    });
  };

  return (
    <div>
      <h1>Editing question: {question.QuestionId}</h1>
      <div className="qna-form-group">
        <label htmlFor="bodyText">Question body text</label>
        <textarea
          id="bodyText"
          name="QuestionBodyText"
          value={question.QuestionBodyText}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="label">Label</label>
        <input
          id="label"
          name="Label"
          value={question.Label}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="hint">Hint</label>
        <input
          id="hint"
          name="Hint"
          value={question.Hint}
          onChange={handleQuestionChange}
        />
      </div>

      {/* Show correct version of questions based on input type */}
      {
        {
          ComplexRadio: <ComplexRadio />,
          Radio: (
            <Radio
              options={question.Input.Options}
              handleOptionChange={handleOptionChange}
            />
          ),
          text: <Text />
        }[question.Input.Type]
      }

      <h2>Validations</h2>

      {question.Input.Validations.map((validation, index) => (
        <div key={index}>
          <p>Validation type: {validation.Name}</p>
          <p>Error message: {validation.ErrorMessage}</p>
        </div>
      ))}

      {/* {Input.Options.length &&
        Input.Options.map(option => {
          return (
            option.FurtherQuestions &&
            option.FurtherQuestions.map(furtherQuestion => (
              <p key={furtherQuestion.QuestionId}>
                Further question label: {furtherQuestion.Label}
              </p>
            ))
          );

          // return <p>{option.Value}</p>;
        })}
      <div>
        Validations:{" "}
        <ul>
          {Input.Validations.map((validation, index) => (
            <li key={index}>
              <p>
                Type: {validation.Name}
                <br />
                Message: {validation.ErrorMessage}
              </p>
            </li>
          ))}
        </ul>
      </div>{" "} */}
    </div>
  );
};

export default EditQuestion;
