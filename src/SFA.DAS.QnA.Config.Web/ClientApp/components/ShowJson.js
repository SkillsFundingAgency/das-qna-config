import styled from "styled-components";

const ShowJson = ({ data }) => (
  <Dump>{JSON.stringify(JSON.parse(data), 0, 2)}</Dump>
);

export default ShowJson;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;
