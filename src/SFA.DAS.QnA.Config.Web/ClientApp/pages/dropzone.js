import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ShowJson from "./../components/ShowJson";

const FileLoader = () => {
  const [fileContents, setFileContents] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const fileContents = reader.result;
      setFileContents(fileContents);
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <DropZone className={isDragActive ? "dragging" : undefined}>
        Drop a json file here, or click to select one
        {rejectedFileNames}
      </DropZone>
      {fileContents && <ShowJson data={fileContents} />}
    </div>
  );
};

const DropZone = styled.p`
  border: 2px dashed #ccc;
  padding: 5px;

  &.dragging {
    border: 2px dashed #96b7f6;
  }

  &.rejected {
    border: 2px dashed #b50000;
  }
`;

export default FileLoader;
