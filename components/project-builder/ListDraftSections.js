import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { LargeColumnTitle } from "@/styles/global";

const ListDraftSections = ({ selectedBranch }) => {
  const [localStorageItems, setLocalStorageItems] = useState(null);
  const allStorageItems = () => {
    return Object.entries(localStorage).map(item => {
      const key = item[0];
      const value = item[1];
      console.log(`${key}: ${value}`);

      const sectionParams = key.split("__");
      const branch = sectionParams[0];
      const projectId = sectionParams[1];
      const sectionId = sectionParams[2];
      const lastSave = JSON.parse(value).timeOfSave;

      return { key, branch, projectId, sectionId, lastSave };
    });
  };

  useEffect(() => {
    setLocalStorageItems(allStorageItems());
  }, []);

  return <>
    <LargeColumnTitle>Saved draft sections</LargeColumnTitle>
    {localStorageItems &&
      localStorageItems.map(item => {
        const { key, branch, projectId, sectionId, lastSave } = item;
        return (
          <p key={key}>
            <Link
              href={{
                pathname: `/${branch}/${projectId}/${sectionId}`
              }}
              as={`/${branch}/${projectId}/${sectionId}`}
            >

              <span>{branch}</span>/<span>{projectId}</span>/{" "}
              <span>{sectionId}</span>

            </Link>
            <br />
            <span style={{ fontSize: "12px" }}>Last saved: {lastSave}</span>
          </p>
        );
      })}
  </>;
};

export default ListDraftSections;

const SectionList = styled.ul`
  list-style: none;
  padding: 0;

  & > li {
    padding: 0;
    margin-bottom: 5px;
  }
`;

const SectionDetails = styled.p`
  /* text-transform: uppercase; */
  margin-top: 0;
  font-weight: bold;
  font-size: 12px;
`;
