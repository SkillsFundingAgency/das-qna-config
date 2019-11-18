import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
// import ReactJson from "react-json-view";
// import dynamic from "next/dynamic";
// const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

// const GeneratedJson = dynamic(() => import("../../components/GeneratedJson"), {
//   ssr: false
// });

const GeneratedJson = ({ values }) => (
  <div>
    <h3>
      <FontAwesomeIcon icon={faCode} width="0" /> Generated JSON
    </h3>
    <Dump>{JSON.stringify(values, 0, 2)}</Dump>
    {/* <ReactJson
      src={values}
      displayDataTypes={false}
      displayObjectSize={false}
      indentWidth={2}
      name={false}
    /> */}
  </div>
);

export default GeneratedJson;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;
