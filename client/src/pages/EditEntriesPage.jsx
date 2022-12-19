import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavigationBar";

function EditEntriesPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entries, setEntries] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);

    const response = await fetch(`/api/income/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    await response.json();
    navigate("/income");
  };

  useEffect(() => {
    const fetchHoliday = async () => {
      const response = await fetch(`/api/income/${id}`);
      const data = await response.json();
      setEntries(data);
    };
    fetchHoliday();
  }, [id]);

  // useEffect(() => {
  //   fetch("/api/income/")
  //     .then((response) => response.json())
  //     .then((data) => setEntries(data));
  // }, []);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Entry</legend>
          <label>
            Account:
            {/* change input to drop down with map + account storage in mongo */}
            <input
              required
              name="account"
              type="string"
              defaultValue={entries.account}
              //   value={account}
              // onChange={(event) => setAccount(event.target.value)}
            />
          </label>
          <br />
          <label>
            Type:
            <select name="type" id="type-select" defaultValue={entries.type}>
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
            <input name="date" type="date" defaultValue={entries.date}></input>
          </label>
        </fieldset>
        {/* <input type="submit" value="Update" /> */}
        <button type="submit">Update</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
}

export default EditEntriesPage;
