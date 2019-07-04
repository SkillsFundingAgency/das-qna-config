import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { H2 } from "govuk-react";

import Example from "./dnd-example/example";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const Section = props => {
  const [data, setData] = useState({ pages: [], loading: true });

  useEffect(() => {
    fetch("/section-example.json")
      .then(response => response.json())
      .then(data => {
        setData({ pages: data.Pages, loading: false });
      });
  }, []);

  return (
    <>
      <div>
        <H2 size="SMALL">Section: {props.sectionId}</H2>
        {props.children}

        {data.pages.map((page, index) => (
          <div key={index} className="qna-page">
            {page.Title}
            <Link to={`page/${page.PageId}`}>Edit</Link>
          </div>
        ))}
      </div>

      <div>
        <DndProvider backend={HTML5Backend}>
          <Example />
        </DndProvider>
      </div>
    </>
  );
};

// const Page = ({ children }) => <div className="qna-page">{children}</div>;

export default Section;
