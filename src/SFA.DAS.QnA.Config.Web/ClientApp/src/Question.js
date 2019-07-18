import React from "react";

const Question = ({ question }) => {
  return (
    <div className="qna-question">
      <div>
        <div>
          {question.Label} ({question.Input.Type})
        </div>
      </div>
      <div>{question.QuestionId}</div>
    </div>
  );
};

export default Question;
