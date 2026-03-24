const express = require("express");
const { login, register, getUser } = require("../controllers/Authcontroller");
const { AuthMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login",login)
router.post("/register",register);
router.get("/profile", AuthMiddleware, getUser)

module.exports = router;