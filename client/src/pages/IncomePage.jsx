import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddEntryForm from "../components/income/AddEntryForm";
import IncomeTable from "../components/income/IncomeTable";
import TotalIncomeTable from "../components/income/TotalIncomeTable";

function IncomePage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("/api/income/")
      .then((response) => response.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <>
      <NavigationBar />
      <div> Page</div>
      <TotalIncomeTable />
      <AddEntryForm entries={entries} setEntries={setEntries} />
      <IncomeTable entries={entries} setEntries={setEntries} />
    </>
  );
}

export default IncomePage;
