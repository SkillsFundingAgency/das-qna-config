import { FormSpy } from "react-final-form";
import { useState, useEffect } from "react";
import styled from "styled-components";

const AutoSave = ({ debounce, values, save }) => {
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
    <FixedSave className={submitting ? "is-saving" : undefined}>
      Saving...
    </FixedSave>
  );
};

// Make a HOC
export default props => (
  <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />
);

const FixedSave = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 5px;
  transition: opacity 0.3s ease-in;
  opacity: 0;

  &.is-saving {
    transition: opacity 0.3s ease-in;
    opacity: 1;
  }
`;
