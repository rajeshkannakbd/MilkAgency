import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./Components/Layout";
import Purchase from "./Pages/Purchase";
import Sale from "./Pages/Sale";
import Profit from "./Pages/Profit";
import Dashboard from "./Pages/Dashboard"
import ChartPage from "./Pages/Charts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
<Route
  path="/purchase"
  element={
      <Layout>
        <Purchase />
      </Layout>
    
  }
/>

<Route
  path="/sale"
  element={
    <ProtectedRoute>
      <Layout>
        <Sale />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/profit"
  element={
    <ProtectedRoute>
      <Layout>
        <Profit />
      </Layout>
    </ProtectedRoute>
  }
/>
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
  path="/charts"
  element={
    <ProtectedRoute>
      <Layout>
        <ChartPage />
      </Layout>
    </ProtectedRoute>
  }
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;