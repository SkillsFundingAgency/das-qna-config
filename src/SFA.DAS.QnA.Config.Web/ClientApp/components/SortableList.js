import React from "react";
import { sortableContainer } from "react-sortable-hoc";

const SortableList = sortableContainer(props => {
  // console.log(props);

  const onSortEnd = info => {
    console.info("sort end", info);
    return onSortEnd(info);
  };

  return <div>{props.children}</div>;
});

export default SortableList;
