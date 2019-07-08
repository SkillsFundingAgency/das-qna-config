import React from "react";
import { Link } from "@reach/router";

const Question = ({ question }) => {
  // console.log(question);

  return (
    <div className="qna-question">
      <div>
        <div>
          <Link to={`/questions/${question.QuestionId}`} state={{ question }}>
            {question.Label}
          </Link>{" "}
          ({question.Input.Type})
        </div>
      </div>
      <div>{question.QuestionId}</div>
    </div>
  );
};

export default Question;
