import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contenedores = (props) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    db.collection("tasks").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setTasks(docs);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const moveToInProgress = (id) => {
    db.collection("tasks")
      .doc(id)
      .update({
        state: "in-progress",
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    if (window.confirm("¿Estás seguro que querés mover esta tarea?")) {
      toast("La tarea ha sido movida al tablero IN PROGRESS ", {
        type: "success",
        position: "top-center",
      });
    }
  };
  const moveToDone = (id) => {
    db.collection("tasks")
      .doc(id)
      .update({
        state: "done",
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    if (window.confirm("¿Estás seguro que querés mover esta tarea?")) {
      toast("La tarea ha sido movida al tablero DONE! ", {
        type: "success",
        position: "top-center",
      });
    }
  };
  const moveToDeleted = (id) => {
    db.collection("tasks")
      .doc(id)
      .update({
        state: "deleted",
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    if (window.confirm("¿Estás seguro que querés remover esta tarea?")) {
      toast("La tarea ha sido ELIMINADA", {
        type: "error",
        position: "top-center",
      });
    }
  };
  const toDo = tasks.filter((task) => task.state === "todo");
  const inProgress = tasks.filter((task) => task.state === "in-progress");
  const done = tasks.filter((task) => task.state === "done");
  const deleted = tasks.filter((task) => task.state === "deleted");

  const onDelete = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro que querés eliminar permanentemente esta tarea?"
      )
    ) {
      await db.collection("tasks").doc(id).delete();
      toast("La tarea ha sido ELIMINADA DE FORMA PERMANENTE", {
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-light">
      <div className="card-deck p-4">
        <div className="card text-white bg-secondary">
          <div className="card-header text-center bg-primary  ">To Do</div>
          <div className="card-body">
            <div className="col md-8 p-2">
              {toDo.map((task) => (
                <div className="card border-secondary mb-3" key={task.id}>
                  <div className="card-body text-dark">
                    <div className="d-flex justify-content-between">
                      <h4>{task.title}</h4>
                      <div>
                        <i
                          className="material-icons text-danger"
                          onClick={() => {
                            moveToDeleted(task.id);
                          }}
                        >
                          close
                        </i>
                        <i
                          className="material-icons text-success"
                          onClick={() => {
                            moveToInProgress(task.id);
                          }}
                        >
                          exit_to_app
                        </i>
                      </div>
                    </div>
                    <p>{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card text-white bg-secondary">
          <div className="card-header text-center bg-warning">In Progress</div>
          <div className="card-body">
            <div className="col md-8 p-2">
              {inProgress.map((task) => (
                <div className="card border-secondary mb-3" key={task.id}>
                  <div className="card-body text-dark">
                    <div className="d-flex justify-content-between">
                      <h4>{task.title}</h4>
                      <div>
                        <i
                          className="material-icons text-danger"
                          onClick={() => {
                            moveToDeleted(task.id);
                          }}
                        >
                          close
                        </i>
                        <i
                          className="material-icons text-success"
                          onClick={() => {
                            moveToDone(task.id);
                          }}
                        >
                          exit_to_app
                        </i>
                      </div>
                    </div>
                    <p>{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card text-white bg-secondary">
          <div className="card-header text-center bg-success">Done</div>
          <div className="card-body">
            <div className="col md-8 p-2">
              {done.map((task) => (
                <div className="card border-secondary mb-3" key={task.id}>
                  <div className="card-body text-dark">
                    <div className="d-flex justify-content-between">
                      <h4>{task.title}</h4>
                      <div>
                        <i
                          className="material-icons text-danger"
                          onClick={() => {
                            moveToDeleted(task.id);
                          }}
                        >
                          close
                        </i>
                      </div>
                    </div>
                    <p>{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light mt-2">
        <div className="col-md-12 p-3">
          <div className="card text-white bg-secondary ">
            <div className="card-header text-center bg-danger">Deleted</div>
            <div className="card-body">
              <div className="col md-8 p-2">
                {deleted.map((task) => (
                  <div className="card border-secondary mb-3" key={task.id}>
                    <div className="card-body text-dark">
                      <div className="d-flex justify-content-between">
                        <h4>{task.title}</h4>
                        <div>
                          <i
                            className="material-icons text-danger"
                            onClick={() => {
                              onDelete(task.id);
                            }}
                          >
                            close
                          </i>
                        </div>
                      </div>
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contenedores;
