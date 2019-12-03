import { useState } from "react";
import Link from "next/link";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import base64 from "base-64";

import styled from "styled-components";
import GlobalStyles from "../styles/global";
import { githubFetch } from "./../helpers/githubApi";

import { EMPTY_SECTION } from "./../data/data-structures";

const Projects = ({ initialProjectData, initialBranchData }) => {
  const [branches, setBranches] = useState(initialBranchData);
  console.log("branches:", branches);
  const [projects, setProjects] = useState(initialProjectData);
  const [projectData, setProjectData] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);

  const loadProjectFile = async name => {
    setLoadingProject(true);
    const jsonResponse = await githubFetch(
      `src/SFA.DAS.QnA.Database/projects/${name}/project.json`
    );
    setProjectData(JSON.parse(base64.decode(jsonResponse.content)));
    setLoadingProject(false);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config | Projects</Header>
        <Form
          onSubmit={() => {}}
          initialValues={projects}
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
                  {branches.map((branch, index) => (
                    <div key={index}>
                      <p style={{ marginBottom: "0" }}>
                        <a
                          href="#"
                          onClick={() => loadProjectFile(project.name)}
                        >
                          {branch.name}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {projects
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

                  <Link href="project/empty-section" as="project/empty-section">
                    <Button>Empty section</Button>
                  </Link>
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
                                {section.id}.json | Sequence{" "}
                                {section.SequenceNo} | Section{" "}
                                {section.SectionNo}
                              </SectionDetails>
                            </li>
                          ))}
                        </SectionList>
                      </div>
                    ))}
                  </div>
                ) : null}
                {loadingProject && <h2>Loading...</h2>}
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
  try {
    const branchesJsonResponse = await githubFetch(
      "",
      "SkillsFundingAgency",
      "das-qna-api",
      "branches"
    );
    console.log(branchesJsonResponse);

    const projectsJsonResponse = await githubFetch(
      "src/SFA.DAS.QnA.Database/projects"
    );
    return {
      initialProjectData: projectsJsonResponse,
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
