import styled from "styled-components";
import Link from "next/link";
import { LargeColumnTitle } from "../../styles/global";

const ListProjectSections = ({ projectData, selectedBranch }) => {
  return (
    <>
      <LargeColumnTitle>{projectData.Name}</LargeColumnTitle>

      <p>{projectData.Description}</p>

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
      ))}
    </>
  );
};

export default ListProjectSections;

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
