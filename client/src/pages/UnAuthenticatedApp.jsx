import React from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const UnAuthenticatedApp = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default UnAuthenticatedApp;
