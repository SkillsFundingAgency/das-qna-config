import fetch from "isomorphic-unfetch";

const githubApi = async query => {
  const response = await fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });
  return await response.json();
};

// Returns a list of branches in repo
export const githubFetchBranches = async () => {
  const query = `{
    repository(owner: "SkillsFundingAgency", name: "das-qna-api") {
      refs(refPrefix: "refs/heads/", first: 99, orderBy: {field: TAG_COMMIT_DATE, direction: ASC}) {
        totalCount
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }`;

  return githubApi(query);
};

// Example arguments:  githubFetchFileContents("master", "README.md")
export const githubFetchFileContents = async (branch, path) => {
  const query = `{
      repository(owner: "SkillsFundingAgency", name: "das-qna-api") {
        object(expression: "${branch}:${path}") {
          ... on Blob {
            text
          }
        }
      }
    }`;

  return githubApi(query);
};

// Example arguments:  githubFetchFolderContents("master", "src/SFA.DAS.QnA.Database/projects")
export const githubFetchFolderContents = async (branch, path) => {
  const query = `{
    repository(owner: "SkillsFundingAgency", name: "das-qna-api") {
      object(expression: "${branch}:${path}") {
        ... on Tree {
          entries {
            name
            type
          }
        }
      }
    }
  }`;

  return githubApi(query);
};
