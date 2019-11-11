import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { sortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SortHandle from "../SortHandle";
import WhenFieldChanges from "./../WhenFieldChanges";
import NotRequiredConditions from "./NotRequiredConditions";
import NextPage from "./NextPage";
import QnaField from "./../QnaField";

const Page = sortableElement(
  ({ name, questions, editSinglePage, removePage }) => {
    const handleEditPage = () => {
      editSinglePage(name);
    };

    return (
      <>
        <Container>
          <Field name={`${name}.PageId`}>
            {({ input: { name, value } }) => (
              <>
                <h2 name={name} style={{ marginTop: "0" }}>
                  Page {value}
                </h2>
              </>
            )}
          </Field>
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
          <NextPage name={name} questions={questions} />
        </Container>
      </>
    );
  }
);

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
