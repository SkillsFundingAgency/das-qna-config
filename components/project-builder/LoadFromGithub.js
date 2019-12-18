import Select from "react-select";

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
            <h2>Projects in branch</h2>
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
