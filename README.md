**das-qna-config**
# QnA configuration tool

Live url: https://qna-config.apprenticeships.education.gov.uk/

This project uses the React framework: [next.js](https://nextjs.org/)

## Setting up a development environment

### System requirements

To run this application locally you'll need Node.js version 10.13 or later installed. You can check if you already have it by running `node --version` in your terminal. If you don't, you can [install the LTS version](https://nodejs.org/en/download/) from their website.

### Install modules

After cloning the project, in the root directory, which containins `package.json`, run:

```npm install```

or if using yarn:

```yarn```

### Start the application

You can then run:

```npm run dev```

or if using yarn:

```yarn dev```

This will run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deployment

This application will attempt to deploy automatically to Heroku on any push to the master branch. If the deployment fails you maty need to contact DevOps to check the logs or provide you with access to [the Heroku instance](https://dashboard.heroku.com/apps/das-qna-config/).
