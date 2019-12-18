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
  display: flex;
  flex-direction: column;
  height: 100vh;
  h3 {
    text-align: left;
    color: #333;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
  text-align: left;
  background: #222;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Columns = styled.div`
  display: flex;
  flex-flow: row;
  flex-grow: 1;
  overflow-y: auto;
  & > * {
    flex: 1;
    padding: 15px 15px;
    overflow-y: auto;
    border-right: 5px solid #222;

    &:nth-child(even) {
      // background: #f7f7f7;
    }

    &:last-child {
      border-right: 0;
    }
  }
`;

export const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #222;
  font-size: 11px;
  padding: 5px 10px;
  color: white;

  & > * {
    margin: 0;
  }

  a {
    color: #fff;
  }
`;

export const Title = styled.h1`
  margin: 0 auto 0 0;
  font-size: 1.2em;
`;

export const ColumnTitle = styled.h3`
  margin-top: 0;
`;

export const DisplayControls = styled.div`
  // padding-top: 5px;
  margin-left: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Button = styled.button`
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
