import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

const WhenFieldChanges = ({ field, becomes, isNotEmpty, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <OnChange name={field}>
        {value => {
          // original logic checks for string match to change other field
          // if (value === becomes) {
          //   onChange(to);
          // }

          // if 'field' is not empty 'set' the other 'to'
          if (isNotEmpty) {
            if (value !== "") {
              onChange(to);
            }
          } else {
            // if 'field' 'value' includes item in 'becomes [], then 'set' the other 'to'
            if (becomes.includes(value)) {
              onChange(to);
            }
          }
        }}
      </OnChange>
    )}
  </Field>
);

// Usage

{
}

WhenFieldChanges.propTypes = {
  field: PropTypes.string.isRequired,
  becomes: PropTypes.any,
  isNotEmpty: PropTypes.bool,
  set: PropTypes.string.isRequired,
  to: PropTypes.any
};

export default WhenFieldChanges;
