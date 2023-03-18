const express = require("express");

const { createUser } = require("../controllers/userControllers");
const { login } = require("../controllers/authControllers");

const router = express.Router();

router.post("/register-user", createUser);
router.post("/login", login);
module.exports = router;