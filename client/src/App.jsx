import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/income" element={<IncomePage />} />
        {/* <Route path="/transaction-history" element={< />} /> */}
        //TODO Add in route element
        {/* <Route path="/accounts-overview" element={< />} /> */}
        //TODO Add in route element
      </Route>
    </Routes>
  );
}

export default App;
