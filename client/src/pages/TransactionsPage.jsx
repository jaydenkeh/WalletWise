import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddEntryForm from "../components/income/AddEntryForm";
import IncomeTable from "../components/income/IncomeTable";

export default function TransactionsPage({
  entries,
  fetchTransaction,
  setEntries,
}) {
  return (
    <>
      <NavigationBar />
      <div>TransactionsPage</div>
      <AddEntryForm fetchTransaction={fetchTransaction} />
      <IncomeTable entries={entries} setEntries={setEntries} />
    </>
  );
}
