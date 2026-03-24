import { useState } from "react";
import API from "../api/axios";
import { useEffect } from "react";

const Profit = () => {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  setDate(today);

  fetchProfit(today);
}, []);

const fetchProfit = async (selectedDate) => {
  try {
    const res = await API.get(`/v1/profit?date=${selectedDate}`);
    setData(res.data);
  } catch (err) {
    alert("Error fetching profit");
  }
};

const handleGetProfit = () => {
  if (!date) return alert("Select date");
  fetchProfit(date);
};

  return (
    <div className="container">
      <h2>💰 Daily Profit</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleGetProfit}>
        Get Profit
      </button>

      {data && (
  <>
    {/* 🔥 Highlight Remaining Milk */}
    <div
      style={{
        background: "#fff3cd",
        padding: "15px",
        borderRadius: "10px",
        marginTop: "15px",
        textAlign: "center",
      }}
    >
      <h3>
        🥛 Remaining Milk: {data.remainingMilk} L
      </h3>
    </div>

    <div className="card">
      <h3>📊 Summary</h3>

      <p>🥛 Total Bought: {data.totalBuyQty} L</p>
      <p>💰 Total Cost: ₹{data.totalBuy}</p>

      <hr />

      <p>🚚 Total Sold: {data.totalSellQty} L</p>
      <p>💵 Revenue: ₹{data.totalSell}</p>

      <hr />

      {/* ✅ Profit or Loss */}
      <h3
        style={{
          color: data.profit >= 0 ? "green" : "red",
        }}
      >
        {data.profit >= 0
          ? `Profit: ₹${data.profit}`
          : `Loss: ₹${Math.abs(data.profit)}`}
      </h3>
    </div>
  </>
)}
    </div>
  );
};

export default Profit;