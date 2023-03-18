const express = require("express");

const {
  registerStartup,
  addMembersToStartup,
  manageStartupStaff,
  getMonthlyNumOfUsers,
  deleteUserFromStartup,
  generatePDF,
  getAllStartups,
} = require("../controllers/startupControllers");

const router = express.Router();

router.get("/", getAllStartups);
router.get("/manage", manageStartupStaff);
router.get("/delete", deleteUserFromStartup);
router.get("/pdf", generatePDF);
router.get("/getUsers", getMonthlyNumOfUsers);
router.post("/register-startup", registerStartup);
router.post("/add-members", addMembersToStartup);

module.exports = router;
