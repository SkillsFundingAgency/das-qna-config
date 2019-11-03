import { Field } from "react-final-form";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import NextPage from "./NextPage";

const Page = ({ name, questions, editSinglePage, removePage }) => {
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
          <EditPageButton icon={faEdit} onClick={handleEditPage} width="0" />
          <RemovePageButton icon={faTrash} onClick={removePage} width="0" />
        </PageControls>
        <Row>
          <Field
            name={`${name}.PageId`}
            component="input"
            type="text"
            placeholder="PageId"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.LinkTitle`}
            component="input"
            type="text"
            placeholder="Link title (page)"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.ActivatedByPageId`}
            component="input"
            type="text"
            placeholder="Activated by PageId"
          />

          {/* <Field
            name={`${name}.ActivatedByPageId`}
            component={Select}
            options={EXISTING_PAGES}
            isSearchable={false}
          /> */}
        </Row>
        <NextPage name={name} questions={questions} />
      </Container>
    </>
  );
};

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
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 2px solid #ccc;
    border-radius: 3px;
    &[disabled] {
      background: #eee;
    }
  }

  .required {
    border: 2px solid #d60000;
  }

  & > input {
    margin: 0;
    padding: 9px;
  }

  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 0;
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
