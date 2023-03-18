const express = require("express");

const { registerStartup,
    addMembersToStartup,
    createPost,
    manageStartupStaff,
    getMonthlyNumOfUsers,
    deleteUserFromStartup,
    generatePDF,
    getAllStarutps } = require('../controllers/startupControllers');
    
const router = express.Router();

router.get("/", getAllStarutps);

module.exports = router;