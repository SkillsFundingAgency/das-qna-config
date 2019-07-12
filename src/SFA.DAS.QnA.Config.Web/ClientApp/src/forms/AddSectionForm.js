import React, { useState } from "react";

const AddSectionForm = ({ addSection }) => {
  const initialFormState = { id: null, name: "", Pages: [] };
  const [section, setSection] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSection({ ...section, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!section.name) return;

    addSection(section);
    setSection(initialFormState);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={section.name}
        onChange={handleInputChange}
      />
      <button>Add section</button>
    </form>
  );
};

export default AddSectionForm;
