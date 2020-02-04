import { useState } from "react";
import Router from "next/router";
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
} from "../utils/github-api";
import { guidGenerator } from "../utils/helper-functions";
import LoadFromGithub from "../components/project-builder/LoadFromGithub";
import ListProjectSections from "../components/project-builder/ListProjectSections";
import ListDraftSections from "../components/project-builder/ListDraftSections";
import LoadingSpinner from "../components/LoadingSpinner";

import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import getHost from "../utils/get-host";

const newSectionId = guidGenerator();

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
            <Link
              href={`custom/section/${newSectionId}`}
              as={`custom/section/${newSectionId}`}
            >
              <Button>New section</Button>
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
          ) : (
            <div>
              <ListDraftSections />
            </div>
          )}
        </Columns>
      </Container>
    </>
  );
};

Projects.getInitialProps = async context => {
  const { token } = nextCookie(context);
  const apiUrl = getHost(context.req) + "/api/restricted";

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/")
      : context.res.writeHead(302, { Location: "/" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token })
      }
    });

    if (response.ok) {
      try {
        const githubUserDetails = await response.json();
        const getAllBranches = await githubFetchBranches();
        return {
          githubUserDetails,
          initialBranchData: getAllBranches.data.repository.refs.edges
        };
      } catch (error) {
        console.error(error);
      }
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export default withAuthSync(Projects);
