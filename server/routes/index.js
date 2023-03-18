const router = require("express").Router();

router.use("/users", require("./userRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/startup", require("./startupRoutes"));
router.use("/posts", require("./postRoutes"));
router.use("/requests", require("./requestRoutes"));


module.exports = router;
