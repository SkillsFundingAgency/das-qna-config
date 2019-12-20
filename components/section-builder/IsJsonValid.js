import styled from "styled-components";
import { useState, useEffect } from "react";
import Ajv from "ajv";
import { APPLICATION_DATA_SCHEMA } from "../../data/ApplicationDataSchema";

const ajv = new Ajv({ allErrors: true });
const test = ajv.compile(APPLICATION_DATA_SCHEMA);

const IsJsonValid = ({ values }) => {
  const [isValid, setIsValid] = useState(test(values));
  return (
    <>
      {!isValid && test.errors && (
        <Errors>
          <table>
            <caption>JSON schema errors</caption>
            <thead>
              <tr>
                <th>Error type</th>
                <th>Error location</th>
                <th>Error message</th>
                <th>Schema path</th>
                <th>Parameters</th>
              </tr>
            </thead>
            <tbody>
              {test.errors.map((error, index) => {
                // console.log(error);

                return (
                  <tr key={index}>
                    <td>{error.keyword}</td>
                    <td>{error.dataPath}</td>
                    <td>{error.message}</td>
                    <td>{error.schemaPath}</td>
                    <td>{error.params.map}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Errors>
      )}
    </>
  );
};

const Errors = styled.div`
  padding: 15px 15px 10px;
  background: #ab1409;
  color: #fff;
  text-align: left;
  font-size: 13px;

  table {
    border-spacing: 0;
  }

  caption {
    font-size: 20px;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: left;
  }

  tr:last-child > td {
    border-bottom: 0;
  }

  th,
  td {
    padding: 5px 30px 5px 0;
    border-bottom: 1px solid white;
  }
`;

export default IsJsonValid;
