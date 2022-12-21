import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import AccountsPage from "./pages/AccountsPage";
import TransactionsPage from "./pages/TransactionsPage";
import EditEntriesPage from "./pages/EditEntriesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditAccountPage from "./pages/EditAccountPage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/income/:id" element={<EditEntriesPage />} />
        <Route path="/accounts-overview" element={<AccountsPage />} />
        <Route path="/edit-account/:id" element={<EditAccountPage />} />
        <Route path="/transactions-history" element={<TransactionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
