import { useEffect, useState } from "react";
import API from "../api/axios";

const Sale = () => {
  const [buyers, setBuyers] = useState([]);
  const [buyerId, setBuyerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [saleList, setSaleList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
  new Date().toLocaleDateString("en-CA")
);

  const fetchBuyers = async () => {
    try {
      const res = await API.get("/v1/buyer");
      setBuyers(res.data);
    } catch (err) {
      alert("Error fetching buyers");
    }
  };
const fetchSales = async (date) => {
  try {
    const res = await API.get(`/v1/sale?date=${date}`);
    setSaleList(res.data);
  } catch (err) {
    alert("Error fetching sales");
  }
};

useEffect(() => {
  fetchBuyers();
}, []);

useEffect(() => {
  fetchSales(selectedDate);
}, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyerId || !quantity || !price) {
      return alert("Fill all fields");
    }

    try {
      await API.post("/v1/sale", {
        buyerId,
        quantity,
        price,
      });
      fetchSales(selectedDate);
      alert("Milk sold ✅");
      setQuantity("");
      setPrice("");
    } catch (err) {
      alert("Error saving sale");
    }
  };

  return (
    <div className="container">
      <h2>💰 Sell Milk</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={buyerId}
          onChange={(e) => {
            const selected = buyers.find(b => b._id === e.target.value);
            setBuyerId(e.target.value);
            setPrice(selected?.price || "");
          }}
        >
          <option value="">Select Buyer</option>
          {buyers.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name} (₹{b.price})
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

        <button type="submit">Add Sale</button>
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
    ⬅️ Prev
  </button>

  <span style={{ margin: "0 10px", fontWeight: "bold" }}>
    📅 {selectedDate}
  </span>

  <button
  className="nav-btn"
    onClick={() => {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() + 1);
      setSelectedDate(d.toLocaleDateString("en-CA"));
    }}
  >
    Next ➡️
  </button>

  <button
  className="today-btn"
    style={{ marginLeft: "10px" }}
    onClick={() =>
      setSelectedDate(new Date().toLocaleDateString("en-CA"))
    }
  >
    Today
  </button>
</div>

{saleList.length === 0 ? (
  <p>No sales today</p>
) : (
  saleList.map((s) => (
    <div key={s._id} className="card">
      <p><strong>{s.buyerId?.name}</strong></p>
      <p>Qty: {s.quantity} L</p>
      <p>Price: ₹{s.price}</p>
    </div>
  ))
)}
    </div>
  );
};

export default Sale;