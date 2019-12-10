import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import GlobalStyles from "../styles/global";
import {
  githubFetchFileContents,
  githubFetchFolderContents,
  githubFetchBranches
} from "../helpers/githubApi";
import LoadFromGithub from "../components/project-builder/LoadFromGithub";
import ListProjectSections from "../components/project-builder/ListProjectSections";
import LoadingSpinner from "../components/LoadingSpinner";

const Projects = ({ initialBranchData }) => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [projectsInBranch, setProjectsInBranch] = useState("Not loaded");
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  const listProjectsInBranch = async chosenBranch => {
    setLoading(true);
    setSelectedBranch(chosenBranch.value);
    try {
      const projectsFolderContents = await githubFetchFolderContents(
        chosenBranch.value,
        "src/SFA.DAS.QnA.Database/projects"
      );
      setProjectsInBranch(projectsFolderContents.data.repository.object);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loadProjectFile = async name => {
    setLoading(true);
    try {
      const projectsFileContents = await githubFetchFileContents(
        selectedBranch,
        `src/SFA.DAS.QnA.Database/projects/${name}/project.json`
      );
      setProjectData(
        JSON.parse(projectsFileContents.data.repository.object.text)
      );
    } catch (error) {
      console.error(error);
    }
    4;
    setLoading(false);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config | Projects</Header>
        <DisplayControls>{loading ? <LoadingSpinner /> : null}</DisplayControls>
        <Columns>
          <div>
            <Link
              href="branch/project/empty-section"
              as="branch/project/empty-section"
            >
              <Button>Create empty section</Button>
            </Link>

            <LoadFromGithub
              selectedBranch={selectedBranch}
              branches={initialBranchData}
              projectsInBranch={projectsInBranch}
              listProjectsInBranch={listProjectsInBranch}
              loadProjectFile={loadProjectFile}
            />
          </div>

          {projectData ? (
            <div>
              <ListProjectSections
                projectData={projectData}
                selectedBranch={selectedBranch}
              />
            </div>
          ) : null}
        </Columns>
      </Container>
    </>
  );
};

export default Projects;

Projects.getInitialProps = async context => {
  try {
    const getAllBranches = await githubFetchBranches();
    return {
      initialBranchData: getAllBranches.data.repository.refs.edges
    };
  } catch (error) {
    console.error(error);
  }
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

const DisplayControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
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
