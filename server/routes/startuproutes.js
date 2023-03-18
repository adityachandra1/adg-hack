const express = require("express");
const {
  addMembersToStartup,
  createPost,
  manageStartupStaff,
} = require("../controllers/startupControllers");

const router = express.Router();

router.post("/add-members", addMembersToStartup);
router.get("/manage-staff", manageStartupStaff);
module.exports = router;
