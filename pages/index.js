import { useState } from "react";
import Link from "next/link";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import base64 from "base-64";

import styled from "styled-components";
import Select from "react-select";
import GlobalStyles from "../styles/global";
import { githubFetch } from "../helpers/githubApi";
import LoadingSpinner from "../components/LoadingSpinner";

import { EMPTY_SECTION } from "../data/data-structures";

const Projects = ({ initialBranchData }) => {
  const [branches, setBranches] = useState(initialBranchData);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [projectsInBranch, setProjectsInBranch] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  const listProjectsInBranch = async selectedBranch => {
    setLoading(true);
    setSelectedBranch(selectedBranch.value);
    try {
      const projectsJsonResponse = await githubFetch(
        `/src/SFA.DAS.QnA.Database/projects?ref=${selectedBranch.value}`
      );
      setProjectsInBranch(projectsJsonResponse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loadProjectFile = async name => {
    setLoading(true);
    const jsonResponse = await githubFetch(
      `/src/SFA.DAS.QnA.Database/projects/${name}/project.json?ref=${selectedBranch}`
    );
    setProjectData(JSON.parse(base64.decode(jsonResponse.content)));
    setLoading(false);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config | Projects</Header>
        {/* <Form
          onSubmit={() => {}}
          initialValues={projects.projectsInBranch}
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
            <> */}
        <Columns>
          <div>
            <Link href="project/empty-section" as="project/empty-section">
              <Button>Create empty section</Button>
            </Link>
            <h2>Branches on das-qna-api</h2>
            <Select
              name="branchSelector"
              value={selectedBranch}
              options={branches.map((branch, index) => ({
                label: branch.name,
                value: branch.name
              }))}
              onChange={listProjectsInBranch}
              isSearchable={true}
            />
            {projectsInBranch &&
            projectsInBranch.message !== "Not Found" &&
            !loading ? (
              <div>
                <h2>Projects in {selectedBranch}</h2>
                {projectsInBranch
                  .filter(project => project.type === "dir")
                  .map((project, index) => (
                    <div key={index}>
                      <h1 style={{ marginBottom: "0" }}>
                        <a
                          href="#"
                          onClick={() => loadProjectFile(project.name)}
                        >
                          {project.name}
                        </a>
                      </h1>
                      <p style={{ marginTop: "0" }}>{project.path}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <div>
                <h2>No projects found in branch</h2>
              </div>
            )}
            {loading ? <LoadingSpinner /> : null}

            {/* {branches.map((branch, index) => (
              <div key={index}>
                <p style={{ margin: "0 0 5px 0" }}>
                  <a href="#" onClick={() => listProjectsInBranch(branch.name)}>
                    {branch.name}
                  </a>
                </p>
              </div>
            ))} */}
          </div>

          {projectData ? (
            <div>
              <h2>
                {projectData.Name} ({projectData.Description})
              </h2>

              {projectData.Workflows.map((workflow, index) => (
                <div key={index}>
                  <h3>
                    {workflow.Type} ({workflow.Description})
                  </h3>
                  <SectionList>
                    {workflow.section.map((section, index) => (
                      <li key={section.id}>
                        <Link
                          href="[projectData.id]/[section.id]"
                          as={`${projectData.id}/${section.id}`}
                        >
                          <a>{section.name}</a>
                        </Link>
                        <SectionDetails>
                          {section.id}.json | Sequence {section.SequenceNo} |
                          Section {section.SectionNo}
                        </SectionDetails>
                      </li>
                    ))}
                  </SectionList>
                </div>
              ))}
            </div>
          ) : null}
        </Columns>
        {/* </>
          )}
        /> */}
      </Container>
    </>
  );
};

export default Projects;

Projects.getInitialProps = async context => {
  try {
    const branchesJsonResponse = await githubFetch(
      "",
      "SkillsFundingAgency",
      "das-qna-api",
      "branches"
    );
    console.log(branchesJsonResponse);
    return {
      initialBranchData: branchesJsonResponse
    };
  } catch (error) {
    console.error(error);
  }

  // const initialProjectData = await import(`./../data/project.json`);
  // return { initialProjectData };
};

const SectionList = styled.ul`
  list-style: none;
  padding: 0;

  & > li {
    padding: 0;
    margin-bottom: 5px;
  }
`;

const SectionDetails = styled.p`
  /* text-transform: uppercase; */
  margin-top: 0;
  font-weight: bold;
  font-size: 12px;
`;

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
  margin-top: 20px;
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
