import { useEffect, useState } from "react";
import API from "../api/axios";

const Billing = () => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [month, setMonth] = useState("");
  const [bill, setBill] = useState(null);

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

  const handleGetBill = async () => {
    if (!customerId || !month) {
      return alert("Select customer and month");
    }

    try {
      const res = await API.get(
        `/v1/billing/monthly?customerId=${customerId}&month=${month}`
      );

      setBill(res.data.data[0]);
      console.log(res.data.data[0])
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching bill");
    }
  };

  return (
    <div className="container">
      <h2>💰 Monthly Billing</h2>

      {/* Customer Select */}
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      >
        <option value="">Select Customer</option>
        {customers.map((cust) => (
          <option key={cust._id} value={cust._id}>
            {cust.name}
          </option>
        ))}
      </select>

      {/* Month Select */}
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <button onClick={handleGetBill}>
        Get Bill
      </button>

      {/* Bill Result */}
      {bill && (
        <div className="card">
          <h3>🧾 Bill Summary</h3>
          <p>Customer: {bill.customer}</p>
          <p>Total Deliveries: {bill.deliveredDays}</p>
          <p><strong>Total Amount: ₹{bill.total}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Billing;