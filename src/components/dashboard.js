import React from "react";
import Contenedores from "./contenedores.js";
import Header from "./header.js";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Header />
      <Contenedores />
      <ToastContainer />
    </React.Fragment>
  );
};
export default Dashboard;
