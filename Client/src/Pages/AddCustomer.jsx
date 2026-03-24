import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/v1/Customer", {
        name,
        phone,
        address,
        product,
        pricePerUnit: price,
        quantity,
      });

      alert("Customer added ✅");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding customer");
    }
  };

  return (
    <div className="container">
      <h2>➕ Add Customer</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="👤 Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="📞 Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="🥛 Product (Milk/Newspaper)"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="number"
          placeholder="💰 Price per unit"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="📦 Quantity per day"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type="submit">Save Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;