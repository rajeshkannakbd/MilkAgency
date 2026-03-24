const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const buyer = await Buyer.create(req.body);
  res.json(buyer);
});

router.get("/", auth, async (req, res) => {
  const buyers = await Buyer.find();
  res.json(buyers);
});

router.delete("/:id", auth, async (req, res) => {
  await Buyer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;