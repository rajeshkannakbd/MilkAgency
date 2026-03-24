import { useEffect, useState } from "react";
import API from "../api/axios";

const Purchase = () => {
  const [farmers, setFarmers] = useState([]);
  const [farmerId, setFarmerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseList, setPurchaseList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
  new Date().toLocaleDateString("en-CA")
);

  const fetchFarmers = async () => {
    try {
      const res = await API.get("/v1/farmer");
      setFarmers(res.data);
    } catch (err) {
      alert("Error fetching farmers");
    }
  };

const fetchPurchases = async (date) => {
  try {
    const res = await API.get(`/v1/purchase?date=${date}`);
    setPurchaseList(res.data);
  } catch (err) {
    alert("Error fetching purchases");
  }
};

useEffect(() => {
  fetchFarmers();
}, []);

useEffect(() => {
  fetchPurchases(selectedDate);
}, [selectedDate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!farmerId || !quantity || !price) {
      return alert("Fill all fields");
    }

    try {
      await API.post("/v1/purchase", {
        farmerId,
        quantity,
        price,
      });
      fetchPurchases(selectedDate);
      alert("Milk purchased ✅");
      setQuantity("");
      setPrice("");
    } catch (err) {
      alert("Error saving purchase");
    }
  };

  return (
    <div className="container">
      <h2>🥛 Purchase Milk</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={farmerId}
          onChange={(e) => {
  const selected = farmers.find(f => f._id === e.target.value);
  setFarmerId(e.target.value);
  setPrice(selected?.price || "");
}}
        >
          <option value="">Select Farmer</option>
          {farmers.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name} (₹{f.price})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity (Litres)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price per litre"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Purchase</button>
      </form>
      <div className="date-nav">
  <button
    className="nav-btn"
    onClick={() => {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() - 1);
      setSelectedDate(d.toLocaleDateString("en-CA"));
    }}
  >
    ⬅️
  </button>

  <span className="date-text">📅 {selectedDate}</span>

  <button
    className="nav-btn"
    onClick={() => {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() + 1);
      setSelectedDate(d.toLocaleDateString("en-CA"));
    }}
  >
    ➡️
  </button>

  <button
    className="today-btn"
    onClick={() =>
      setSelectedDate(new Date().toLocaleDateString("en-CA"))
    }
  >
    Today
  </button>
</div>

{purchaseList.length === 0 ? (
  <p>No purchases today</p>
) : (
  purchaseList.map((p) => (
    <div key={p._id} className="card">
      <p><strong>{p.farmerId?.name}</strong></p>
      <p>Qty: {p.quantity} L</p>
      <p>Price: ₹{p.price}</p>
    </div>
  ))
)}
    </div>
  );
};

export default Purchase;