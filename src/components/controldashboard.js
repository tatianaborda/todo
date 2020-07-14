import React from "react";
import Header from "./header.js";
import Tasks from "./tasks.js";
import { ToastContainer } from "react-toastify";

const ControlDashboard = () => {
  return (
    <React.Fragment>
      <Header />
      <Tasks />
      <ToastContainer />
    </React.Fragment>
  );
};
export default ControlDashboard;
