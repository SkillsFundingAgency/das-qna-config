import { useState } from "react";
import Link from "next/link";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

import styled from "styled-components";
import GlobalStyles from "../styles/global";

import { EMPTY_SECTION } from "./../data/data-structures";

const Projects = ({ initialProjectData }) => {
  const [projectData, setProjectData] = useState(initialProjectData.default);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config | Projects</Header>
        <Form
          onSubmit={() => {}}
          initialValues={projectData}
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
            <>
              <Columns>
                <div>
                  <ul>
                    <li>
                      <h2>
                        {projectData.Name} ({projectData.Description})
                      </h2>
                      <ul>
                        {projectData.Workflows.map((workflow, index) => (
                          <li key={index}>
                            <h3>
                              {workflow.Type} ({workflow.Description})
                            </h3>
                            <ul>
                              {workflow.section.map((section, index) => (
                                <li key={section.id}>
                                  <Link
                                    href="/[section.id]"
                                    as={`${section.id}`}
                                  >
                                    <a>{section.name}</a>
                                  </Link>{" "}
                                  (Sequence {section.SequenceNo} / Section{" "}
                                  {section.SectionNo})
                                </li>
                              ))}
                              {/* <button>Add a section</button> */}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* <div>
                  <h2>
                    {projectData.Name} ({projectData.Description})
                  </h2>
                  <FieldArray name="Workflows">
                    {({ fields }) => {
                      return (
                        <>
                          {fields.map((name, index) => {
                            return (
                              <>
                                <p>Workflows {name}</p>
                                <FieldArray name={`${name}.section`}>
                                  {({ fields }) => {
                                    return (
                                      <>
                                        {fields.map((name, index) => {
                                          return <p>Section {name}</p>;
                                        })}
                                      </>
                                    );
                                  }}
                                </FieldArray>
                              </>
                            );
                          })}
                          <Buttons>
                            <Button
                              type="button"
                              onClick={() => fields.push(EMPTY_PAGE)}
                            >
                              + Add Workflow
                            </Button>
                          </Buttons>
                        </>
                      );
                    }}
                  </FieldArray>
                </div> */}
              </Columns>
            </>
          )}
        />
      </Container>
    </>
  );
};

export default Projects;

Projects.getInitialProps = async context => {
  const initialProjectData = await import(`./../data/project.json`);
  return { initialProjectData };
};

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

  &:last-child {
    margin-bottom: 0;
  }
`;

const Buttons = styled.div`
  padding: 0;
  text-align: left;
`;

const Button = styled.button`
  background: #0b0c0c;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
