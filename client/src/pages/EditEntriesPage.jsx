import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/NavigationBar";
import dayjs from "dayjs";

function EditEntriesPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entries, setEntries] = useState({});
  const [userinfo, setUserInfo] = UserAuth();
  const [account, setAccount] = useState([]);

  const expenseSelection = ["Food", "Transport", "Entertainment", "Others"];
  const incomeSelection = [
    "Salary",
    "Deposit",
    "Bonus",
    "Investments",
    "Others",
  ];
  const expenses = expenseSelection.map((ele, index) => {
    return (
      <option key={index} value={ele}>
        {ele}
      </option>
    );
  });
  const incomes = incomeSelection.map((ele, index) => {
    return (
      <option key={index} value={ele}>
        {ele}
      </option>
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    info.amount = info.amount * 100;

    const response = await fetch(`/api/transaction/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    await response.json();
    navigate("/transactions-history");
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await fetch(`/api/transaction/edit/${id}`);
      const data = await response.json();
      setEntries(data);
    };
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    const id = userinfo.id;
    fetch(`/api/account/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
      });
  }, []);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Entry</legend>
          <label>
            Account Name:
            <select
              name="accountName"
              id="type-select"
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Select Account
              </option>
              {account?.map((account) => (
                <option key={entries._id} value={entries.accountName}>
                  {entries.accountName}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Category:
            <select name="category" id="type-select" defaultValue={"default"}>
              <option value="default" disabled>
                Select type
              </option>
              {entries?.type === "income" ? incomes : expenses}
            </select>
          </label>
          <br />
          <label>
            Amount:
            <input
              required
              name="amount"
              type="number"
              step="any"
              min="0"
              defaultValue={entries.amount}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              type="string"
              defaultValue={entries.description}
            ></textarea>
          </label>
          <br />
          <label>
            Date:
            <input
              name="date"
              type="date"
              defaultValue={dayjs(entries.date).format("YYYY-MM-DD")}
            ></input>
          </label>
        </fieldset>
        <button type="submit">Update</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
}

export default EditEntriesPage;
