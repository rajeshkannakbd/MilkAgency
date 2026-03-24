const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const { date } = req.query;

const start = new Date(date + "T00:00:00.000+05:30");
const end = new Date(date + "T23:59:59.999+05:30");

  const purchases = await Purchase.find({
    date: { $gte: start, $lte: end },
  });

  const sales = await Sale.find({
    date: { $gte: start, $lte: end },
  });

  let totalBuy = 0;
  let totalSell = 0;
  let totalBuyQty = 0;
  let totalSellQty = 0;

  purchases.forEach((p) => {
    totalBuy += p.quantity * p.price;
    totalBuyQty += p.quantity;
  });

  sales.forEach((s) => {
    totalSell += s.quantity * s.price;
    totalSellQty += s.quantity;
  });

  const profit = totalSell - totalBuy;
  const remainingMilk = totalBuyQty - totalSellQty;

  res.json({
    totalBuyQty,
    totalSellQty,
    totalBuy,
    totalSell,
    profit,
    remainingMilk,
  });
});

router.get("/range", async (req, res) => {
  const { days = 7 } = req.query;

  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
const day = date.toLocaleDateString("en-CA");

const start = new Date(day + "T00:00:00.000+05:30");
const end = new Date(day + "T23:59:59.999+05:30");

    const purchases = await Purchase.find({
      date: { $gte: start, $lte: end },
    });

    const sales = await Sale.find({
      date: { $gte: start, $lte: end },
    });

    let totalBuy = 0;
    let totalSell = 0;

    purchases.forEach((p) => {
      totalBuy += p.quantity * p.price;
    });

    sales.forEach((s) => {
      totalSell += s.quantity * s.price;
    });

result.push({
  date: date.toISOString().split("T")[0],
  profit: totalSell - totalBuy,
  totalBuy,
  totalSell,
});
  }

  res.json(result);
});

module.exports = router;