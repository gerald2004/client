import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./Layouts/Layout";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import TwoFactorAuthentication from "./Pages/Auth/TwoFactorAuthentication";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AuthLayout from "./Layouts/AuthLayout";
import RequireAuth from "./components/RequiredAuth";
import PersistLogin from "./components/PersistentLogin";
import Missing from "./Pages/Others/Missing";
import Unauthorized from "./Pages/Others/Unauthorized";
import Transactions from "./Pages/Transactions/Transactions";
import Loans from "./Pages/Loans/Loans";
import Savings from "./Pages/Savings/Savings";
import Withdraws from "./Pages/Withdraws/Withdraws";
import FixedDeposits from "./Pages/FixedDeposits/FixedDeposits";
import Transfers from "./Pages/Transfers/Transfers";
import Shares from "./Pages/Shares/Shares";
import Profile from "./Pages/Auth/Profile";
import ChangePassword from "./Pages/Auth/ChangePassword";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[1000001]} />}>
              <Route path="/verify" element={<TwoFactorAuthentication />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route element={<RequireAuth allowedRoles={[1000001]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/withdraws" element={<Withdraws />} />
                <Route path="/fixed-deposits" element={<FixedDeposits />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/shares" element={<Shares />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
