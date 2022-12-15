import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IncomeTable() {
  return (
    <table border="1">
      <caption>Public Holidays</caption>
      <thead>
        <tr>
          <th>Account</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DBS</td>
          <td>Salary</td>
          <td>4500</td>
          <td>full time job</td>
        </tr>
      </tbody>
    </table>
  );
}

export default IncomeTable;
