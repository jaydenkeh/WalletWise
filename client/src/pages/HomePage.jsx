import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import NavigationBar from "../components/NavigationBar";
import TotalIncomeTable from "../components/income/TotalIncomeTable";
import AddEntryForm from "../components/income/AddEntryForm";
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from "recharts";

export default function HomePage() {
  const [userinfo, setUserInfo] = UserAuth();
  const [newEntry, setNewEntry] = useState(false);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const incomeColours = ["#9C27B0", "#3F51B5", "#03A9F4", "#009688", "#8BC34A"];
  const expenseColours = ["#FF7043", "#FFCA28", "#D4E157", "#66BB6A"];
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

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      {userinfo.id && (
        <>
          <div className="home-page">
            <NavigationBar />
            {/* <br />
            HomePage */}
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
                >
                  {incomeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={incomeColours[index % incomeColours.length]}
                    />
                  ))}
                </Pie>
                <Legend layout="vertical" />
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
                  fill="#8884d8"
                  label
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={expenseColours[index % expenseColours.length]}
                    />
                  ))}
                </Pie>
                <Legend layout="vertical" />
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
