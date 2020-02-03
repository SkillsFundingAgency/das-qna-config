import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Authorization header missing");
  }

  const auth = await req.headers.authorization;

  try {
    const { token } = JSON.parse(auth);
    const url = `https://api.github.com/user/${token}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const js = await response.json();
      console.log(js);

      // Need camelcase in the frontend
      const data = Object.assign({}, { name: js.name }, js);
      console.log(data);

      return res.status(200).json({ data });
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
