import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddEntryForm from "../components/income/AddEntryForm";
import IncomeTable from "../components/income/IncomeTable";

function IncomePage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("/api/income/")
      .then((response) => response.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <>
      <div>Income Page</div>
      <AddEntryForm entries={entries} setEntriess={setEntries} />
      <IncomeTable entries={entries} setEntriess={setEntries} />
    </>
  );
}

export default IncomePage;
