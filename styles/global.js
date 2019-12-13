import Head from "next/head";
import styledNormalize from "styled-normalize";
import styled from "styled-components";

export const GlobalStyles = () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      ${styledNormalize}

      body {
        font-family: "Helvetica Neue", arial, sans-serif;
        color: #0b0c0c;
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

      .govuk-list {
        padding-left: 20px;
      }

      .govuk-body,
      .govuk-list li {
        font-size: 19px;
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

export const Container = styled.div`
  padding: 0 10px;
  h3 {
    text-align: left;
    color: #333;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 15px;
  text-align: left;
  color: #333;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.5em;
`;

export const DisplayControls = styled.div`
  padding-top: 5px;
`;

export const Columns = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  & > * {
    flex: 1;
    margin: 5px;
    border: 3px solid #ddd;
    border-radius: 3px;
    padding: 0 20px;
    overflow-y: auto;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  background: #0b0c0c;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
