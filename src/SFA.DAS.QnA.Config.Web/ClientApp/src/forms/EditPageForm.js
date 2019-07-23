import React, { useState, useEffect } from "react";

const EditPageForm = ({ pageToEdit, section }) => {
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
      <p>Sequence id: {page.SequenceId}</p>
      <p>Section id: {page.SectionId}</p>
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
        <label htmlFor="InfoText">Info text</label>
        <input
          id="InfoText"
          name="InfoText"
          value={page.InfoText}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="BodyText">Body text</label>
        <textarea
          id="BodyText"
          name="BodyText"
          value={page.BodyText}
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
        <label htmlFor="AllowMultipleAnswers">Allow multiple answers</label>
        <input
          id="AllowMultipleAnswers"
          name="AllowMultipleAnswers"
          value={page.AllowMultipleAnswers}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="Active">Active</label>
        <input
          id="Active"
          name="Active"
          value={page.Active}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="NotRequiredOrgTypes">
          Not required organisation types:
        </label>
        <input
          id="NotRequiredOrgTypes"
          name="NotRequiredOrgTypes"
          value={page.NotRequiredOrgTypes.map(orgs => orgs)}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="NotRequired">Not required</label>
        <input
          id="NotRequired"
          name="NotRequired"
          value={page.NotRequired}
          onChange={handleQuestionChange}
        />
      </div>

      <h2>Routes</h2>
      {page.Next.map((nextPage, index) => (
        <div key={index}>
          <p>
            Currently this page will continue to question {nextPage.ReturnId} (
            {
              section.Pages.filter(
                thisPage => thisPage.PageId === nextPage.ReturnId
              )[0].Title
            }
            ) once the form has been submitted and the validation criteria met.
          </p>
          <div className="qna-form-group">
            <label htmlFor="Action">Action</label>
            <input
              id="Action"
              name="Action"
              value={nextPage.Action}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="qna-form-group">
            <label htmlFor="ReturnId">Return id</label>
            <input
              id="ReturnId"
              name="ReturnId"
              value={nextPage.ReturnId}
              onChange={handleQuestionChange}
            />
          </div>
          {nextPage.Condition ? (
            <>
              <h3>Condition</h3>
              <div className="qna-form-group">
                <label htmlFor="QuestionId">Question id</label>
                <input
                  id="QuestionId"
                  name="QuestionId"
                  value={nextPage.Condition.QuestionId}
                  onChange={handleQuestionChange}
                />
              </div>
              <div className="qna-form-group">
                <label htmlFor="MustEqual">Must equal</label>
                <input
                  id="MustEqual"
                  name="MustEqual"
                  value={nextPage.Condition.MustEqual}
                  onChange={handleQuestionChange}
                />
              </div>
              <div className="qna-form-group">
                <label htmlFor="ConditionMet">Condition met</label>
                <input
                  id="ConditionMet"
                  name="ConditionMet"
                  value={nextPage.ConditionMet}
                  onChange={handleQuestionChange}
                />
              </div>
            </>
          ) : null}
        </div>
      ))}

      <button className="govuk-button">Save</button>
    </div>
  );
};

export default EditPageForm;
