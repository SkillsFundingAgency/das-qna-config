import React, { useState, useEffect } from "react";

import Radio from "../question-types/Radio";
import Text from "../question-types/Text";
import ComplexRadio from "../question-types/ComplexRadio";

const EditPageForm = ({ pageToEdit }) => {
  // Allow for updating the "question" state
  const [page, setPage] = useState(pageToEdit);

  useEffect(() => {
    setPage(pageToEdit);
  }, [pageToEdit]);

  // Simple page updating. Uses the "name" attribute to specify which part to update
  const handleQuestionChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    setPage({ ...page, [name]: value });
  };

  return (
    <div>
      <h1>Editing page: {page.PageId}</h1>
      <h2>{page.SequenceId}</h2>
      <h2>{page.SectionId}</h2>
      <div className="qna-form-group">
        <label htmlFor="Title">Title</label>
        <textarea
          id="Title"
          name="Title"
          value={page.Title}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="LinkTitle">Link title</label>
        <textarea
          id="LinkTitle"
          name="LinkTitle"
          value={page.LinkTitle}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="InfoText">InfoText</label>
        <input
          id="InfoText"
          name="InfoText"
          value={page.InfoText}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="Complete">Complete</label>
        <input
          id="Complete"
          name="Complete"
          value={page.Complete}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="AllowMultipleAnswers">Complete</label>
        <input
          id="AllowMultipleAnswers"
          name="AllowMultipleAnswers"
          value={page.AllowMultipleAnswers}
          onChange={handleQuestionChange}
        />
      </div>

      <button className="govuk-button">Save</button>
    </div>
  );
};

export default EditPageForm;
