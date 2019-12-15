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
  <FormSpy {...props} subscription={{ values: true }} component={AutoSaveHOC} />
);

export default AutoSave;

const FixedSave = styled.div`
  z-index: 0;
  font-weight: 800;
  position: fixed;
  top: 8px;
  right: 160px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 5px;
  transition: opacity 0.2s ease-in;
  opacity: 0;

  &.is-saving {
    transition: opacity 0.2s ease-out;
    opacity: 1;
  }
`;

const SaveIcon = styled(FontAwesomeIcon)`
  color: #00703c;
`;
