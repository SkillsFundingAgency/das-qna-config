import React, { useState } from "react";
import { EMPTY_SECTION } from "./../data-structures";

const AddSectionForm = ({ addSection }) => {
  const [section, setSection] = useState(EMPTY_SECTION);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSection({ ...section, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!section.name) return;

    addSection(section);
    setSection(EMPTY_SECTION);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="qna-form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={section.name}
          onChange={handleInputChange}
        />
      </div>
      <button>Add section</button>
    </form>
  );
};

export default AddSectionForm;
