const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const auth = require("../middleware/auth.js")

router.post("/", auth, async (req, res) => {
  const purchase = await Purchase.create(req.body);
  res.json(purchase);
});

router.get("/", auth, async (req, res) => {
  const { date } = req.query;

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const purchases = await Purchase.find({
    date: { $gte: start, $lte: end },
  }).populate("farmerId");

  res.json(purchases);
});

module.exports = router;