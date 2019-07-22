import React from "react";

const Question = ({ question, editQuestion }) => {
  const handleClick = question => {
    editQuestion(question);
  };
  return (
    <div className="qna-question">
      <div>
        {question.Label} ({question.Input.Type})
      </div>
      <div>{question.QuestionId}</div>
      <button onClick={() => handleClick(question)}>Edit</button>
    </div>
  );
};

export default Question;
