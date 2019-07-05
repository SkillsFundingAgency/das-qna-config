import React from "react";

const EditQuestion = ({ location }) => {
  console.log(location.state);

  const handleQuestionChange = event => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const {
    QuestionId,
    Input,
    Label,
    QuestionBodyText
  } = location.state.question;

  return (
    <div>
      <h1>Editing question: {QuestionId}</h1>
      <p>Question type: {Input.Type}</p>
      <div className="qna-form-group">
        <label htmlFor="bodyText">Question body text</label>
        <input
          id="bodyText"
          value={QuestionBodyText}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="label">Label</label>
        <input id="label" value={Label} onChange={handleQuestionChange} />
      </div>
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
      </div>
    </div>
  );
};

export default EditQuestion;
