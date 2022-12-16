import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// https://kb.objectrocket.com/mongo-db/mongoose-aggregate-sum-1220

function TotalIncomeTable() {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    fetch("/api/income/total")
      .then((response) => response.json())
      .then((data) => setTotal(data));
  }, []);

  return (
    <>
      <table border="1" cellSpacing="0">
        <caption>Total Income</caption>
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {total.map((total) => (
            <tr key={total._id}>
              <td>{total._id}</td>
              {/* fix display to 2d.p. */}
              <td>{total.total}</td>
            </tr>
          ))}
          {/* <tr>
            <td>DBS</td>
            <td>10000</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}

export default TotalIncomeTable;
