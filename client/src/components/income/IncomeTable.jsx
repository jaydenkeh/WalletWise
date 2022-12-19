import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IncomeTable({ entries, setEntries }) {
  const handleDelete = (id) => {
    fetch(`/api/income/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEntries(entries.filter((ele) => ele._id !== id));
      });
  };

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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entries) => (
            <tr key={entries._id}>
              <td>{entries.account}</td>
              <td>{entries.type}</td>
              <td>{entries.amount}</td>
              <td>{entries.description}</td>
              <td>{entries.date}</td>
              {/* https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing-in-popup/ */}
              <td>
                <Link to={`/income/${entries._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(entries._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default IncomeTable;
