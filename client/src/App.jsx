import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      {user && <Route path="/home" element={<HomePage />} />}
      <Route path="/home" element={<Navigate replace to="/login" />} />
      <Route path="/income" element={<IncomePage />} />
    </Routes>
  );
}

export default App;
