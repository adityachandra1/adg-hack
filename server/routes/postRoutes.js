const express = require("express");

const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/postControllers");
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPostById);
router.patch("/:id", updatePost);
router.get("/", getAllPosts);
router.delete("/:id", deletePost);

module.exports = router;