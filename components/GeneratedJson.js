import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// import ReactJson from "react-json-view";
// import dynamic from "next/dynamic";
// const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

// const GeneratedJson = dynamic(() => import("../../components/GeneratedJson"), {
//   ssr: false
// });

const GeneratedJson = ({ values }) => {
  const [isCopied, setIsCopied] = useState(false);

  const prettyStringValues = JSON.stringify(values, 0, 2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <div>
      <h3>
        <FontAwesomeIcon icon={faCode} width="0" /> Generated JSON
      </h3>

      {isCopied ? (
        <span>Copied to clipboard</span>
      ) : (
        <CopyToClipboard
          text={prettyStringValues}
          onCopy={() => setIsCopied(true)}
        >
          <a href="#">Copy to clipboard</a>
        </CopyToClipboard>
      )}
      <Dump>{prettyStringValues}</Dump>

      {/* <ReactJson
      src={values}
      displayDataTypes={false}
      displayObjectSize={false}
      indentWidth={2}
      name={false}
    /> */}
    </div>
  );
};

export default GeneratedJson;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;
