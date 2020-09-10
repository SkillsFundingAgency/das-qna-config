import TextareaAutosize from "react-textarea-autosize";

const Textarea = ({ input, label, ...rest }) => {
  return <TextareaAutosize {...input} {...rest} />;
};

export default Textarea;