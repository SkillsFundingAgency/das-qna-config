import Select from "react-select";
import styled from "styled-components";

const customStyles = {
  control: provided => ({
    ...provided,
    border: "2px solid #ccc",
    borderRadius: "3px"
  })
};

const NamedSelect = ({ input, ...rest }) => {
  return (
    <QnASelect
      {...input}
      {...rest}
      instanceId={input.name}
      onChange={option => input.onChange(option.value)}
      value={rest.options.find(option => option.value === input.value)}
      styles={customStyles}
      isSearchable={false}
      captureMenuScroll={false}
    />
  );
};

const QnASelect = styled(Select)`
  width: 100%;
`;

export default NamedSelect;