const express = require("express");

const { createUser } = require("../controllers/userControllers");
const { login } = require("../controllers/authControllers");
const { registerStartup } = require("../controllers/startupControllers");

const router = express.Router();

router.post("/register-user", createUser);
router.post("/register-startup", registerStartup);
router.post("/login", login);
module.exports = router;
