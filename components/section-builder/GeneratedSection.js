import { H1, Link, GridRow, GridCol } from "govuk-react";
import styled from "styled-components";

const GeneratedSection = ({ schema, updateCurrentPage, updateCurrentView }) => {
  const { LinkTitle, Title, Pages } = schema;

  const editPage = pageId => {
    updateCurrentPage(pageId);
    updateCurrentView("page");
  };

  return (
    <>
      {LinkTitle && <BrowserTitle>{LinkTitle}</BrowserTitle>}
      <PreviewContainer>
        <H1>{Title}</H1>

        {Pages.map((page, index) => (
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
    </>
  );
};

export default GeneratedSection;

const PreviewContainer = styled.div`
  border: 1px solid #ddd;
  background: #fff;
  padding: 25px;
  margin-top: 5px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
`;

const BrowserTitle = styled.span`
  padding: 7px 15px;
  font-size: 13px;
  background: white;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-bottom: 0px solid white;
  border-radius: 4px 4px 0 0;
`;

const GridColFlex = styled(GridCol)`
  display: flex;
  justify-content: space-between;
`;

const PageId = styled.span`
  font-weight: bold;
  color: #555;
`;
