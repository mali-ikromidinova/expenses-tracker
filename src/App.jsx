import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/FakeAuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound";
import Income from "./pages/Income/Income";
import Expenses from "./pages/Expenses/Expenses";
import Dashboard from "./pages/Dashboard/Dashboard";
import { FinancesProvider } from "./context/FinancesContext";

function App() {
  return (
    <FinancesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="expenses" element={<Expenses />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </FinancesProvider>
  );
}

export default App;
