import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
     <h2>🥛 Dashboard</h2>
<p>Welcome back 👋</p>
    </div>
  );
};

export default Dashboard;