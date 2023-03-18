const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/carts', require('./cartRoutes'));

module.exports = router;
