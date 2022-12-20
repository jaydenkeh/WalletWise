import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddAccountForm from "../components/accounts/AddAccountForm";
import IncomeTable from "../components/income/IncomeTable";
import TotalIncomeTable from "../components/income/TotalIncomeTable";
import { UserAuth } from "../context/AuthContext";

function AccountsPage() {
  const [entries, setEntries] = useState([]);
  const [userinfo, setUserInfo] = UserAuth();

  useEffect(() => {
    fetch("/api/income/")
      .then((response) => response.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <>
      <NavigationBar />
      <div>AccountsPage</div>
      <br />
      <AddAccountForm userinfo={userinfo} />
      <TotalIncomeTable />
      <IncomeTable entries={entries} setEntries={setEntries} />
    </>
  );
}

export default AccountsPage;
