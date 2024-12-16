import { H1, Link, GridRow, GridCol } from "govuk-react";
import styled from "styled-components";
import { ColumnTitle } from "@/styles/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { PreviewContainer, BrowserTab } from "@/styles/global";
import ReactHtmlParser from "react-html-parser";

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
      {LinkTitle && <BrowserTab>{LinkTitle}</BrowserTab>}
      <PreviewContainer>
        <H1>{ReactHtmlParser(Title)}</H1>

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

const GridColFlex = styled(GridCol)`
  display: flex;
  justify-content: space-between;
`;

const PageId = styled.span`
  font-weight: bold;
  color: #555;
`;
