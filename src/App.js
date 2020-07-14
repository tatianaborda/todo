import React from "react";
import "./firebase";
import "react-toastify/dist/ReactToastify.css";
import ControlDashboard from "./components/controldashboard.js";
import Dashboard from "./components/dashboard.js";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <ul className="nav mt-3">
          <li className="nav-item">
            <Link to="/paneldecontrol" className="nav-link active">
              Panel de control
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Panel de tareas
            </Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" component={Dashboard} exact></Route>
          <Route
            path="/paneldecontrol"
            component={ControlDashboard}
            exact
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
