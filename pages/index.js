import { useState } from "react";
import Link from "next/link";
import {
  GlobalStyles,
  Container,
  Header,
  Title,
  DisplayControls,
  Columns,
  Button
} from "../styles/global";
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
        <Header>
          <Title>QnA Config | Projects</Title>
          <DisplayControls>
            {loading ? <LoadingSpinner /> : null}
          </DisplayControls>
        </Header>
        <Columns>
          <div>
            <Link href="branch/project/custom" as="branch/project/custom">
              <Button>Create custom section</Button>
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
