import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddAccountForm() {
  const [state, setState] = useState({
    //get username from login auth state
    user: "admin",
    accountType: "Bank",
    accountDescription: "",
    // accountBalance: "",
    // currency: "",
    // bankAccount: "",
  });

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  const handleSubmit = async () => {
    const info = state;

    try {
      const response = await fetch("/api/account/new", {
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
        .then((data) => setEntries(data));

      // console.log(data);
    } catch (error) {
      //   setMsg("Something went wrong!");
      alert(error);
    }
  };

  return (
    <>
      <fieldset>
        <legend>Add New Account</legend>
        {/* <label>
          Account Type:
          change input to drop down with map + account storage in mongo
          <input
            required
            name="account"
            type="string"
            defaultValue=""
            onChange={handleChange}
              value={account}
            onChange={(event) => setAccount(event.target.value)}
          />
        </label>
        <br /> */}
        <label>
          Account Type:
          <select name="type" id="type-select" onChange={handleChange}>
            <option value="bank">Bank</option>
            <option value="creditcard">Credit Card</option>
          </select>
        </label>
        <br />
        <label>
          Account Name:
          <input
            required
            name="name"
            type="string"
            defaultValue=""
            onChange={handleChange}
          />
        </label>
        <br />
        {/* <label>
          Description:
          <textarea
            name="description"
            type="string"
            defaultValue=""
            onChange={handleChange}
          ></textarea>
        </label>
        <br /> */}
      </fieldset>
      <button onClick={handleSubmit}>Add Entry</button>
    </>
  );
}

export default AddAccountForm;
