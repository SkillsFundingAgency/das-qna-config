import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: provided => ({
    ...provided,
    border: "2px solid #ccc",
    borderRadius: "3px"
  })
};

const NamedCreatableSelect = ({ input, ...rest }) => {
  const handleChange = option => {
    return option
      ? input.onChange(option.map(opp => opp.value).join(" "))
      : null;
  };

  return (
    <CreatableSelect
      isMulti
      {...input}
      {...rest}
      instanceId={input.name}
      onChange={handleChange}
      value={rest.options.find(option => option.value === input.value)}
      styles={customStyles}
    />
  );
};

export default NamedCreatableSelect;