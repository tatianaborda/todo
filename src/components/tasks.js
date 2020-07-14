import React, { useEffect, useState } from "react";
import TaskForm from "./taskform.js";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Tasks = (props) => {
  const [tasks, setTasks] = useState([]);

  const add = async (taskObject) => {
    await db.collection("tasks").doc().set(taskObject);
    toast("La tarea ha sido agregada", {
      type: "success",
      position: "top-center",
    });
  };

  const getTasks = () => {
    const docs = [];
    db.collection("tasks").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setTasks(docs);
    });
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-light mt-0">
      <div className="col-md-12 p-3">
        <TaskForm add={add} />
      </div>
    </div>
  );
};

export default Tasks;
