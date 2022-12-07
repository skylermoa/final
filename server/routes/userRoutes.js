const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { signUp, signIn, profile } = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", auth, profile);

module.exports = router;
