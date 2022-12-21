import * as React from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Toggle from "../Toggle";

function AddEntryForm({ userinfo }) {
  const [account, setAccount] = useState([]);

  let date = dayjs().format("YYYY-MM-DD");

  const [state, setState] = useState({
    accountName: "",
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: date,
    userid: userinfo.id,
  });

  const expenseSelection = ["Food", "Transport", "Entertainment", "Others"];
  const incomeSelection = [
    "Salary",
    "Deposit",
    "Bonus",
    "Investments",
    "Others",
  ];

  const expenses = expenseSelection.map((ele) => {
    return (
      <option key={ele} value={ele}>
        {ele}
      </option>
    );
  });
  const incomes = incomeSelection.map((ele) => {
    return (
      <option key={ele} value={ele}>
        {ele}
      </option>
    );
  });

  useEffect(() => {
    fetch("/api/account")
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
      });
  }, []);

  function handleChange(event) {
    const value = event.target.value;
    if (event.target.name === "amount") {
      setTransactionInfo({
        ...transactioninfo,
        [event.target.name]: value * 100,
      });
    } else {
      setTransactionInfo({
        ...transactioninfo,
        [event.target.name]: value,
      });
    }
  }

  const handleSubmit = async () => {
    const info = transactioninfo;
    try {
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();

      fetch("/api/income/")
        .then((response) => response.json())
        .then((data) => {
          setEntries(data);
        });

      // console.log(data);
    } catch (error) {
      //   setMsg("Something went wrong!");
      alert(error);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <fieldset>
        <legend>New Transaction Entry</legend>
        <Toggle state={state} setState={setState} />
        <br />
        <label>
          {/* Account:
          <input
            required
            name="account"
            type="string"
            defaultValue=""
            onChange={handleChange}
          /> */}
          <label>
            Account Name:
            <select
              name="account"
              id="type-select"
              defaultValue={"default"}
              onChange={handleChange}
            >
              <option value="default" disabled>
                Select Account
              </option>
              {account?.map((account) => (
                <option key={account._id} value={account.accountName}>
                  {account.accountName}
                </option>
              ))}
            </select>
          </label>
        </label>
        <br />
        <label>
          Type:
          <select
            name="type"
            id="type-select"
            defaultValue={"default"}
            onChange={handleChange}
          >
            <option value="default" disabled>
              Select Category
            </option>
            {state?.category === "income" ? incomes : expenses}
            {/* <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="dividends">Dividends</option>
            <option value="others">Others</option> */}
          </select>
          {/* <input
            name="type"
            type="string"
            defaultValue=""
            onChange={handleChange}
          /> */}
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
            defaultValue=""
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            type="string"
            defaultValue=""
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <label>
          Date:
          <input
            name="date"
            type="date"
            defaultValue={date}
            onChange={handleChange}
          ></input>
        </label>
      </fieldset>
      <button onClick={handleSubmit}>Add Entry</button>
      {/* <button type="reset">Reset</button>
      </form> */}
    </>
  );
}

export default AddEntryForm;
