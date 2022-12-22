import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import NavigationBar from "../components/NavigationBar";
import TotalIncomeTable from "../components/income/TotalIncomeTable";
import AddEntryForm from "../components/income/AddEntryForm";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

export default function HomePage() {
  const [userinfo, setUserInfo] = UserAuth();
  const [newEntry, setNewEntry] = useState(false);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  // const data01 = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  //   { name: "Group E", value: 278 },
  //   { name: "Group F", value: 189 },
  // ];

  useEffect(() => {
    const id = userinfo.id;
    fetch(`/api/income/total/${id}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].total = data[i].total / 100;
        }
        setIncome(data);
        setNewEntry(false);
      });
  }, [newEntry]);

  const incomeData = income.map(({ _id: name, total: value }) => ({
    name,
    value,
  }));

  useEffect(() => {
    const id = userinfo.id;
    fetch(`/api/expense/total/${id}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].total = data[i].total / 100;
        }
        setExpense(data);
        setNewEntry(false);
      });
  }, [newEntry]);

  const expenseData = expense.map(({ _id: name, total: value }) => ({
    name,
    value,
  }));

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
                  data={incomeData}
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
                  data={expenseData}
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
          {/* <TotalIncomeTable />
          <br /> */}
          <AddEntryForm userinfo={userinfo} setNewEntry={setNewEntry} />
        </>
      )}
    </>
  );
}
