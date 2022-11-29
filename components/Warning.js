import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { WarningContainer } from "../styles/global";

const Warning = ({ children }) => (
  <WarningContainer>
    <FontAwesomeIcon icon={faExclamationTriangle} /> {children}
  </WarningContainer>
);

export default Warning;
