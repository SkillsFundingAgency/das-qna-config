import React, { useState } from "react";
import { EMPTY_PROJECT } from "./../data-structures";

const AddProjectForm = ({ addProject }) => {
  const [project, setProject] = useState(EMPTY_PROJECT);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!project.name) {
      showError("name");
      return false;
    }
    setIsValid(true);
    addProject(project);
    setProject(EMPTY_PROJECT);
  };

  const showError = () => {
    setIsValid(false);
  };

  return (
    <form onSubmit={onSubmit}>
      {!isValid && <p className="qna-error-message">Enter an name</p>}
      <div className="qna-form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="qna-form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={project.description}
          onChange={handleInputChange}
        />
      </div>
      <button className="govuk-button">Add project</button>
    </form>
  );
};

export default AddProjectForm;
