import React, { useCallback, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faFolder
} from "@fortawesome/free-solid-svg-icons";
import { ColumnTitle } from "@/styles/global";
import Warning from "@/components/Warning";

const FileManager = ({
  loadSectionData,
  saveSectionToFile,
  saveSectionToGithub,
  commitDetails,
  branch,
  projectId
}) => {

  const [filename, setFilename] = useState("");
  const [commit, setCommit] = useState({
    name: "",
    email: "",
    message: "",
    error: false
  });

  const handleFilenameChange = event => {
    setFilename(event.target.value);
  };

  const handleSaveToFile = event => {
    event.preventDefault();
    saveSectionToFile(filename);
  };

  const handleCommitChange = event => {
    event.persist();
    setCommit(inputs => {
      return {
        ...inputs,
        [event.target.name]: event.target.value
      };
    });
  };

  const handleSaveToGitHub = event => {
    event.preventDefault();

    setCommit(inputs => {
      return {
        ...inputs,
        error: !commit.name || !commit.name || !commit.message
      };
    });

    if (!commit.name || !commit.name || !commit.message) return false;

    saveSectionToGithub(commit);
  };

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const fileContents = reader.result;
      // setFileContents(reader.result);
      loadSectionData(fileContents);
    };

    acceptedFiles.forEach(file => reader.readAsText(file));
  }, []);

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: "application/json" });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Errors key={file.path}>
      <p >Cannot upload {file.path}.</p>
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </Errors>
  ));

  const deleteLocalStorageAutoSave = event => {
    event.preventDefault();
    localStorage.clear();
    Router.push({
      pathname: "/"
    });
  };

  return (
    <div>
      <ColumnTitle>
        <FontAwesomeIcon icon={faFolder} width="0" /> File manager
      </ColumnTitle>
      <h3>Load a section from file</h3>
      {fileRejectionItems}
      <Row>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZone className={isDragActive ? "dragging" : undefined}>
            Drop a json file here, or click to select one
          </DropZone>
        </div>
      </Row>

      <hr />

      <h3>Save section to file</h3>
      <form onSubmit={handleSaveToFile}>
        <Row>
          <label>Enter filename</label>
          <input type="text" onChange={handleFilenameChange} />
        </Row>

        <Row>
          <Buttons>
            <Button type="submit">Save to file</Button>
          </Buttons>
        </Row>
      </form>
    </div>
  );
};

const Errors = styled.div`
  border: 2px solid #ff0000;
  padding: 5px;
  margin: 0 0 10px 0;
`;

const DropZone = styled.p`
  border: 2px dashed #ccc;
  padding: 25px;
  margin: 0 0 10px 0;

  &.dragging {
    border: 2px dashed #96b7f6;
  }

  &.rejected {
    border: 2px dashed #b50000;
  }
`;

const Row = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 2px solid #ccc;
    border-radius: 3px;
    &[disabled] {
      background: #eee;
    }
  }

  .required {
    border: 2px solid #d60000;
  }

  & > input {
    margin: 0 0 10px 0;
    padding: 9px;
  }

  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 0;
  }

  & > label {
    position: absolute;
    top: -6px;
    left: 10px;
    padding: 0 1px;
    line-height: 1;
    font-size: 11px;
    font-weight: bold;
    color: #555555;
    background: #fff;
  }
`;

const Buttons = styled.div`
  padding: 0;
  text-align: left;
`;

const Button = styled.button`
  background: #0b0c0c;
  margin-bottom: 10px;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const ResetAppButton = styled(Button)`
  margin-top: 30px;
  padding: 8px;
  font-size: 16px;
  background: #ab1409;
  opacity: 0.9;
`;

const WarningIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  margin-right: 8px;
`;

export default FileManager;
