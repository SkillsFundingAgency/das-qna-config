import React from "react";
// import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Styles from "../components/Styles";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "auto"
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const makeOnDragEndFunction = fields => result => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }
  fields.swap(result.source.index, result.destination.index);
};
let nextId = 1;

const App = () => {
  return (
    <Styles>
      <h1>Array Fields</h1>
      <a href="https://github.com/erikras/react-final-form#-react-final-form">
        Read Docs
      </a>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          company: "Test",
          customers: [
            {
              id: 1,
              firstName: "Greg",
              lastName: "Barnes"
            },
            {
              id: 2,
              firstName: "Tom",
              lastName: "Thompson"
            }
          ]
        }}
        mutators={{ ...arrayMutators }}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop }
          }, // injected from final-form-arrays above
          pristine,
          reset,
          submitting,
          values
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Company</label>
                <Field name="company" component="input" />
              </div>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => push("customers", { id: nextId++ })}
                >
                  Add Customer
                </button>
                <button type="button" onClick={() => pop("customers")}>
                  Remove Customer
                </button>
              </div>
              <FieldArray name="customers">
                {({ fields }) => (
                  <DragDropContext onDragEnd={makeOnDragEndFunction(fields)}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {fields.map((name, index) => (
                            <Draggable
                              key={name}
                              draggableId={name}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Field name={`${name}.id`}>
                                    {({ input: { name, value } }) => (
                                      <label name={name}>Cust. #{value}</label>
                                    )}
                                  </Field>
                                  <Field
                                    name={`${name}.firstName`}
                                    component="input"
                                    placeholder="First Name"
                                  />
                                  <Field
                                    name={`${name}.lastName`}
                                    component="input"
                                    placeholder="Last Name"
                                  />
                                  <span
                                    onClick={() => fields.remove(index)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span>❌</span>
                                  </span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </FieldArray>

              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          );
        }}
      />
    </Styles>
  );
};

export default App;
