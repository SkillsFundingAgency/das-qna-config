import React, { useCallback, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const FileManager = ({ loadSectionData, saveSectionToFile }) => {
  const [filename, setFilename] = useState("");
  const [showLocalStorageSaves, setShowLocalStorageSaves] = useState(false);

  const handleFilenameChange = event => {
    setFilename(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveSectionToFile(filename);
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
    getRootProps,
    getInputProps,
    isDragActive,
    rejectedFiles
  } = useDropzone({ onDrop, accept: "application/json" });

  const rejectedFileNames = rejectedFiles.map(file => (
    <p key={file.path}>{file.name} is not a json file</p>
  ));

  const deleteLocalStorageAutoSave = event => {
    event.preventDefault();
    localStorage.clear();
    Router.push({
      pathname: "/",
      query: { name: "emptied" }
    });
  };

  const toggleLocalStorageSaves = () =>
    setShowLocalStorageSaves(!showLocalStorageSaves);

  const openPage = (key, projectId, sectionId) => {
    // Router.push({
    //   pathname: `/${projectId}/${sectionId}`,
    //   query: { draft: "true" }
    // });
    const draftSectionData = localStorage.getItem(key);
    console.log(draftSectionData);

    loadSectionData(draftSectionData);
  };

  const AllStorageItems = () => {
    return Object.keys(localStorage).map(key => {
      const sectionParams = key.split("__");
      const projectId = sectionParams[0];
      const sectionId = sectionParams[1];

      return (
        <div key={key}>
          <a onClick={() => openPage(key, projectId, sectionId)}>{key}</a>
        </div>
      );
    });
  };

  return (
    <>
      <h3>Load a section from file</h3>
      <Row>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZone className={isDragActive ? "dragging" : undefined}>
            Drop a json file here, or click to select one
            {rejectedFileNames}
          </DropZone>
        </div>
      </Row>

      <h3>
        <a onClick={toggleLocalStorageSaves}>
          Load a section from localStorage
        </a>
      </h3>
      {showLocalStorageSaves && <AllStorageItems />}

      <h3>Save current section to file</h3>
      <form onSubmit={handleSubmit}>
        <Row>
          <input type="text" onChange={handleFilenameChange} />
        </Row>
        <Row>
          <Buttons>
            <Button type="submit">Save</Button>
          </Buttons>
        </Row>
      </form>
      <Row>
        <Buttons>
          <ResetAppButton
            href="#"
            onClick={event =>
              window.confirm(
                "Are you sure you wish to reset? This will clear all saves from local storage."
              ) && deleteLocalStorageAutoSave(event)
            }
          >
            <WarningIcon icon={faExclamationCircle} width="0" />
            Reset and return to projects page
          </ResetAppButton>
        </Buttons>
      </Row>
    </>
  );
};

const DropZone = styled.p`
  border: 2px dashed #ccc;
  padding: 25px;
  margin: 0;

  &.dragging {
    border: 2px dashed #96b7f6;
  }

  &.rejected {
    border: 2px dashed #b50000;
  }
`;

const Row = styled.div`
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

const InnerText = styled.p`
  line-height: 2.4em;
  margin: 0 5px;
`;

export default FileManager;
