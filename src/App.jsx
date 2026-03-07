import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import { Route, Routes } from "react-router-dom";
import AdminPortal from "./Components/Admin/AdminPortal";
import UserPortal from "./Components/User/UserPortal";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
    <ToastContainer autoClose={1500} />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<AdminPortal />} path="/adminportal/*"/>
        <Route element={<UserPortal />} path="/userportal/*"/>
      </Routes>
    </>
  );
};

export default App;
