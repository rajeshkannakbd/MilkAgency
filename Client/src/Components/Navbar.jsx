import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3 onClick={() => navigate("/dashboard")}>🥛 Delivery</h3>

      <div className="nav-links">
        <span onClick={() => navigate("/customers")}>Customers</span>
        <span onClick={() => navigate("/mark-delivery")}>Delivery</span>
        <span onClick={() => navigate("/billing")}>Billing</span>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
};

export default Navbar;