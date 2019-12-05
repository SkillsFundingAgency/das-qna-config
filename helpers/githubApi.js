import fetch from "isomorphic-unfetch";

export const githubFetch = async (
  path,
  username = "SkillsFundingAgency",
  project = "das-qna-api",
  type = "contents"
) => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${project}/${type}${path}`,
    {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );
  return await response.json();
};
