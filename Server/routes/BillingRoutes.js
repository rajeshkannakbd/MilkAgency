const express = require("express");
const { getMonthlyBilling } = require("../controllers/billingController");

const router = express.Router();

router.get("/monthly",getMonthlyBilling);

module.exports = router;