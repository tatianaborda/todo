import React, { useState } from "react";
import { db } from "../firebase";

const TaskForm = (props) => {
  const initialState = {
    title: "",
    description: "",
    state: "todo",
  };

  const [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    const add = async (taskObject) => {
      await db.collection("tasks").doc().set(taskObject);
    };
    e.preventDefault();
    props.add(values);
    setValues({ ...initialState });
  };

  return (
    <div className="bg-light">
      <form
        className="card card-body text-white bg-secondary"
        onSubmit={handleSubmit}
      >
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">title</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            name="title"
            onChange={handleInputChange}
            value={values.title}
          />
        </div>
        <div className="form-group input-group">
          <textarea
            className="form-control"
            name="description"
            rows="3"
            placeholder="Describe la tarea"
            onChange={handleInputChange}
            value={values.description}
          ></textarea>
        </div>
        <button className="btn btn-primary btn-block">Agregar tarea</button>
      </form>
    </div>
  );
};

export default TaskForm;
