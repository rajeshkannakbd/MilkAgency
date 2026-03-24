const express = require("express");
const { CustomerList, singleCustomer, Addcustomer, DeleteCustomer } = require("../controllers/CustomerController");
const { AuthMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", AuthMiddleware, CustomerList);
router.get("/:id", AuthMiddleware,singleCustomer);
router.post("/", AuthMiddleware,Addcustomer);
router.delete("/:id", AuthMiddleware,DeleteCustomer);

module.exports = router;
