import { useState } from "react";

function AddAccountForm({ userinfo }) {
  const [accountinfo, setAccountInfo] = useState({
    accountName: "",
    accountType: "Bank Account",
    accountBalance: "",
    currency: "",
    userid: userinfo.id,
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setAccountInfo({ ...accountinfo, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/account/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountinfo),
      }).then((response) => response.json());
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="add-account-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Add New Account To Keep Track Of Your Finance</legend>
            <label>
              Account Name:{" "}
              <input
                required
                name="accountName"
                type="text"
                placeholder="Give your account a name"
                onChange={handleChange}
                value={accountinfo.accountName}
              />
            </label>
            <br />
            <label>
              Account Type:{" "}
              <select
                name="accountType"
                id="type-select"
                onChange={handleChange}
              >
                <option value="Bank Account">Bank Account</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Loans">Loans</option>
                <option value="Investments">Investments</option>
              </select>
            </label>
            <br />
            <label>
              Account Balance{" "}
              <input
                required
                name="accountBalance"
                type="number"
                placeholder="Account current balance"
                onChange={handleChange}
                value={accountinfo.accountBalance}
              />
            </label>
            <br />
            <label>
              Currency:{" "}
              <input
                required
                name="currency"
                type="text"
                placeholder="Account currency"
                onChange={handleChange}
                value={accountinfo.currency}
              />
            </label>
            <br />
          </fieldset>
          {error && <div className="account-error-message">{error}</div>}
          <button type="submit">Add Account</button>
        </form>
      </div>
    </>
  );
}

export default AddAccountForm;
