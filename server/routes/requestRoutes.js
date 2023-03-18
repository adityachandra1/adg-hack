const express = require("express");

const { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest, sendMail } = require("../controllers/requestControllers");
const router = express.Router();

router.post("/", createRequest);
router.get("/:id", getRequestById);
router.patch("/:id", updateRequest);
router.get("/", getAllRequests);
router.delete("/:id", deleteRequest);
router.post("/mail", sendMail);

module.exports = router;

/*
["64154d5422283ed9aff1b895", "64154d5422283ed9aff1b896", "64154d5422283ed9aff1b897", "64154d5522283ed9aff1b898", "64154d5622283ed9aff1b899", "64154d5622283ed9aff1b89a", "64154d5622283ed9aff1b89b"]
*/
