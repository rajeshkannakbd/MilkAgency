const express = require("express");
const { AddDelivery } = require("../controllers/DeliveryController");
const { AuthMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/delivery", AuthMiddleware, AddDelivery);

module.exports = router;