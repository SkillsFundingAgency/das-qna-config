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
import { ColumnTitle } from "../styles/global";
import Warning from "../components/Warning";

const FileManager = ({
  loadSectionData,
  saveSectionToFile,
  saveSectionToGithub,
  commitDetails,
  branch,
  projectId
}) => {
  // console.log(branch, projectId, commitDetails);

  const [filename, setFilename] = useState("");
  const [commit, setCommit] = useState({
    name: "",
    email: "",
    message: "",
    error: false
  });
  // const [showLocalStorageSaves, setShowLocalStorageSaves] = useState(false);

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
      pathname: "/"
    });
  };

  // const toggleLocalStorageSaves = () =>
  //   setShowLocalStorageSaves(!showLocalStorageSaves);

  // const openPage = (key, projectId, sectionId) => {
  //   // Router.push({
  //   //   pathname: `/${projectId}/${sectionId}`,
  //   //   query: { draft: "true" }
  //   // });
  //   const draftSectionData = localStorage.getItem(key);
  //   console.log(draftSectionData);

  //   loadSectionData(draftSectionData);
  // };

  // const AllStorageItems = () => {
  //   return Object.keys(localStorage).map(key => {
  //     const sectionParams = key.split("__");
  //     const projectId = sectionParams[0];
  //     const sectionId = sectionParams[1];

  //     return (
  //       <div key={key}>
  //         <a onClick={() => openPage(key, projectId, sectionId)}>{key}</a>
  //       </div>
  //     );
  //   });
  // };

  return (
    <div>
      <ColumnTitle>
        <FontAwesomeIcon icon={faFolder} width="0" /> File manager
      </ColumnTitle>
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

      <hr />

      {/* <h3>
        <a onClick={toggleLocalStorageSaves}>
          Load a section from localStorage
        </a>
      </h3>
      {showLocalStorageSaves && <AllStorageItems />} */}

      {branch !== "custom" || projectId !== "section" ? (
        <>
          <h3>Save section to GitHub repository</h3>
          {commitDetails ? (
            <>
              <p>
                Updated section saved as a{" "}
                <a target="_blank" href={commitDetails.commit.html_url}>
                  new commit on GitHub
                </a>{" "}
                on the <strong>{branch}</strong> branch.
              </p>
              <p>
                <a
                  target="_blank"
                  href={`https://github.com/SkillsFundingAgency/das-qna-api/compare/${branch}?expand=1`}
                >
                  Compare changes and create pull request
                </a>
              </p>
            </>
          ) : null}
          {commit.error ? <Warning>Please complete all fields</Warning> : null}
          <form onSubmit={handleSaveToGitHub}>
            <Row>
              <label htmlFor="commitName">Name</label>
              <input
                type="text"
                name="name"
                id="commitName"
                onChange={handleCommitChange}
                value={commit.name}
              />
            </Row>
            <Row>
              <label htmlFor="commitEmail">Email</label>
              <input
                type="text"
                name="email"
                id="commitEmail"
                onChange={handleCommitChange}
                value={commit.email}
              />
            </Row>
            <Row>
              <label htmlFor="commitMessage">Commit message</label>
              <input
                type="text"
                name="message"
                id="commitMessage"
                onChange={handleCommitChange}
                value={commit.message}
              />
            </Row>
            <Row>
              <Buttons>
                <Button type="submit">Save to GitHub</Button>
              </Buttons>
            </Row>
          </form>

          <hr />
        </>
      ) : null}

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
      {/* <Row>
        <Buttons>
          <ResetAppButton
            href="#"
            onClick={event =>
              window.confirm(
                "Are you sure you want to reset? This will clear all saves from local storage."
              ) && deleteLocalStorageAutoSave(event)
            }
          >
            <WarningIcon icon={faExclamationCircle} width="0" />
            Delete all drafts and return to projects page
          </ResetAppButton>
        </Buttons>
      </Row> */}
    </div>
  );
};

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
