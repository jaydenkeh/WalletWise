import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="navigation-bar">
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
