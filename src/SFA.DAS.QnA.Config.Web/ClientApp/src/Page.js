import React from "react";
import { H3 } from "govuk-react";

const Page = props => {
  console.log(props);

  return <H3>Page view: {props.pageId}</H3>;
};

export default Page;
