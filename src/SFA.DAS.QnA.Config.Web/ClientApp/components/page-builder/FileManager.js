import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const FileManager = ({ updatePageBuilder, savePageToFile }) => {
  const [filename, setFilename] = useState("");

  const handleFilenameChange = event => {
    setFilename(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    savePageToFile(filename);
  };

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const fileContents = reader.result;
      // setFileContents(reader.result);
      updatePageBuilder(fileContents);
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

  return (
    <>
      <h3>Load a file</h3>
      <Row>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZone className={isDragActive ? "dragging" : undefined}>
            Drop a json file here, or click to select one
            {rejectedFileNames}
          </DropZone>
        </div>
      </Row>

      <h3>Save a file</h3>
      <form onSubmit={handleSubmit}>
        <Row>
          <input type="text" onChange={handleFilenameChange} />
          <InnerText>.json</InnerText>
        </Row>
        <Row>
          <Buttons>
            <Button type="submit">Save</Button>
          </Buttons>
        </Row>
      </form>
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
  margin-bottom: 5px;

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
    margin: 0;
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
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const InnerText = styled.p`
  line-height: 2.4em;
  margin: 0 5px;
`;

export default FileManager;
