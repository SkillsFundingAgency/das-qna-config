import React from "react";
import { Field } from "react-final-form";
import { Checkbox, MultiChoice } from "govuk-react";
import PropTypes from "prop-types";

class CheckboxGroup extends React.Component {
  static defaultProps = {
    hint: undefined
  };

  static propTypes = {
    hint: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ).isRequired
  };

  field = ({ input, meta, label, hint, options }) => {
    const { onChange } = input;
    const inputValue = input.value;

    const checkboxes = options.map(({ title, value }) => {
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <Checkbox
          key={value}
          value={value}
          checked={checked}
          onChange={handleChange}
        >
          {title}
        </Checkbox>
      );
    });

    return (
      <MultiChoice label={label} hint={hint} meta={meta}>
        {checkboxes}
      </MultiChoice>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}

export default CheckboxGroup;
