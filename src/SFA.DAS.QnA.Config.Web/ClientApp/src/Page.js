import React from "react";
import Question from "./Question";

const Page = props => {
  // console.log(props);

  const handleClick = page => {
    props.editPage(page);
  };

  const { PageId, Title, LinkTitle, Next, Questions } = props.page;
  return (
    <div className="qna-page">
      <div className="qna-page__header">
        <div>
          <h2>{LinkTitle}</h2>
          <span>{Title}</span>
        </div>
        <div>Page ID: {PageId}</div>
        <button onClick={() => handleClick(props.page)}>Edit</button>
      </div>
      <div className="qna-page__body">
        {Questions.map(question => (
          <Question
            key={question.QuestionId}
            question={question}
            editQuestion={props.editQuestion}
          />
        ))}
      </div>
      <div className="qna-page__footer">
        {Next.length === 1 ? "Next page: " : "Possible routes: "}
        {Next.map((nextPage, index) => (
          <span key={index}>
            {index !== 0 ? " or " : ""}
            {nextPage.ReturnId}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Page;
