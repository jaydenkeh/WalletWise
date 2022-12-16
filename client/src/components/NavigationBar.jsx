import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="navigation-bar">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/income">Income</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
