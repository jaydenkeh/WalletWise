import NavigationBar from "../components/NavigationBar";
import AddEntryForm from "../components/income/AddEntryForm";
import TransactionTable from "../components/income/TransactionTable";

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
      <TransactionTable entries={entries} setEntries={setEntries} />
    </>
  );
}
