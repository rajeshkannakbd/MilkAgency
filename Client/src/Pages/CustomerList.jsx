import { useEffect, useState } from "react";
import API from "../api/axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/v1/customer");
      setCustomers(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      alert("Error fetching customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this customer?")) return;

  try {
    await API.delete(`/v1/customer/${id}`);
    fetchCustomers(); // refresh list
  } catch (err) {
    alert("Delete failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#0077b6" }}>👥 Customers</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        customers.map((cust) => (
          <div key={cust._id} className="card">
            <h3>{cust.name}</h3>
            <p>📞 {cust.phone}</p>
            <p>🥛 {cust.product}</p>
            <p>ADRS: {cust.address}</p>
            <p>💰 ₹{cust.pricePerUnit}</p>
            <p>📦 Qty: {cust.quantity}</p>
            <button onClick={() => handleDelete(cust._id)}>
  Delete
</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerList;