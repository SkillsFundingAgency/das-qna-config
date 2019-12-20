import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

const ListDraftSections = ({ selectedBranch }) => {
  const [localStorageItems, setLocalStorageItems] = useState(null);
  const allStorageItems = () => {
    return Object.keys(localStorage).map(key => {
      const sectionParams = key.split("__");
      const branch = sectionParams[0];
      const projectId = sectionParams[1];
      const sectionId = sectionParams[2];

      return { key, branch, projectId, sectionId };
    });
  };

  useEffect(() => {
    setLocalStorageItems(allStorageItems());
  }, []);

  // useEffect(() => {}, [localStorageItems]);

  return (
    <>
      {localStorageItems &&
        localStorageItems.map(item => {
          const { key, branch, projectId, sectionId } = item;
          return (
            <p key={key}>
              <Link
                href={{
                  pathname: `/${branch}/${projectId}/${sectionId}`
                  // query: { type: "draft" }
                }}
              >
                <a>
                  <span>{branch}</span> / <span>{projectId}</span> /{" "}
                  <span>{sectionId}</span>
                </a>
              </Link>
            </p>
          );
        })}

      {/* <h2>
        {projectData.Name} ({projectData.Description})
      </h2>

      {projectData.Workflows.map((workflow, index) => (
        <div key={index}>
          <h3>
            {workflow.Type} ({workflow.Description})
          </h3>
          <SectionList>
            {workflow.section.map((section, index) => (
              <li key={section.id}>
                <Link
                  href="[selectedBranch]/[projectData.id]/[section.id]"
                  as={`${selectedBranch}/${projectData.id}/${section.id}`}
                >
                  <a>{section.name}</a>
                </Link>
                <SectionDetails>
                  {section.id}.json | Sequence {section.SequenceNo} | Section{" "}
                  {section.SectionNo}
                </SectionDetails>
              </li>
            ))}
          </SectionList>
        </div>
      ))} */}
    </>
  );
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
