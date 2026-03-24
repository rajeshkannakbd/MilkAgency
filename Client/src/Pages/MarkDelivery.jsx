import { useEffect, useState } from "react";
import API from "../api/axios";

const MarkDelivery = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/v1/customer");
      setCustomers(res.data.data);
    } catch (err) {
      alert("Error fetching customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleMarkDelivery = async () => {
    if (!selectedCustomer) {
      return alert("Please select a customer");
    }

    try {
      await API.post("/v1/delivery", {
        customerId: selectedCustomer,
      });

      alert("Delivery marked for today ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Error marking delivery");
    }
  };

  return (
    <div className="container">
      <h2>🚚 Mark Delivery</h2>

      <select
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Select Customer</option>

        {customers.map((cust) => (
          <option key={cust._id} value={cust._id}>
            {cust.name} ({cust.product})
          </option>
        ))}
      </select>

      <button onClick={handleMarkDelivery} style={{ marginTop: "20px" }}>
        Mark Today Delivery
      </button>
    </div>
  );
};

export default MarkDelivery;