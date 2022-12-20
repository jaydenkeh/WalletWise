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
  const [entries, setEntries] = useState([]);
  const [userinfo, setUserInfo] = UserAuth();

  // useEffect(() => {
  //   fetch("/api/income/")
  //     .then((response) => response.json())
  //     .then((data) => setEntries(data));
  // }, []);

  const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

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
            {heights.map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      </div>
    </>
  );
}

export default AccountsPage;
