const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/posts', require('./postRoutes'));
router.use('/startups', require('./startupRoutes'));

module.exports = router;
