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
       <span onClick={() => navigate("/purchase")}>Purchase</span>
        <span onClick={() => navigate("/sale")}>Sales</span>
        <span onClick={() => navigate("/profit")}>Profit</span>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
};

export default Navbar;