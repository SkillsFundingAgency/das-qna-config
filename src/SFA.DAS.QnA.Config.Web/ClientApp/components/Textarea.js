import TextareaAutosize from "react-textarea-autosize";

export default ({ input, label, ...rest }) => {
  return <TextareaAutosize {...input} {...rest} />;
};
