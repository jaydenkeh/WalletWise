import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddEntryForm from "../components/income/AddEntryForm";
import IncomeTable from "../components/income/IncomeTable";

export default function TransactionsPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("/api/income/")
      .then((response) => response.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <>
      <NavigationBar />
      <div>TransactionsPage</div>
      <AddEntryForm entries={entries} setEntries={setEntries} />
      <IncomeTable entries={entries} setEntries={setEntries} />
    </>
  );
}
