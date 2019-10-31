import { Field } from "react-final-form";

const QnaField = ({ emptyType, ...props }) => {
  const identity = value => {
    if (emptyType === "stringType") {
      return value === "" ? "" : value;
    }

    if (emptyType === "nullType") {
      return value === "" ? null : value;
    }
  };

  return <Field parse={identity} {...props} />;
};

export default QnaField;
