import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";

import styled from "styled-components";
import GlobalStyles from "../styles/global";

import Pages from "./../components/Pages";

const required = value => (value ? undefined : "required");

const Section = ({ data }) => {
  const [section, setSection] = useState(data);
  // console.log("section:", section);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config</Header>
        <Form
          onSubmit={() => {}}
          initialValues={section}
          mutators={{
            ...arrayMutators
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            form: {
              mutators: { push, pop } // injected from final-form-arrays above
            },
            pristine,
            values
          }) => (
            <Columns>
              <form onSubmit={handleSubmit}>
                <h3>Section</h3>
                {/* <GradientBar /> */}

                <Row>
                  <Field name="Description" validate={required}>
                    {({ input, meta }) => (
                      <>
                        <input
                          {...input}
                          type="text"
                          placeholder={
                            meta.error && meta.touched
                              ? `Link title is ${meta.error}`
                              : `Link title`
                          }
                          style={{ width: "100%" }}
                          component="input"
                          className={meta.error && meta.touched && meta.error}
                        />
                      </>
                    )}
                  </Field>
                </Row>
                <Pages />
              </form>

              {/* <div>
                <Dump>{JSON.stringify(values, 0, 2)}</Dump>
              </div> */}

              {/* <div>
                <h3>Preview</h3>
                <GeneratedPage schema={values} /> */}
              {/* <Link href="/section">
              <a title="Section page">Section page</a>
            </Link> */}
              {/* </div>
              {showSchema && (
                <div>
                  <h3>Generated JSON</h3>
                  <Dump>{JSON.stringify(values, 0, 2)}</Dump>
                </div>
              )} */}
            </Columns>
          )}
        />
      </Container>
    </>
  );
};

Section.getInitialProps = async function(context) {
  const { sectionId } = context.query;

  // const data = await import(`../../data/sections/${sectionId}.json`);
  const data = await import(`./../data/sections/section-1.json`);
  console.log(`Show data fetched. Count: ${data.Pages.length} pages`);
  return { data };

  // const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  // const data = await res.json();
};

export default Section;

const Container = styled.div`
  padding: 0 10px;
  h3 {
    text-align: left;
    color: #333;
  }
`;

const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  margin: 5px 15px;
  text-align: left;
  color: #333;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Columns = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  padding-top: 50px;
  & > * {
    flex: 1;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    padding: 0 20px;
    overflow-y: auto;
  }
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

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;
