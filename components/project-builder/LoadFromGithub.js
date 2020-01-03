import Select from "react-select";
import styled from "styled-components";

const LoadFromGithub = ({
  selectedBranch,
  branches,
  projectsInBranch,
  listProjectsInBranch,
  loadProjectFile
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
      />

      <>
        {projectsInBranch && projectsInBranch !== "Not loaded" ? (
          <div>
            <BranchTitle>Projects in {selectedBranch}</BranchTitle>
            {projectsInBranch.entries
              .filter(project => project.type === "tree")
              .map((project, index) => (
                <p key={index}>
                  <a href="#" onClick={() => loadProjectFile(project.name)}>
                    {project.name}
                  </a>
                </p>
              ))}
          </div>
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
