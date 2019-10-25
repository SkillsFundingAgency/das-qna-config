import Link from "next/link";
import { useState } from "react";

import styled from "styled-components";
import GlobalStyles from "../styles/global";

function Projects({ data }) {
  // console.log(data.default);

  const [projectData, setProjectData] = useState(data.default);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>QnA Config | Projects</Header>
        <Columns>
          <div>
            <ul>
              {/* <li>
                <Link href="/section-builder">
                  <a>Section builder</a>
                </Link>
              </li>
              <li>
                <Link href="/page-builder">
                  <a>Page builder</a>
                </Link>
              </li> */}
              <li>
                <h2>
                  {projectData.Name} ({projectData.Description})
                </h2>
                <ul>
                  {projectData.Workflows.map((workflow, index) => (
                    <li key={index}>
                      <h3>
                        {workflow.Type} ({workflow.Description})
                      </h3>
                      <ul>
                        {workflow.section.map((section, index) => (
                          <li key={section.id}>
                            <Link href="/[section.id]" as={`${section.id}`}>
                              <a>{section.name}</a>
                            </Link>{" "}
                            (Sequence {section.SequenceNo} / Section{" "}
                            {section.SectionNo})
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </Columns>
      </Container>
    </>
  );
}

export default Projects;

Projects.getInitialProps = async context => {
  const data = await import(`./../data/project.json`);
  return { data };
};

const Container = styled.div`
  padding: 0 10px;
  h3 {
    text-align: left;
    color: #333;
  }
`;

const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  margin: 5px 15px;
  text-align: left;
  color: #333;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Columns = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  padding-top: 50px;
  & > * {
    flex: 1;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    padding: 0 20px;
    overflow-y: auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;
