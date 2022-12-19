import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const user = localStorage.getItem("token");
  // const [userinfo, setUserInfo] = useState([
  //   { email: null },
  //   { id: null },
  //   { error: null },
  // ]);

  // const fetchUser = async () => {
  //   const { data } = await axios.get("http://localhost:3000/api/login/me");
  //   if (data && data.user) {
  //     setUserInfo([
  //       { email: data.user.email },
  //       { id: data.user.id },
  //       { error: false },
  //     ]);
  //   } else {
  //     setUserInfo([{ email: null }, { id: null }, { error: true }]);
  //   }
  //   console.log(data);
  // };

  // useEffect(() => {
  //   if (user) {
  //     axios.defaults.headers.common["authorization"] = `Bearer ${user}`;
  //     fetchUser();
  //   } else {
  //     setUserInfo([{ email: null }, { id: null }, { error: true }]);
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/income" element={<IncomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
