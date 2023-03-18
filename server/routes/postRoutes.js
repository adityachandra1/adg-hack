const express = require("express");

const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/postControllers");
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPostById);
router.patch("/:id", updatePost);
router.get("/", getAllPosts);
router.delete("/:id", deletePost);

module.exports = router;

/*
["64154d5422283ed9aff1b895", "64154d5422283ed9aff1b896", "64154d5422283ed9aff1b897", "64154d5522283ed9aff1b898", "64154d5622283ed9aff1b899", "64154d5622283ed9aff1b89a", "64154d5622283ed9aff1b89b"]
*/
