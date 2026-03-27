import { useState } from "react";
import API from "../api/axios";

const People = () => {
  const [type, setType] = useState("farmer");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !price) {
      return alert("Fill all fields");
    }

    try {
      if (type === "farmer") {
        await API.post("/v1/farmer", { name, phone, price });
      } else {
        await API.post("/v1/buyer", { name, phone, price });
      }

      alert(`${type} added ✅`);

      setName("");
      setPhone("");
      setPrice("");
    } catch (err) {
      alert("Error saving");
    }
  };

  return (
    <div className="container">
      <h2>👥 Manage People</h2>

      {/* Toggle Buttons */}
      <div className="toggle">
        <button
          className={type === "farmer" ? "active" : ""}
          onClick={() => setType("farmer")}
        >
          🐄 Farmer
        </button>

        <button
          className={type === "buyer" ? "active" : ""}
          onClick={() => setType("buyer")}
        >
          🏪 Buyer
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card">
        <h3>Add {type}</h3>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price per litre"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add {type}</button>
      </form>
    </div>
  );
};

export default People;