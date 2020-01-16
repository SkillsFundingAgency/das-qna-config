import { useState } from "react";
import { Field } from "react-final-form";

import { OnChange } from "react-final-form-listeners";
import { sortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCaretRight,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import SortHandle from "../SortHandle";

import NotRequiredConditions from "./NotRequiredConditions";
import NextPage from "./NextPage";
import QnaField from "../QnaField";
import Warning from "../Warning";

const Page = sortableElement(({ name, editSinglePage, removePage }) => {
  const [showRoutes, setShowRoutes] = useState(false);

  const handleEditPage = () => {
    editSinglePage(name);
  };

  const toggleRoutes = () => setShowRoutes(prevShowRoutes => !prevShowRoutes);

  const ShowHideRoutes = styled.div`
    margin-bottom: ${showRoutes ? "10px" : 0};
    cursor: pointer;
  `;

  return (
    <>
      <Container>
        {/* <Field name={`${name}.PageId`}>
            {({ input: { name, value } }) => (
              <>
                <h2 name={name} style={{ marginTop: "0" }}>
                  Page {value}
                </h2>
              </>
            )}
          </Field> */}
        <PageControls>
          <SortHandle />
          <EditPageButton icon={faEdit} onClick={handleEditPage} width="0" />
          <RemovePageButton icon={faTrash} onClick={removePage} width="0" />
        </PageControls>
        <Row>
          <QnaField
            name={`${name}.PageId`}
            component="input"
            type="text"
            placeholder="PageId"
          />
          <QnaField
            name={`${name}.ActivatedByPageId`}
            component="input"
            type="text"
            placeholder="Activated by PageId"
          />
          <Field name={`${name}.Active`}>
            {({ input: { onChange } }) => (
              <OnChange name={`${name}.ActivatedByPageId`}>
                {value => onChange(value === null)}
              </OnChange>
            )}
          </Field>
        </Row>
        <Row>
          <QnaField
            name={`${name}.LinkTitle`}
            component="input"
            type="text"
            placeholder="Link title (page)"
          />
        </Row>
        <NotRequiredConditions name={name} />

        <Row>
          <Field name={`${name}.Next`}>
            {({ input }) => {
              // Checks all defined routes for ReturnId
              const undefinedRoutes = input.value.filter(
                route => route.ReturnId === ""
              ).length;

              // All is well (routes defined)
              if (input.value.length && !undefinedRoutes) return false;

              if (!input.value.length) {
                return <Warning>This page has no route defined.</Warning>;
              }

              if (undefinedRoutes) {
                return <Warning>One or more routes have no ReturnId</Warning>;
              }
            }}
          </Field>
        </Row>
        <Row>
          <ShowHideRoutes onClick={toggleRoutes}>
            <ShowHideIcon
              icon={showRoutes ? faCaretDown : faCaretRight}
              width="0"
            />{" "}
            <a>{showRoutes ? "Hide" : "Show"} routes</a>
          </ShowHideRoutes>
        </Row>

        {showRoutes && <NextPage name={name} />}
      </Container>
    </>
  );
});

export default Page;

const Container = styled.div`
  position: relative;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 36px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PageControls = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0px;
  top: 0px;
  border-right: 2px solid #ccc;
  background: #f2f2f2;
`;

const RemovePageButton = styled(FontAwesomeIcon)`
  box-sizing: content-box;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  right: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  color: #800;
`;
const EditPageButton = styled(FontAwesomeIcon)`
  box-sizing: content-box;
  cursor: pointer;
  padding: 5px 0 5px 2px;
  font-size: 16px;
  right: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const ShowHideIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
`;
