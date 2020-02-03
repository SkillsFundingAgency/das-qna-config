// In here we don't need to fetch the user details from github, but the CODEOWNERS instead
// then we need to test against those with the entered username and some shared password stored in .env

import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  const { username } = await req.body;
  console.log("username", username);
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const { id } = await response.json();
      return res.status(200).json({ token: id });
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
