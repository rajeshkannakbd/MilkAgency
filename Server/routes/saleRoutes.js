const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const sale = await Sale.create(req.body);
  res.json(sale);
});

router.get("/", auth, async (req, res) => {
  const { date } = req.query;

  const start = new Date(date + "T00:00:00.000+05:30");
  const end = new Date(date + "T23:59:59.999+05:30");

  const sales = await Sale.find({
    date: { $gte: start, $lte: end },
  }).populate("buyerId");

  res.json(sales);
});

module.exports = router;