import React from "react";
import Question from "./Question";
import { ArcherElement } from "react-archer";

const conditionalQuestions = [];

const Page = ({ page, editPage }) => {
  // console.log(props);

  const handleClick = page => {
    editPage(page);
  };

  const { PageId, Title, LinkTitle, Next, Questions } = page;

  const pageRelations = Next.map((nextPage, index) => {
    if (nextPage.Action !== "NextPage") return false;

    const relations = {
      targetId: `page-${nextPage.ReturnId}`,
      sourceAnchor: "bottom",
      targetAnchor: "top"
    };

    if (nextPage.Condition) {
      relations.label = (
        <div className="label-style">{nextPage.Condition.MustEqual}</div>
      );
      conditionalQuestions.push(parseInt(PageId) + 1);
    }

    return relations;
  });

  // if (section) {
  //   const inlinePages = section.Pages.map(page => page.Next).filter(
  //     nextPage => nextPage.length > 1
  //   );
  //   const flatInlinePages = [].concat(...inlinePages);
  //   const returnIds = flatInlinePages.map(flatPages => flatPages.ReturnId);
  //   const uniqueIds = [...new Set(returnIds)];
  // }

  return (
    <div
      className={
        conditionalQuestions.includes(parseInt(PageId))
          ? "page-style--inline"
          : "page-style"
      }
    >
      <ArcherElement id={`page-${PageId}`} relations={pageRelations}>
        <div className="box-style">
          {Title}
          <br />
          Page ID: {PageId}
          <button onClick={() => handleClick(page)}>Edit</button>
        </div>
      </ArcherElement>
    </div>

    // <div className="qna-page">
    //   <div className="qna-page__header">
    //     <div>
    //       <h2>{LinkTitle}</h2>
    //       <span>{Title}</span>
    //     </div>
    //     <div>Page ID: {PageId}</div>
    //     <button onClick={() => handleClick(props.page)}>Edit</button>
    //   </div>
    //   <div className="qna-page__body">
    //     {Questions.map(question => (
    //       <Question
    //         key={question.QuestionId}
    //         question={question}
    //         editQuestion={props.editQuestion}
    //       />
    //     ))}
    //   </div>
    //   <div className="qna-page__footer">
    //     {Next.length === 1 ? "Next page: " : "Possible routes: "}
    //     {Next.map((nextPage, index) => (
    //       <span key={index}>
    //         {index !== 0 ? " or " : ""}
    //         {nextPage.ReturnId}
    //       </span>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Page;
