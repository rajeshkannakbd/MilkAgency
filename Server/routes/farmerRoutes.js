const express = require("express");
const router = express.Router();
const Farmer = require("../models/Farmer");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const farmer = await Farmer.create(req.body);
  res.json(farmer);
});

router.get("/", auth, async (req, res) => {
  const farmers = await Farmer.find();
  res.json(farmers);
});

router.delete("/:id", auth, async (req, res) => {
  await Farmer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;