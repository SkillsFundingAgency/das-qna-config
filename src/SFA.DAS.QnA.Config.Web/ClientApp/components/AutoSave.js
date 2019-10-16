import { FormSpy } from "react-final-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
// import diff from "object-diff";

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
// This is not the only way to accomplish auto-save, but it does let us:
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
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

/* 
  BELOW IS THE OLD CLASS BASED VERSION WHICH HAS BEEN 
  REFACTORED INTO A FUNTIONAL COMPONENT USING HOOKS (above)
*/

// class AutoSave extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { values: props.values, submitting: false };
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.timeout) {
//       clearTimeout(this.timeout);
//     }
//     this.timeout = setTimeout(this.autoSave, this.props.debounce);
//   }

//   autoSave = async () => {
//     if (this.promise) {
//       await this.promise;
//     }
//     const { values, save } = this.props;

//     // This diff step is totally optional
//     // const difference = diff(this.state.values, values);
//     // if (Object.keys(difference).length) {
//       // values have changed
//       this.setState({ submitting: true, values });
//       this.promise = save(difference);
//       await this.promise;
//       delete this.promise;
//       this.setState({ submitting: false });
//     // }
//   };

//   render() {
//     // This component doesn't have to render anything, but it can render
//     // submitting state.
//     return this.state.submitting && <div className="submitting">Saving...</div>;
//   }
// }
