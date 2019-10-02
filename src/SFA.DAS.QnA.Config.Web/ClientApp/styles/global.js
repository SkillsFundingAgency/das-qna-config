import Head from "next/head";
import styledNormalize from "styled-normalize";

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      ${styledNormalize}

      body {
        font-family: "Helvetica Neue", arial, sans-serif;
      }

      * {
        box-sizing: border-box;
        line-height: 1.3em;
        -webkit-font-smoothing: antialiased;
      }

      a {
        text-decoration: underline;
        color: #145;
      }

      p {
        line-height: 1.6em;
      }

      strong {
        color: #145;
        font-weight: bold;
      }

      input,
      textarea,
      button {
        outline: none;
      }

      button {
        cursor: pointer;
      }
    `}</style>
  </div>
);
