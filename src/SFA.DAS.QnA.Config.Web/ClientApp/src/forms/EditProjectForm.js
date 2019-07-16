import React, { useState, useEffect } from "react";

const EditProjectForm = ({ currentProject, updateProject }) => {
  const [project, setProject] = useState(currentProject);

  useEffect(() => {
    setProject(currentProject);
  }, [currentProject]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!project.name) return;
    updateProject(project.id, project);
  };

  return (
    <form onSubmit={onSubmit}>
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
      <button>Edit project</button>
    </form>
  );
};

export default EditProjectForm;
