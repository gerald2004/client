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
import Clients from "./Pages/Clients/Clients";
import SingleIndividualClient from "./Pages/Clients/Components/Individuals/SingleIndividualClient";
import ContactList from "./Tests/ContactList";
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
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/individual/:id" element={<SingleIndividualClient />} />
                <Route path="/contacts" element={<ContactList />} />

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
