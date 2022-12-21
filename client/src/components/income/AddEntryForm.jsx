import * as React from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Toggle from "../Toggle";

function AddEntryForm({ entries, setEntries }) {
  const [account, setAccount] = useState([]);

  let date = dayjs().format("YYYY-MM-DD");

  const [state, setState] = useState({
    //get username from login auth state
    userName: "test",
    account: "",
    category: "income",
    type: "",
    amount: "",
    description: "",
    date: date,
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
      setState({
        ...state,
        [event.target.name]: value * 100,
      });
    } else {
      setState({
        ...state,
        [event.target.name]: value,
      });
    }
  }

  const handleSubmit = async () => {
    const info = state;

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

  // useEffect(() => {
  //   const fetchIncome = async () => {
  //     const response = await fetch(`/api/income/${id}`);
  //     const data = await response.json();
  //     setEntries(data);
  //   };
  //   fetchIncome();
  // }, [id]);

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
