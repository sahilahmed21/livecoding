const express = require("express");
const router = express.Router();
const { login, register, refresh, privateRoute } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login); // ✅ this one is key
router.post("/refresh", refresh);
router.get("/private", privateRoute); // optionally add authMiddleware

module.exports = router;
