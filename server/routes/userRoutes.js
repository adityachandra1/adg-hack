const express = require("express");

// Importing the controller functions.
const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUserByID);
router.patch("/:id", updateUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;