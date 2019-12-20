import { FormSpy } from "react-final-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const AutoSaveHOC = ({ debounce, values, save }) => {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(autoSave, debounce);
    return () => clearTimeout(timeout);
  }, [values]);

  const autoSave = async () => {
    setSubmitting(true);
    await save(values);
    setSubmitting(false);
  };

  return (
    // submitting && (
    <FixedSave className={submitting ? "is-saving" : undefined}>
      <SaveIcon icon={faSave} width="0" /> Saving
    </FixedSave>
    // )
  );
};

// Make a HOC
const AutoSave = props => (
  <FormSpy
    {...props}
    subscription={{ values: true }}
    component={AutoSaveHOC}
    // onChange={props => {
    //   console.log("Form validity changed to", props);
    // }}
  />
);

export default AutoSave;

const FixedSave = styled.div`
  z-index: 0;
  transition: opacity 0.2s ease-in;
  opacity: 0;
  &.is-saving {
    transition: opacity 0.2s ease-out;
    opacity: 1;
  }
`;

const SaveIcon = styled(FontAwesomeIcon)`
  color: #fff;
`;
