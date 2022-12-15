import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddEntryForm({ entries, setEntries }) {
  const [account, setAccount] = useState("");

  const handleSubmit = async () => {
    const info = { account };

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
      console.log(data);
    } catch (error) {
      //   setMsg("Something went wrong!");
      alert("Oops, something went wrong! Please try again");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Income Entry</legend>
          <label>
            Account:
            <input
              name="account"
              type="string"
              defaultValue=""
              //   value={account}
              onChange={(event) => setAccount(event.target.value)}
            />
          </label>
          <br />
          <label>
            Type:
            <input name="type" type="string" defaultValue="" />
          </label>
          <br />
          <label>
            Amount:
            <input name="amount" type="number" min="0" defaultValue="" />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              type="string"
              defaultValue=""
            ></textarea>
          </label>
        </fieldset>
        <button onClick={handleSubmit}>Add Entry</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
}

export default AddEntryForm;
