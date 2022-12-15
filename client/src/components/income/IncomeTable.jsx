import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IncomeTable({ entries }) {
  return (
    <>
      <table border="1" cellSpacing="0">
        <caption>Incomes</caption>
        <thead>
          <tr>
            <th>Account</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entries) => (
            <tr key={entries._id}>
              <td>{entries.account}</td>
              <td>{entries.type}</td>
              <td>{entries.amount}</td>
              <td>{entries.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default IncomeTable;
