import { H1, Link, GridRow, GridCol } from "govuk-react";
import styled from "styled-components";
import { ColumnTitle } from "../../styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const GeneratedSection = ({ schema, updateCurrentPage, updateCurrentView }) => {
  const { LinkTitle, Title, Pages } = schema;

  const editPage = pageId => {
    updateCurrentPage(pageId);
    updateCurrentView("page");
  };

  return (
    <div>
      <ColumnTitle>
        <FontAwesomeIcon icon={faFileAlt} width="0" /> Preview
      </ColumnTitle>
      <Link noVisitedState href="#" style={{ marginBottom: "10px" }}>
        {LinkTitle}
      </Link>
      <PreviewContainer>
        <H1>{Title}</H1>

        {Pages &&
          Pages.map((page, index) => (
            <div key={index}>
              <GridRow mb="1">
                <GridColFlex>
                  <Link
                    noVisitedState
                    href="#"
                    onClick={() => editPage(`Pages[${index}]`)}
                  >
                    {page.LinkTitle}
                  </Link>
                  <PageId>{page.PageId}</PageId>
                </GridColFlex>
              </GridRow>
              <GridRow mb="1">
                <GridCol>
                  <hr />
                </GridCol>
              </GridRow>
            </div>
          ))}
      </PreviewContainer>
    </div>
  );
};

export default GeneratedSection;

const PreviewContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 25px;
  margin-top: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const GridColFlex = styled(GridCol)`
  display: flex;
  justify-content: space-between;
`;

const PageId = styled.span`
  font-weight: bold;
  color: #555;
`;
