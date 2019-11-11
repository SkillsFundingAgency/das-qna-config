import { Field } from "react-final-form";
import { MultiChoice, Radio, FormGroup } from "govuk-react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

const GovRadio = ({ input, hint, inline, label }) => {
  // console.log(input);

  return (
    <Radio {...input} hint={hint} inline={inline}>
      {label}
    </Radio>
  );
};

const RadioQuestion = ({ question, questionIndex }) => {
  return (
    <FormGroup>
      {question.Input.Options && (
        <div>
          <MultiChoice label={question.Label} hint={question.Hint}>
            {question.Input.Options.map((option, index) => {
              return (
                <Field
                  key={`${question.QuestionId}[${questionIndex}][${index}]`}
                  name={`${question.QuestionId}[${questionIndex}]`}
                  type="radio"
                  component={GovRadio}
                  hint={ReactHtmlParser(option.HintText)}
                  inline={question.Input.Options.length <= 2}
                  label={option.Label}
                  value={option.Value}
                />
              );
            })}
          </MultiChoice>
        </div>
      )}
    </FormGroup>
  );
};

export default RadioQuestion;

// const required = value => (value ? undefined : "Required");

// const RadioGroup = ({ label, hint, options, inline, input, meta }) => {
//   // console.log("options:", options);
//   return (
//     <div>
//       <MultiChoice label={label} hint={hint} meta={meta}>
//         {options.map(option => {
//           console.log("option:", option);
//           console.log("input:", input);

//           return (
//             <Radio
//               key={option.value}
//               {...input}
//               value={option.value}
//               inline={inline}
//               checked={option.value === input.value}
//             >
//               {option.title}
//             </Radio>
//           );
//         })}
//       </MultiChoice>
//     </div>
//   );
// };

// RadioGroup.defaultProps = {
//   input: {},
//   meta: {},
//   hint: undefined,
//   inline: false,
//   options: {}
// };

// RadioGroup.propTypes = {
//   input: PropTypes.shape({}),
//   meta: PropTypes.shape({}),
//   label: PropTypes.string.isRequired,
//   hint: PropTypes.string,
//   inline: PropTypes.bool,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       value: PropTypes.string
//     })
//   )
// };

// export default ({ question, questionIndex }) => {
//   // console.log("question:", question);

//   return (
//     <FormGroup>
//       {question.Input.Options && (
//         <Field
//           name={`${question.QuestionId}[${questionIndex}]`}
//           label={question.Label}
//           hint={question.Hint}
//           component={RadioGroup}
//           type="radio"
//           options={
//             question.Input.Options
//               ? question.Input.Options.map(answer => ({
//                   title: answer.Label,
//                   value: answer.Value
//                 }))
//               : []
//           }
//           // validate={required}
//           inline
//         />
//       )}
//     </FormGroup>
//   );
// };
