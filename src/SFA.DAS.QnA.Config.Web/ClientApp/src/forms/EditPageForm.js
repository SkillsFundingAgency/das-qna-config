import React, { useState, useEffect } from "react";

const EditPageForm = ({ pageToEdit, section, updatePage }) => {
  const [page, setPage] = useState(pageToEdit);
  console.log(page);

  useEffect(() => {
    setPage(pageToEdit);
  }, [pageToEdit]);

  // Simple page updating. Uses the "name" attribute to specify which part to update
  const handlePageChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    setPage({ ...page, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    updatePage(page);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Editing page: {page.PageId}</h1>
      <p>Sequence id: {page.SequenceId}</p>
      <p>Section id: {page.SectionId}</p>
      <div className="qna-form-group">
        <label htmlFor="Title">Title</label>
        <input
          id="Title"
          name="Title"
          value={page.Title}
          onChange={handlePageChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="LinkTitle">Link title</label>
        <input
          id="LinkTitle"
          name="LinkTitle"
          value={page.LinkTitle}
          onChange={handlePageChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="InfoText">Info text</label>
        <input
          id="InfoText"
          name="InfoText"
          value={page.InfoText}
          onChange={handlePageChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="BodyText">Body text</label>
        <textarea
          id="BodyText"
          name="BodyText"
          value={page.BodyText}
          onChange={handlePageChange}
        />
      </div>

      {/* <div className="qna-form-group">
        <label htmlFor="Complete">Complete</label>
        <input
          id="Complete"
          name="Complete"
          value={page.Complete}
          onChange={handlePageChange}
        />
      </div> */}
      <div className="qna-form-group">
        <label htmlFor="AllowMultipleAnswers">Allow multiple answers</label>
        <input
          id="AllowMultipleAnswers"
          name="AllowMultipleAnswers"
          value={page.AllowMultipleAnswers}
          onChange={handlePageChange}
        />
      </div>
      {/* <div className="qna-form-group">
        <label htmlFor="Active">Active</label>
        <input
          id="Active"
          name="Active"
          value={page.Active}
          onChange={handlePageChange}
        />
      </div> */}
      <div className="qna-form-group">
        <label htmlFor="NotRequiredOrgTypes">
          Not required organisation types:
        </label>
        <input
          id="NotRequiredOrgTypes"
          name="NotRequiredOrgTypes"
          value={page.NotRequiredOrgTypes.map(orgs => orgs)}
          onChange={handlePageChange}
        />
      </div>
      <div className="qna-form-group">
        <label htmlFor="NotRequired">Not required</label>
        <input
          id="NotRequired"
          name="NotRequired"
          value={page.NotRequired}
          onChange={handlePageChange}
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
              onChange={handlePageChange}
            />
          </div>
          <div className="qna-form-group">
            <label htmlFor="ReturnId">Return id</label>
            <input
              id="ReturnId"
              name="ReturnId"
              value={nextPage.ReturnId}
              onChange={handlePageChange}
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
                  onChange={handlePageChange}
                />
              </div>
              <div className="qna-form-group">
                <label htmlFor="MustEqual">Must equal</label>
                <input
                  id="MustEqual"
                  name="MustEqual"
                  value={nextPage.Condition.MustEqual}
                  onChange={handlePageChange}
                />
              </div>
              <div className="qna-form-group">
                <label htmlFor="ConditionMet">Condition met</label>
                <input
                  id="ConditionMet"
                  name="ConditionMet"
                  value={nextPage.ConditionMet}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : null}
        </div>
      ))}

      <button className="govuk-button">Save</button>
    </form>
  );
};

export default EditPageForm;
