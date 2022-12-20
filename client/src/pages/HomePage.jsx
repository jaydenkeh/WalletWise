import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import NavigationBar from "../components/NavigationBar";
import TotalIncomeTable from "../components/income/TotalIncomeTable";
import AddEntryForm from "../components/income/AddEntryForm";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

export default function HomePage() {
  const [userinfo, setUserInfo] = UserAuth();
  const [account, setAccount] = useState([]);

  // const data01 = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  //   { name: "Group E", value: 278 },
  //   { name: "Group F", value: 189 },
  // ];

  useEffect(() => {
    fetch("/api/income/total")
      .then((response) => response.json())
      .then((data) => setAccount(data));
  }, []);

  const data01 = account.map(({ _id: name, total: value }) => ({
    name,
    value,
  }));
  console.log(data01);

  return (
    <>
      {userinfo.id && (
        <>
          <div className="home-page">
            <NavigationBar />
            <br />
            HomePage
            <div className="income-wrapper">
              <h3>Income</h3>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={data01}
                  cx={200}
                  cy={200}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
            <div className="expenses-wrapper">
              <h3>Expenses</h3>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={data01}
                  cx={200}
                  cy={200}
                  outerRadius={120}
                  fill="#f0a911"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
          <TotalIncomeTable />
          <br />
          <AddEntryForm />
        </>
      )}
    </>
  );
}
