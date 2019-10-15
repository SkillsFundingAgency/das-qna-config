import { Field } from "react-final-form";
import styled from "styled-components";

import NextPage from "./NextPage";

const Page = ({ name, questions }) => {
  // console.log(props);

  return (
    <>
      <Container>
        <Field name={`${name}.PageId`}>
          {({ input: { name, value } }) => <h2 name={name}>Page {value}</h2>}
        </Field>
        <Row>
          <Field
            name={`${name}.Title`}
            component="input"
            type="text"
            placeholder="Page title"
          />
        </Row>
        <NextPage name={name} questions={questions} />
      </Container>
    </>
  );
};

export default Page;

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 36px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 2px solid #ccc;
    border-radius: 3px;
    &[disabled] {
      background: #eee;
    }
  }

  .required {
    border: 2px solid #d60000;
  }

  & > input {
    margin: 0;
    padding: 9px;
  }

  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 0;
  }
`;
