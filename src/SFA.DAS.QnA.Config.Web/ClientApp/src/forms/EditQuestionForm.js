import React, { useState, useEffect } from "react";

import Radio from "../question-types/Radio";
import Text from "../question-types/Text";
import ComplexRadio from "../question-types/ComplexRadio";

const EditQuestionForm = ({ questionToEdit }) => {
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

  // Allow for updating the "question" state
  const [question, setQuestion] = useState(questionToEdit);

  useEffect(() => {
    setQuestion(questionToEdit);
  }, [questionToEdit]);

  // Simple question updating. Uses the "name" attribute to specify which part to update
  const handleQuestionChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  // More complex question updating. Recieves props from chold component to update nested/array state on the question state object
  const handleOptionChange = (optionindex, name, value) => {
    setQuestion({
      ...question,
      Input: {
        ...question.Input,
        // First loop and find the correct option (using map and index comparison)
        // Then find the correct field to update (using [name] as above)
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
      <h2>{question.Label}</h2>
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
          <div className="qna-form-group">
            <label htmlFor="Name">Validation type</label>
            <input
              id="Name"
              name="Name"
              value={validation.Name}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="qna-form-group">
            <label htmlFor="validation-message">Error message</label>
            <input
              id="ErrorMessage"
              name="ErrorMessage"
              value={validation.ErrorMessage}
              onChange={handleQuestionChange}
            />
          </div>
        </div>
      ))}

      <h2>Routing</h2>

      <button className="govuk-button">Save</button>

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

export default EditQuestionForm;
