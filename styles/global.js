import styled from "styled-components";

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
    text-decoration: underline;
    &:hover {
      text-decoration: none;
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

export const LargeColumnTitle = styled.h2`
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

export const BrowserTab = styled.div`
  display: inline-block;
  font-size: 14px;
  margin-bottom: -4px;
  padding: 8px 10px;
  background: #f1f1f1;
  border-radius: 6px 6px 0 0;
  color: #0b0c0c;
`;

export const PreviewContainer = styled.div`
  border: 4px solid #f1f1f1;
  padding: 25px;
`;

export const WarningContainer = styled.div`
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #d60000;
`;
