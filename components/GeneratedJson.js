import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import ReactJson from "react-json-view";

const GeneratedJson = ({ values }) => (
  <div>
    <h3>
      <FontAwesomeIcon icon={faCode} width="0" /> Generated JSON{" "}
    </h3>
    <ReactJson
      src={values}
      displayDataTypes={false}
      displayObjectSize={false}
      indentWidth={2}
      name={false}
    />
  </div>
);

export default GeneratedJson;
