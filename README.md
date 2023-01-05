# Questions and Answers Configuration Tool

Live url: https://qna-config.apprenticeships.education.gov.uk/

This project uses the React framework: [next.js](https://nextjs.org/)

## Developer Setup

### Requirements

* To run this application locally you'll need `Node.js` version 10.13 or later installed. You can check if you already have it by running `node --version` in your terminal. If you don't, you can [install the LTS version](https://nodejs.org/en/download/) from their website.
* After cloning the project, in the root directory, which contains `package.json`, run the following commands:

	```npm install```

	or if you are using yarn:

	```yarn```

### Running

* To run the solution:

	You can then run:

	```npm run dev```

	or if using yarn:

	```yarn dev```

	This will run the app in the development mode.

* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Supplementary (Nov 2022)

To run locally use 

```npm install --force```

followed by

```npm audit fix --force```

and to execute in powershell

```$env:NEXT_PUBLIC_GITHUB_TOKEN="<git hub token here>"; npm run dev```
