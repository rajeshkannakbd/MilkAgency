import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddCustomer from "./Pages/AddCustomer";
import CustomerList from "./Pages/CustomerList";
import ProtectedRoute from "./routes/ProtectedRoute";
import MarkDelivery from "./Pages/MarkDelivery";
import Billing from "./Pages/Billing";
import Layout from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Layout>
        <Dashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <Layout>
        <CustomerList />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/add-customer"
  element={
    <ProtectedRoute>
      <Layout>
        <AddCustomer />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/mark-delivery"
  element={
    <ProtectedRoute>
      <Layout>
        <MarkDelivery />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/billing"
  element={
    <ProtectedRoute>
      <Layout>
        <Billing />
      </Layout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;