import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { sortableContainer } from "react-sortable-hoc";
import SortableList from "../SortableList";

import Page from "./Page";
import SinglePageView from "../page-builder/SinglePageView";

import { EMPTY_PAGE } from "../../data/data-structures";

const Pages = sortableContainer(
  ({
    questions,
    updateCurrentView,
    currentView,
    updateCurrentPage,
    currentPage
  }) => {
    const editSinglePage = pageId => {
      updateCurrentPage(pageId);
      updateCurrentView("page");
    };

    const returnToSection = () => updateCurrentView("section");

    return (
      <Container>
        {currentView === "page" ? (
          <SinglePageView
            currentPage={currentPage}
            returnToSection={returnToSection}
            name={name}
          />
        ) : (
          <FieldArray name="Pages">
            {({ fields }) => {
              return (
                <>
                  <SortableList
                    lockAxis="y"
                    useDragHandle
                    onSortEnd={({
                      oldIndex,
                      newIndex,
                      collection,
                      isKeySorting
                    }) => {
                      return fields.move(oldIndex, newIndex);
                    }}
                  >
                    {fields.map((name, index) => {
                      return (
                        <Page
                          key={name}
                          index={index}
                          name={name}
                          removePage={() =>
                            window.confirm(
                              "Are you sure you wish to delete this page?"
                            ) && fields.remove(index)
                          }
                          questions={questions}
                          editSinglePage={editSinglePage}
                        />
                      );
                    })}
                  </SortableList>
                  <Buttons>
                    <Button
                      type="button"
                      onClick={() => fields.push(EMPTY_PAGE)}
                    >
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
  }
);

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
