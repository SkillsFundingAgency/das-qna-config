import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { useRouter } from "next/router";

// import Page from "./Page";

const Pages = ({ questions }) => {
  const router = useRouter();
  console.log("router query: ", router.query);
  return (
    <Container>
      <h2>A page</h2>
      {/* <FieldArray name="Pages">
        {({ fields }) => {
          // console.log("Page fields:", fields);

          return fields.map((name, index) => {
            // console.log("name:", name);

            return (
              <Page
                key={name}
                index={index}
                name={name}
                removePage={() => fields.remove(index)}
                questions={questions}
              />
            );
          });
        }}
      </FieldArray> */}
    </Container>
  );
};

export default Pages;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 20px;
`;
