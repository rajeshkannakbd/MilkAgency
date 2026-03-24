import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [todayData, setTodayData] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");

    // ✅ Fetch today's summary
    API.get(`/v1/profit?date=${today}`)
      .then((res) => setTodayData(res.data))
      .catch(() => {});

    // ✅ Fetch last 7 days trend
    API.get(`/v1/profit/range?days=7`)
      .then((res) => setChartData(res.data))
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      <h2>🥛 Milk Agency Dashboard</h2>
      <center>
    <h3>
  📅 {new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })}
</h3></center>
      {/* 🔥 SUMMARY CARDS */}
     {todayData && (
      
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      marginTop: "15px",
    }}
  >
    {/* 🥛 Bought */}
    <div className="card" style={{ textAlign: "center" }}>
      <p style={{ fontSize: "14px" }}>🥛 Bought</p>
      <h2 style={{ fontSize: "28px", color: "#0077b6" }}>
        {todayData.totalBuyQty} L
      </h2>
    </div>

    {/* 🚚 Sold */}
    <div className="card" style={{ textAlign: "center" }}>
      <p style={{ fontSize: "14px" }}>🚚 Sold</p>
      <h2 style={{ fontSize: "28px", color: "#00b4d8" }}>
        {todayData.totalSellQty} L
      </h2>
    </div>

    {/* 💰 Profit */}
    <div
      className="card"
      style={{
        gridColumn: "span 2",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "14px" }}>💰 Today Result</p>
      <h1
        style={{
          fontSize: "32px",
          color: todayData.profit >= 0 ? "green" : "red",
        }}
      >
        ₹{todayData.profit}
      </h1>
    </div>
  </div>
)}

      {/* 📈 PROFIT TREND */}
      <div className="card" style={{ marginTop: "20px", height: "300px" }}>
        <h3>📈 Profit Trend</h3>

        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#0077b6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 BUY VS SELL */}
      <div className="card" style={{ marginTop: "20px", height: "300px" }}>
        <h3>📊 Buy vs Sell</h3>

        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;