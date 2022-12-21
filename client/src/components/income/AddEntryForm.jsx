import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function AddEntryForm({ userinfo }) {
  // let now = new Date();
  // let day = now.getDate();
  // let month = now.getMonth() + 1;
  // let year = now.getFullYear();

  // month = month < 10 ? "0" + month : month;
  // day = day < 10 ? "0" + day : day;
  // let date = year + "-" + month + "-" + day;

  let date = dayjs().format("YYYY-MM-DD");

  const [transactioninfo, setTransactionInfo] = useState({
    accountName: "",
    category: "Salary",
    amount: "",
    description: "",
    date: date,
    userid: userinfo.id,
  });

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
        <label>Toggle for income/expense</label>
        <br />
        <label>
          Account:
          {/* change input to drop down with map + account storage in mongo */}
          <input
            required
            name="account"
            type="string"
            defaultValue=""
            onChange={handleChange}
            //   value={account}
            // onChange={(event) => setAccount(event.target.value)}
          />
        </label>
        <br />
        <label>
          Type:
          <select name="type" id="type-select" onChange={handleChange}>
            <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="dividends">Dividends</option>
            <option value="others">Others</option>
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
