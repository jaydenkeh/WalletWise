import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddAccountForm from "../components/accounts/AddAccountForm";
import IncomeTable from "../components/income/IncomeTable";
import { UserAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function AccountsPage() {
  const [useraccounts, setUserAccounts] = useState([]);
  const [addnewaccount, setAddNewAccount] = useState(false);
  const [userinfo, setUserInfo] = UserAuth();

  useEffect(() => {
    fetch("/api/account/")
      .then((response) => response.json())
      .then((data) => setUserAccounts(data));
  }, []);

  console.log(useraccounts);
  //TODO to map out the user accounts details + fix logic to fetch data everytime when user adds new account

  const handleDelete = async (id) => {
    const response = await fetch(`/api/account/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserAccounts(useraccounts.filter((ele) => ele._id !== id));
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <NavigationBar />
      <div>AccountsPage</div>
      <br />
      <AddAccountForm userinfo={userinfo} />
      {/* <IncomeTable entries={entries} setEntries={setEntries} /> */}
      <Divider>
        <Chip label="All Your Accounts" />
      </Divider>
      <div className="all-accounts-container">
        <Box sx={{ minWidth: 660, minHeight: 250 }}>
          <Masonry columns={5} spacing={2}>
            {useraccounts.map((account, index) => (
              <Item key={index} sx={{ height: 140 }}>
                <p>
                  <b>{account.accountType}</b>
                  <br />
                  <br />
                  {account.accountName}
                  <br />
                  {account.accountBalance} {account.currency}
                  <button onClick={() => handleDelete(account._id)}>
                    Delete Account
                  </button>
                </p>
              </Item>
            ))}
          </Masonry>
        </Box>
      </div>
    </>
  );
}

export default AccountsPage;
