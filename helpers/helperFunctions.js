export const guidGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return S4() + S4();
};

// groups an array of objects into an object of arrays
// with each key in the object being the value of the
// selected key to group by

export const groupByObjectKey = (arrayOfObjects, keyToGroupBy) => {
  // `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `arrayOfObjects` (the `keyToGroupBy` parameter,
  // returning the `accumulator` parameter at the end
  return arrayOfObjects.reduce((accumulator, item) => {
    // get the first instance of the key by which we're grouping
    const group = item[keyToGroupBy];

    // set `accumulator` for this instance of group to the outer scope (if not empty) or initialize it
    accumulator[group] = accumulator[group] || [];

    // add this item to its group within `accumulator`
    accumulator[group].push(item);

    // return the updated accumulator to the reduce function, which will then loop through the next
    return accumulator;
  }, {});
};

export const findArrayDuplicates = array =>
  array.filter(item => array.indexOf(item) !== array.lastIndexOf(item));

// Example

// const data = [
//   { id: "section1", SectionNo: 1, SequenceNo: 1, name: "Organisation details" },
//   { id: "section2", SectionNo: 2, SequenceNo: 1, name: "Declarations" },
//   {
//     id: "section3",
//     SectionNo: 3,
//     SequenceNo: 1,
//     name: "Financial health assessment"
//   },
//   {
//     id: "section4",
//     SectionNo: 4,
//     SequenceNo: 2,
//     name: "Apply to assess a standard"
//   }
// ];

// const result = groupByObjectKey(data, "SequenceNo")
// console.log(result);
// {
//   1: [
//     {id: "section1", SectionNo: 1, SequenceNo: 1, name: "Organisation details"},
//     {id: "section2", SectionNo: 2, SequenceNo: 1, name: "Declarations"},
//     {id: "section3", SectionNo: 3, SequenceNo: 1, name: "Financial health assessment"}
//   ],
//   2: [
//     {id: "section4", SectionNo: 4, SequenceNo: 2, name: "Apply to assess a standard"}
//   ]
// }
