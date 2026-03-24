import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/v1/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  }
}, []);

  return (
    <div className="container">
      <h2>🥛 Daily Delivery</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <div className="small-text">
        New user? <span onClick={() => navigate("/register")}>Register</span>
      </div>
    </div>
  );
};

export default Login;