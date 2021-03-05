import Select from "react-select";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder
} from "@fortawesome/free-solid-svg-icons";

const LoadFromGithub = ({
  selectedBranch,
  branches,
  projectsInBranch,
  listProjectsInBranch,
  loadProjectFile,
}) => {
  return (
    <>
      <h2>Branches on das-qna-api</h2>
      <Select
        name="branchSelector"
        instanceId="branchSelector"
        value={{
          label: selectedBranch || "Type or select a branch name...",
          value: selectedBranch
        }}
        options={branches.map((branch, index) => ({
          label: branch.node.name,
          value: branch.node.name
        }))}
        onChange={listProjectsInBranch}
        isSearchable={true}
        captureMenuScroll={false}
      />

      <>
        {projectsInBranch && projectsInBranch !== "Not loaded" ? (
          <>
            <BranchTitle>Project folders in {selectedBranch}</BranchTitle>
            {projectsInBranch.entries
              .filter(project => project.type === "tree")
              .map((project, index) => (
                  <ProjectTitle key={index}>
                    <a href="#" onClick={() => loadProjectFile(project.name)}>
                    <ProjectFolderIcon icon={faFolder} width="0" />
                    {project.name}
                    </a>
                  </ProjectTitle>
              ))}
          </>
        ) : projectsInBranch !== "Not loaded" ? (
          <h2>No projects in branch</h2>
        ) : null}
      </>
    </>
  );
};

export default LoadFromGithub;

const BranchTitle = styled.h2`
  word-break: break-all;
`;

const ProjectTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 2px;
`;

const ProjectLink = styled.p`
  margin-top: 0;
`;

const ProjectFolderIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`
