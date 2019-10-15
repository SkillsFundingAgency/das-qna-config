import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import Select from "./../components/Select";

const Conditions = ({ name, questions }) => {
  return (
    <FieldArray name={`${name}.Conditions`}>
      {({ fields }) => {
        // console.log("Condition fields:", fields);
        {
          return fields.map((name, index) => (
            <div key={index}>
              <Row>
                <InnerText>when</InnerText>
                <Field
                  name={`${name}.QuestionId`}
                  component={TypeSelector}
                  options={questions}
                  isSearchable={true}
                />
                <InnerText>equals</InnerText>
                <Field
                  name={`${name}.MustEqual`}
                  component="input"
                  type="text"
                  placeholder="Must equal"
                />
              </Row>
            </div>
          ));
        }
      }}
    </FieldArray>
  );
};

export default Conditions;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 10px;

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

const TypeSelector = styled(Select)`
  width: 100%;
`;

const InnerText = styled.p`
  line-height: 2.4em;
  margin: 0 5px;
`;
