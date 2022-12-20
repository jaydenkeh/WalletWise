import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddAccountForm from "../components/income/AddAccountForm";
import IncomeTable from "../components/income/IncomeTable";
import TotalIncomeTable from "../components/income/TotalIncomeTable";

function AccountsPage() {
  const [entries, setEntries] = useState([]);

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
      <AddAccountForm />
      <TotalIncomeTable />
      <IncomeTable entries={entries} setEntries={setEntries} />
    </>
  );
}

export default AccountsPage;
