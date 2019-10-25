import { H1, Link, GridRow, GridCol } from "govuk-react";
import styled from "styled-components";

const GeneratedSection = ({ schema }) => {
  const { LinkTitle, Title, Pages } = schema;
  return (
    <>
      <Link noVisitedState href="#" style={{ marginBottom: "10px" }}>
        {LinkTitle}
      </Link>
      <Container>
        <H1>{Title}</H1>

        {Pages.map((page, index) => (
          <div key={index}>
            <GridRow>
              <GridCol>
                <Link noVisitedState href="#" style={{ marginBottom: "10px" }}>
                  {page.Title}
                </Link>
              </GridCol>
            </GridRow>
          </div>
        ))}
      </Container>
    </>
  );
};

export default GeneratedSection;

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 25px;
  margin-top: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;
