import React from "react";

const Radio = props => {
  const handleOptionInputChange = (index, event) => {
    event.preventDefault();
    const { name, value } = event.target;

    props.handleOptionChange(index, name, value);
  };

  return (
    <div>
      <h2>Options</h2>
      {props.options.map((option, index) => (
        <div key={index}>
          <label htmlFor={option.Label}>Option label</label>
          <input
            id={option.Label}
            name="Label"
            value={option.Label}
            onChange={event => handleOptionInputChange(index, event)}
          />
          <label htmlFor={option.Value}>Option value</label>
          <input
            id={option.Value}
            name="Value"
            value={option.Value}
            onChange={event => handleOptionInputChange(index, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default Radio;
