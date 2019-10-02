import TextareaAutosize from "react-textarea-autosize";

export default ({ input, ...rest }) => (
  <TextareaAutosize {...input} {...rest} />
);
