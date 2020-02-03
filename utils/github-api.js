import fetch from "isomorphic-unfetch";

const githubGraphqlApi = async query => {
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

  return githubGraphqlApi(query);
};

// Example arguments:  githubFetchFileContents("master", "README.md")
export const githubFetchFileContents = async (branch, path) => {
  const query = `{
      repository(owner: "SkillsFundingAgency", name: "das-qna-api") {
        object(expression: "${branch}:${path}") {
          ... on Blob {
            id
            oid
            text
          }
        }
      }
    }`;

  return githubGraphqlApi(query);
};
export const githubFetchFileSha = async (branch, path) => {
  const query = `{
      repository(owner: "SkillsFundingAgency", name: "das-qna-api") {
        object(expression: "${branch}:${path}") {
          ... on Blob {
            oid
          }
        }
      }
    }`;

  return githubGraphqlApi(query);
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

  return githubGraphqlApi(query);
};

export const githubUpdateFile = async (path, branch, values, oid, commit) => {
  const response = await fetch(
    `https://api.github.com/repos/SkillsFundingAgency/das-qna-api/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        branch,
        content: values,
        sha: oid,
        message: commit.message,
        committer: {
          name: commit.name,
          email: commit.email
        }
      })
    }
  );

  return await response.json();
};
