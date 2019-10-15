import { useState } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
// import fetch from "isomorphic-unfetch";

import styled from "styled-components";
import GlobalStyles from "../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import Pages from "./../components/Pages";

const required = value => (value ? undefined : "required");

const Section = ({ data }) => {
  const [showSchema, setShowSchema] = useState(false);
  const [section, setSection] = useState(data.default);
  // console.log("section:", section);

  const questions = section.Pages.map(
    page =>
      page.Questions &&
      page.Questions.reduce(
        (accumulator, element) => ({
          label: `${element.Label} (${element.QuestionId})`,
          value: element.QuestionId
        }),
        {}
      )
  );

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config</Header>
        <DisplayControls>
          <ToggleCodeView
            icon={faCode}
            onClick={() => setShowSchema(!showSchema)}
            width="0"
          />
        </DisplayControls>
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
                <Pages questions={questions} />
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
              {/* </div> */}
              {showSchema && (
                <div>
                  <h3>Generated JSON</h3>
                  <Dump>{JSON.stringify(values, 0, 2)}</Dump>
                </div>
              )}
            </Columns>
          )}
        />
      </Container>
    </>
  );
};

Section.getInitialProps = async context => {
  // const { sectionId } = context.query;
  if (context.req) {
    const data = await import(`./../data/sections/section-1.json`);
    // const data = await import(`../../data/sections/${sectionId}.json`);
    console.log(`Show data fetched. Count: ${data.Pages.length} pages`);
    return { data };
  } else {
    const data = window.__NEXT_DATA__.props.pageProps.data;
    return { data };
  }
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

const DisplayControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  margin: 5px 15px;
`;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;

const ToggleCodeView = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
