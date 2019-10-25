import { useState } from "react";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Page from "./Page";
import SinglePageView from "./../page-builder/SinglePageView";

import { EMPTY_PAGE } from "./../../data/data-structures";

const Pages = ({ questions }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [showPageBuilder, setShowPageBuilder] = useState(false);

  const editSinglePage = pageId => {
    setCurrentPage(pageId);
    setShowPageBuilder(true);
  };

  return (
    <Container>
      {showPageBuilder ? (
        <SinglePageView currentPage={currentPage} name={name} />
      ) : (
        <FieldArray name="Pages">
          {({ fields }) => {
            // console.log("Page fields:", fields);

            return (
              <>
                {fields.map((name, index) => {
                  // console.log("name:", name);

                  return (
                    <Page
                      key={name}
                      index={index}
                      name={name}
                      removePage={() => fields.remove(index)}
                      questions={questions}
                      editSinglePage={editSinglePage}
                    />
                  );
                })}
                <Buttons>
                  <Button type="button" onClick={() => fields.push(EMPTY_PAGE)}>
                    + Add Page
                  </Button>
                </Buttons>
              </>
            );
          }}
        </FieldArray>
      )}
    </Container>
  );
};

export default Pages;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  padding: 0;
  text-align: left;
`;

const Button = styled.button`
  background: #0b0c0c;
  padding: 5px 8px 6px;
  color: white;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
