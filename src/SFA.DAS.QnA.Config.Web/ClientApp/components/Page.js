import { Field } from "react-final-form";

import NextPage from "./NextPage";

const Page = props => {
  console.log(props);

  return (
    <>
      <h2>Page</h2>
      <Field
        name={`${props.name}.Title`}
        component="input"
        type="text"
        placeholder="Page title"
      />
      <NextPage name={props.name} />
    </>
  );
};

export default Page;
