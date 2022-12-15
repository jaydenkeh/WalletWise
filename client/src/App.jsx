import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";

function App() {
  return (
    <Router>
      <div className="navigation-bar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/income">Income</Link>
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
          <Route path="/" element={<HomePage />} />
          <Route path="/income" element={<IncomePage />} />
          {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
