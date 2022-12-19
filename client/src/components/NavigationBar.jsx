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
            <Link to="/transactions-history">Transactions History</Link>
          </li>
          <li>
            <Link to="/accounts-overview">Accounts Overview</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
